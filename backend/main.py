from datetime import datetime
from pathlib import Path
import os

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from sqlalchemy import create_engine, String, DateTime, Text, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session, sessionmaker

DB_PATH = Path(__file__).resolve().parent / "portfolio.db"
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{DB_PATH.as_posix()}")
# Render/Postgres providers may supply the legacy postgres:// URL; normalize it for SQLAlchemy.
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg://", 1)
elif DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)
engine_options = {"pool_pre_ping": True}
if DATABASE_URL.startswith("sqlite"):
    engine_options["connect_args"] = {"check_same_thread": False}
engine = create_engine(DATABASE_URL, **engine_options)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

class Base(DeclarativeBase):
    pass

class Inquiry(Base):
    __tablename__ = "inquiries"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(254))
    service: Mapped[str] = mapped_column(String(120))
    message: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(engine)

app = FastAPI(title="Karumuri Shyam Portfolio API", version="1.2.0")
frontend_origins = os.getenv(
    "FRONTEND_ORIGINS",
    os.getenv("FRONTEND_ORIGIN", "http://localhost:5173,http://127.0.0.1:5173"),
)
allowed_origins = [origin.strip() for origin in frontend_origins.split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

class ContactInquiry(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    service: str = Field(min_length=2, max_length=120)
    message: str = Field(min_length=10, max_length=5000)

class InquiryCreated(BaseModel):
    message: str
    inquiry_id: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "Karumuri Shyam Portfolio API", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/api/contact", response_model=InquiryCreated, status_code=201)
def create_contact(payload: ContactInquiry, db: Session = Depends(get_db)):
    inquiry = Inquiry(
        name=payload.name.strip(),
        email=str(payload.email),
        service=payload.service.strip(),
        message=payload.message.strip(),
    )
    if not inquiry.name or not inquiry.message:
        raise HTTPException(status_code=422, detail="Name and message are required.")
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return {"message": "Your inquiry has been received and saved.", "inquiry_id": inquiry.id}

@app.get("/api/contact/count")
def contact_count(db: Session = Depends(get_db)):
    rows = db.scalars(select(Inquiry.id)).all()
    return {"saved_inquiries": len(rows)}
