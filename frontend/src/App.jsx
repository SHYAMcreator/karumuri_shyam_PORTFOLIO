import { useState } from "react";
import {
  ArrowRight, ArrowUpRight, Braces, CheckCircle2, Code2, Database,
  FileSearch, Github, Globe, Layers3, Linkedin, Mail, Menu, MessageSquareText,
  ReceiptText, Server, Sparkles, Wallet, Workflow, X, BriefcaseBusiness,
  ClipboardList, FileText, ChartNoAxesCombined, Phone, GraduationCap
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const GITHUB_PROFILE = "https://github.com/SHYAMcreator";
const LINKEDIN_PROFILE = "https://www.linkedin.com/in/karumurishyamlink/";

const services = [
  { icon: <Server />, title: "Python Backend Development", text: "FastAPI endpoints, business logic, data validation, and maintainable backend services." },
  { icon: <Code2 />, title: "Full-Stack Web Applications", text: "Responsive React interfaces connected to reliable Python APIs and databases." },
  { icon: <Database />, title: "Database Design & Integration", text: "SQL schemas, CRUD workflows, relational data models, and ORM integration." },
  { icon: <Workflow />, title: "API Integration & Automation", text: "REST APIs, third-party services, JSON processing, and workflow automation." },
  { icon: <Layers3 />, title: "Bug Fixes & Maintenance", text: "Troubleshooting, improvements, testing, documentation, and ongoing support." },
  { icon: <Sparkles />, title: "AI-Powered Features", text: "Document Q&A, resume analysis, LLM integrations, and retrieval-based applications." }
];

const projects = [
  {
    no: "01", type: "AI · DOCUMENT INTELLIGENCE", title: "AI-Powered Document Chatbot",
    text: "Upload PDF documents and ask questions in natural language. The application processes document content and uses retrieval to provide context-aware answers.",
    tags: ["Python", "FastAPI", "React", "RAG", "Vector Search"], icon: <MessageSquareText />,
    features: ["PDF upload and text extraction", "Context-aware document questions", "Semantic retrieval workflow"], github: "https://github.com/SHYAMcreator/ai-document-chatbot"
  },
  {
    no: "02", type: "FULL-STACK WEB APP", title: "Project & Task Management System",
    text: "A project workspace for organizing tasks, priorities, assignments, deadlines, and progress from a central dashboard.",
    tags: ["Python", "FastAPI", "React", "SQL", "REST API"], icon: <ClipboardList />,
    features: ["Task CRUD and status tracking", "Priority and deadline management", "Dashboard summaries and filters"], github: "https://github.com/SHYAMcreator/project-task-management"
  },
  {
    no: "03", type: "PERSONAL FINANCE", title: "SpendWise — Personal Expense Tracker",
    text: "Track income and expenses, organize transactions by category, and review spending patterns through clear summaries.",
    tags: ["Python", "FastAPI", "React", "SQLite", "Charts"], icon: <Wallet />,
    features: ["Income and expense records", "Category-based transaction views", "Monthly totals and spending summaries"], github: "https://github.com/SHYAMcreator/spendwise-expense-tracker"
  },
  {
    no: "04", type: "AI · CAREER TOOLS", title: "AI-Powered Resume Analyzer",
    text: "Upload a PDF or DOCX resume and compare it with a job description to see matched skills, missing keywords, a match score, and improvement suggestions.",
    tags: ["Python", "FastAPI", "React", "PyMuPDF", "LLM API"], icon: <FileSearch />,
    features: ["PDF and DOCX parsing", "Job-description skill matching", "Actionable resume feedback"], github: "https://github.com/SHYAMcreator/ai-resume-analyzer"
  },
  {
    no: "05", type: "FREELANCER BUSINESS TOOL", title: "Client & Invoice Management System",
    text: "Manage client records, create invoices, track due dates and payment statuses, and review paid, outstanding, and overdue amounts.",
    tags: ["Python", "FastAPI", "React", "SQLAlchemy", "SQLite"], icon: <ReceiptText />,
    features: ["Client directory and invoice creation", "Draft, sent, paid, and overdue statuses", "Invoiced, received, and outstanding totals"], github: "https://github.com/SHYAMcreator/freelance-invoice-manager"
  }
];

const skillGroups = [
  ["LANGUAGES", ["Python", "JavaScript", "SQL", "HTML5", "CSS3"]],
  ["BACKEND", ["FastAPI", "Flask", "Django fundamentals", "REST APIs", "SQLAlchemy"]],
  ["FRONTEND", ["React", "Responsive UI", "Vite", "API Integration"]],
  ["DATABASES", ["SQLite", "MySQL", "PostgreSQL", "Relational Data Modeling"]],
  ["TOOLS & DELIVERY", ["Git", "GitHub", "Docker", "Postman", "VS Code"]],
  ["AI & DATA", ["LLM Integration", "RAG", "Document Processing", "Semantic Search"]]
];

function Heading({ label, title, description }) {
  return <div className="section-heading"><span className="eyebrow">{label}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "Full-stack web application", message: "" });
  const [status, setStatus] = useState({ loading: false, text: "", error: false });
  const links = [["About", "#about"], ["Services", "#services"], ["Projects", "#projects"], ["Skills", "#skills"], ["Education", "#education"], ["Contact", "#contact"]];

  function updateForm(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submitContact(event) {
    event.preventDefault();
    setStatus({ loading: true, text: "", error: false });
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Unable to submit your inquiry.");
      setStatus({ loading: false, text: `${data.message} Reference #${data.inquiry_id}.`, error: false });
      setForm({ name: "", email: "", service: "Full-stack web application", message: "" });
    } catch (error) {
      setStatus({ loading: false, text: error.message || `Could not connect to the backend. Start FastAPI at ${API_URL}.`, error: true });
    }
  }

  return <div className="app-shell">
    <header className="header">
      <a className="brand" href="#home"><span className="brand-icon"><Braces /></span><span>SHYAM<span className="accent">.DEV</span></span></a>
      <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? "nav open" : "nav"}>{links.map(([name, href]) => <a key={name} href={href} onClick={() => setMenuOpen(false)}>{name}</a>)}<a className="nav-button" href="#contact" onClick={() => setMenuOpen(false)}>Let's Talk <ArrowRight size={15}/></a></nav>
    </header>

    <main>
      <section className="hero wrap" id="home">
        <div className="hero-copy">
          <div className="availability"><span className="dot"/> AVAILABLE FOR FREELANCE PROJECTS</div>
          <p className="eyebrow hero-label">PYTHON FULL-STACK DEVELOPER</p>
          <h1>Hi, I'm <span className="gradient">Karumuri Shyam.</span><br/>I build web apps that work.</h1>
          <p className="hero-description">I build practical web applications using Python, FastAPI, React, and SQL databases—from backend APIs and responsive interfaces to AI-powered features that solve real problems.</p>
          <div className="hero-actions"><a className="button primary" href="#projects">Explore my work <ArrowRight size={17}/></a><a className="button secondary" href="#contact">Start a project <ArrowUpRight size={17}/></a></div>
          <div className="tech-line"><span>BUILDING WITH</span><b>Python</b><i/><b>FastAPI</b><i/><b>React</b><i/><b>SQL</b></div>
          <div className="hero-contact"><a href="mailto:karumurishyam01@gmail.com"><Mail size={15}/> karumurishyam01@gmail.com</a><a href="tel:8499965286"><Phone size={15}/> 8499965286</a><a href={GITHUB_PROFILE} target="_blank" rel="noreferrer"><Github size={15}/> GitHub</a><a href={LINKEDIN_PROFILE} target="_blank" rel="noreferrer"><Linkedin size={15}/> LinkedIn</a></div>
        </div>
        <div className="hero-art">
          <div className="orbit orbit-a"/><div className="orbit orbit-b"/>
          <div className="code-card"><div className="code-header"><span className="window-dots"><i/><i/><i/></span><span>main.py</span><small>PYTHON</small></div><div className="code-body">
            <p><em>01</em><span className="purple">from</span> fastapi <span className="purple">import</span> FastAPI</p><p><em>02</em></p><p><em>03</em>app = FastAPI()</p><p><em>04</em></p><p><em>05</em><span className="yellow">@app.get</span>(<span className="green">"/health"</span>)</p><p><em>06</em><span className="purple">def</span> <span className="blue">health</span>():</p><p><em>07</em>&nbsp;&nbsp;&nbsp;&nbsp;<span className="purple">return</span> {"{"}</p><p><em>08</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="green">"status"</span>: <span className="green">"ready"</span></p><p><em>09</em>&nbsp;&nbsp;&nbsp;&nbsp;{"}"}</p></div><div className="code-footer"><span><span className="dot"/> API ready</span><span>Python · UTF-8</span></div></div>
          <div className="float-chip chip-one"><Code2 size={16}/> Clean code</div><div className="float-chip chip-two"><Database size={16}/> Solid data</div>
        </div>
        <a className="scroll" href="#about">— SCROLL TO EXPLORE</a>
      </section>

      <div className="trust"><div className="wrap trust-inner"><span>BUILDING SOLUTIONS WITH</span><b><Code2/> Web Applications</b><b><Server/> Backend APIs</b><b><Database/> Data Solutions</b><b><Sparkles/> AI Integrations</b></div></div>

      <section className="wrap section" id="about">
        <Heading label="A LITTLE ABOUT ME" title={<>Engineering with <span className="gradient">purpose.</span></>}/>
        <div className="about-grid"><div><p className="large-copy">I turn business requirements into useful, maintainable software.</p><p className="muted">My focus is Python full-stack development: designing APIs, connecting databases, building responsive React interfaces, and integrating AI capabilities where they add value. I aim for clear communication, practical delivery, and code that is easier to maintain.</p><a className="text-link" href="#contact">Have a project in mind? <ArrowRight size={16}/></a></div>
          <div className="fact-list"><div className="fact"><span><Braces/></span><div><h3>Backend development</h3><p>API endpoints, validation, and business logic.</p></div></div><div className="fact"><span><Layers3/></span><div><h3>Full-stack delivery</h3><p>Frontend, backend, and databases connected end to end.</p></div></div><div className="fact"><span><Sparkles/></span><div><h3>AI-enabled applications</h3><p>Document Q&A and useful LLM-powered workflows.</p></div></div></div>
        </div>
      </section>

      <section className="section shaded" id="services"><div className="wrap"><Heading label="WHAT I CAN DO FOR YOU" title={<>Services built around <span className="gradient">your goals.</span></>} description="Flexible help for new builds, existing applications, integrations, and improvements."/><div className="services-grid">{services.map((service, i) => <article className="service-card" key={service.title}><div className="service-top"><span className="service-icon">{service.icon}</span><small>0{i+1}</small></div><h3>{service.title}</h3><p>{service.text}</p><a href="#contact" aria-label={`Ask about ${service.title}`}><ArrowUpRight size={17}/></a></article>)}</div></div></section>

      <section className="wrap section" id="projects"><Heading label="PROJECT PORTFOLIO" title={<>Practical projects. <span className="gradient">Real features.</span></>} description="Explore five full-stack and AI-focused projects. Open the source repositories to review implementation details; live demos will be added as each app is deployed."/>
        <div className="projects-grid">{projects.map(project => <article className="project-card" key={project.no}><div className={`project-art art-${project.no}`}><div className="art-grid"/><span className="project-icon">{project.icon}</span><small>{project.no}</small><label>{project.type}</label></div><div className="project-info"><div className="project-title"><h3>{project.title}</h3><span>{project.no}</span></div><p>{project.text}</p><ul className="feature-list">{project.features.map(feature => <li key={feature}><CheckCircle2 size={14}/>{feature}</li>)}</ul><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-actions">{project.github ? <a href={project.github} target="_blank" rel="noreferrer"><Github size={14}/> View source <ArrowUpRight size={13}/></a> : <span className="project-link-note">Add your repository URL before publishing</span>}</div></div></article>)}</div>
      </section>

      <section className="section shaded" id="skills"><div className="wrap"><Heading label="MY TOOLKIT" title={<>The tools behind the <span className="gradient">work.</span></>} description="A practical stack for application development, API integration, data handling, and AI features."/><div className="skills-grid">{skillGroups.map(([group, items]) => <div className="skill-group" key={group}><h3>{group}</h3><div className="tags">{items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div></div></section>

      <section className="wrap section" id="education"><Heading label="EDUCATION" title={<>A foundation in <span className="gradient">engineering.</span></>}/><div className="education-card"><span className="education-icon"><GraduationCap/></span><div><h3>Bachelor of Technology (B.Tech)</h3><p>Electronics and Communication Engineering (ECE)</p><span>Education details provided for portfolio profile</span></div></div></section>

      <section className="section shaded"><div className="wrap"><Heading label="HOW I WORK" title={<>A clear path from idea <span className="gradient">to delivery.</span></>}/><div className="process-grid">{[["01","Understand","Clarify goals, requirements, and success criteria."],["02","Plan","Agree on scope, approach, and milestones."],["03","Build","Implement features in clear, testable steps."],["04","Deliver","Test, document, and prepare a clean handover."]].map(([n,t,d])=><div className="process" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>

      <section className="contact-section" id="contact"><div className="wrap contact-grid"><div className="contact-copy"><span className="eyebrow">LET'S WORK TOGETHER</span><h2>Have an idea?<br/><span className="gradient">Let's build it.</span></h2><p>Tell me what you want to build, improve, or automate. Share your requirements and we can discuss the next step.</p>
        <div className="contact-detail"><span><Mail/></span><div><small>EMAIL</small><a href="mailto:karumurishyam01@gmail.com">karumurishyam01@gmail.com</a></div></div>
        <div className="contact-detail"><span><Phone/></span><div><small>PHONE</small><a href="tel:8499965286">8499965286</a></div></div>
        <div className="contact-detail"><span><Github/></span><div><small>GITHUB</small><a href={GITHUB_PROFILE} target="_blank" rel="noreferrer">github.com/SHYAMcreator <ArrowUpRight size={12}/></a></div></div>
        <div className="contact-detail"><span><Linkedin/></span><div><small>LINKEDIN</small><a href={LINKEDIN_PROFILE} target="_blank" rel="noreferrer">linkedin.com/in/karumurishyamlink <ArrowUpRight size={12}/></a></div></div>
      </div>
      <form className="contact-form" onSubmit={submitContact}><h3>Tell me about your project</h3><p className="form-subtitle">Fields marked * are required.</p>
        <label htmlFor="name">Your name *</label><input id="name" name="name" value={form.name} onChange={updateForm} placeholder="Your name" required minLength={2} maxLength={100}/>
        <label htmlFor="email">Email address *</label><input id="email" name="email" type="email" value={form.email} onChange={updateForm} placeholder="you@company.com" required maxLength={254}/>
        <label htmlFor="service">What do you need help with?</label><select id="service" name="service" value={form.service} onChange={updateForm}><option>Full-stack web application</option><option>Python backend / REST API</option><option>React frontend</option><option>Database design</option><option>API integration / automation</option><option>AI integration</option><option>Bug fixing / maintenance</option><option>Other</option></select>
        <label htmlFor="message">Project details *</label><textarea id="message" name="message" value={form.message} onChange={updateForm} placeholder="What are you trying to build?" rows={5} required minLength={10} maxLength={5000}/>
        <button className="button primary submit" type="submit" disabled={status.loading}>{status.loading ? "Sending..." : "Send project inquiry"} <ArrowRight size={17}/></button>
        {status.text && <p className={status.error ? "form-status error" : "form-status"} role="status">{status.text}</p>}
        <p className="privacy-note">Your inquiry is sent to the portfolio API. Email alerts are not enabled yet; production hosting should use persistent database storage.</p>
      </form></div></section>
    </main>

    <footer className="footer"><div className="wrap footer-main"><a className="brand" href="#home"><span className="brand-icon"><Braces/></span><span>SHYAM<span className="accent">.DEV</span></span></a><p>Python, React, and practical problem-solving.</p><a href="#home">Back to top ↑</a></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Karumuri Shyam · Python Full-Stack Developer</span><span className="footer-social"><a href={GITHUB_PROFILE} target="_blank" rel="noreferrer">GitHub</a><a href={LINKEDIN_PROFILE} target="_blank" rel="noreferrer">LinkedIn</a><span>PYTHON · FASTAPI · REACT</span></span></div></footer>
  </div>;
}
