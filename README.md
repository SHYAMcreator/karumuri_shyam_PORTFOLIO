# Karumuri Shyam — Python Full-Stack Developer Portfolio

A responsive portfolio for freelance Python full-stack development, built with **React + Vite** and **FastAPI**.

## Personal details
- **Name:** Karumuri Shyam
- **Email:** karumurishyam01@gmail.com
- **Phone:** 8499965286
- **Education:** B.Tech in Electronics and Communication Engineering (ECE)
- **GitHub:** https://github.com/SHYAMcreator
- **LinkedIn:** https://www.linkedin.com/in/karumurishyamlink/

## Featured projects
1. AI-Powered Document Chatbot
2. Project & Task Management System
3. SpendWise — Personal Expense Tracker
4. AI-Powered Resume Analyzer
5. Freelance Client & Invoice Management System

Project cards link to the GitHub repositories for all five projects. Add live demo links only after you deploy each project and verify that the demos work.

## Run locally

### Backend (PowerShell, from project root)
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
python -m uvicorn backend.main:app --reload --port 8000
```

API docs: http://127.0.0.1:8000/docs

### Frontend (second terminal)
```powershell
cd frontend
npm install
npm run dev
```

Open http://localhost:5173.

## Contact form and data
The form submits to `POST /api/contact`. FastAPI validates inquiries and stores them in a local SQLite database. This starter does **not** send email notifications. For production, configure email delivery, spam/rate-limit protection, and persistent database storage.

## Deploy for freelancing

### Frontend (Vercel or another static host)
1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Set the **Root Directory** to `frontend`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add environment variable `VITE_API_URL` with your deployed FastAPI backend base URL (no trailing `/api/contact`).

### Backend (Render or another Python host)
1. Create a Web Service from the same GitHub repository.
2. Set the **Root Directory** to the repository root.
3. Build/install command: `pip install -r backend/requirements.txt`.
4. Start command: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`.
5. Set `FRONTEND_ORIGINS` to your deployed frontend origin, e.g. `https://your-portfolio.vercel.app` (comma-separated if you use multiple origins). Set `DATABASE_URL` to a managed PostgreSQL connection URL for persistent inquiry storage; PostgreSQL URLs are normalized automatically.

**Production database note:** The app uses SQLite locally by default. For production, configure `DATABASE_URL` to a managed PostgreSQL database so inquiries persist across redeployments. Email notifications still need a separate email provider integration.

## Before sharing with clients
- [x] Add GitHub and LinkedIn profile links.
- [ ] Add GitHub repository links for projects 2–5 when they are published.
- [ ] Add live demo links after deploying the projects.
- [ ] Test the contact form against the deployed API.
- [ ] Verify no API keys, `.env` files, local databases, `.venv`, or `node_modules` are committed.
