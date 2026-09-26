import React, { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: "rag",
    label: "FLAGSHIP PROJECT",
    title: "RAG Assistant",
    description:
      "Document intelligence system for querying and understanding large technical documents using retrieval augmented generation.",
    tags: ["Python", "Qdrant", "LLM", "Streamlit"],
    url: "https://github.com/arun-shankar-s/Adaptive-RAG",
    image: "/images/rag.png",
  },
  {
    id: "storyboard",
    label: "PROJECT",
    title: "AI Coding Assistant",
    description: "A lightweight AI-powered coding assistant built with Python, Flask, and an Ollama-hosted Large Language Model (LLM).",
    tags: ["Python", "Flask","Ollama"],
    url: "https://github.com/arun-shankar-s/Coding-Assistant",
    image: "/images/ai-coding-assistant.png",
  },
  {
    id: "emoflix",
    label: "PROJECT",
    title: "EmoFlix",
    description: "Emotion-aware movie recommendation system using facial expression recognition.",
    tags: ["Python", "OpenCV"],
    url: "https://github.com/arun-shankar-s/Emoflix",
    image: "/images/emoflix.png",
  },
];

// Same template renders both the expanded (main) and minimized project states; CSS controls sizing.
function ProjectCard({ project, isMain, onSelect, onHover, onPreviewClick }) {
  return (
    <article
      className={`project-card ${isMain ? "is-main" : "is-minimized"}`}
      onMouseEnter={onHover}
      onClick={onSelect}
    >
      <div className="project-copy">
        <div className="project-label">{project.label}</div>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <div className="tags">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
        <a className="case-link" href={project.url} onClick={(e) => e.stopPropagation()}>
          View Case Study →
        </a>
      </div>
      <div className="project-visual">
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          onClick={onPreviewClick}
        />
      </div>
    </article>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState("rag");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [lightboxProject, setLightboxProject] = useState(null);
  const [lightboxMoment, setLightboxMoment] = useState(null);
  const [isMobileProjects, setIsMobileProjects] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches
  );
  const workGridRef = useRef(null);

  const mainId = isMobileProjects ? selectedProject : hoveredProject || selectedProject;
  const mainProject = projects.find((p) => p.id === mainId);
  const sideProjects = projects.filter((p) => p.id !== mainId);

  // Native listener: React's synthetic mouseleave can miss the exit event when the
  // hovered card remounts into a different slot (main/side) mid-hover.
  useEffect(() => {
    const el = workGridRef.current;
    if (!el) return;
    const handleLeave = () => setHoveredProject(null);
    el.addEventListener("mouseleave", handleLeave);
    return () => el.removeEventListener("mouseleave", handleLeave);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 760px)");
    const handleViewportChange = () => {
      setIsMobileProjects(mediaQuery.matches);
      if (mediaQuery.matches) setHoveredProject(null);
    };
    handleViewportChange();
    mediaQuery.addEventListener("change", handleViewportChange);
    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, []);

  useEffect(() => {
    if (!lightboxProject) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightboxProject(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxProject]);

  useEffect(() => {
    if (!lightboxMoment) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightboxMoment(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxMoment]);

  return (
<div className="page">
{/* NAV */}
<nav className="nav">
<div className="brand">
<div className="brand-name">ARUN SHANKAR</div>
<div className="brand-role">Software Engineer</div>
</div>
<div className="nav-links">
<a href="#home">Home</a>
<a href="#work">Work</a>
<a href="#lab">Lab</a>
<a href="#notes">Notes</a>
<a href="#experience">About</a>
</div>
<a className="resume-top" href="/resume.pdf" download>Resume ↗</a>
</nav>
{/* HERO */}
{/* HERO */}
<header className="hero" id="home">
  <div className="hero-copy">
    <div className="eyebrow">SOFTWARE ENGINEER · AI / BACKEND</div>

    <h1>
      Building reliable systems<br />
      with the <span className="orange">power of AI.</span>
    </h1>

    <p className="hero-description">
      Software Engineer at UST focused on backend systems,
      data pipelines, and AI/LLM applications.
    </p>

    <div className="actions">
      <a className="btn btn-primary" href="#work">View My Work →</a>
      <a className="btn" href="/resume.pdf">Resume ↓</a>
    </div>

    <div className="socials">
      <span className="social">
        <span className="icon">◉</span>
        <a href="https://github.com/arun-shankar-s" target="_blank" rel="noopener noreferrer">GitHub</a>
      </span>

      <span className="social">
        <span className="icon">in</span>
        <a href="https://www.linkedin.com/in/arun-shankar1221" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </span>

      <span className="social">
        <span className="icon">✉</span>
        <a href="mailto:arunshankar1221@gmail.com">arunshankar1221@gmail.com</a>
      </span>
    </div>
  </div>

  {/* HERO PHOTO */}
  <img
  src="/images/profile.png"
  alt="Arun Shankar"
  className="hero-photo"
/>

  <aside className="hero-side">
    <div className="hero-side-line"></div>

    <ul>
      <li>Build</li>
      <li>Learn</li>
      <li>Ship</li>
    </ul>

    <div className="hand-note">
      Same engineer.<br />
      Bigger problems.
    </div>
  </aside>
</header>
{/* FEATURED WORK */}
<section className="section" id="work">
<div className="section-head">
<div className="section-title">
<span className="section-number">01</span>
<span>/</span>
<span>FEATURED WORK</span>
</div>
<span className="section-link">View all projects →</span>
</div>
<div className="work-grid" ref={workGridRef}>
<div className="work-main">
<ProjectCard
  project={mainProject}
  isMain
  onSelect={isMobileProjects ? undefined : () => setSelectedProject(mainProject.id)}
  onHover={isMobileProjects ? undefined : () => setHoveredProject(mainProject.id)}
  onPreviewClick={(event) => {
    event.stopPropagation();
    setLightboxProject(mainProject);
  }}
/>
</div>
<div className="work-side">
{sideProjects.map((project) => (
  <ProjectCard
    key={project.id}
    project={project}
    isMain={false}
    onSelect={isMobileProjects ? undefined : () => setSelectedProject(project.id)}
    onHover={isMobileProjects ? undefined : () => setHoveredProject(project.id)}
    onPreviewClick={(event) => {
      event.stopPropagation();
      setLightboxProject(project);
    }}
  />
))}
</div>
</div>
</section>
{lightboxProject && (
  <div
    className="image-lightbox"
    role="dialog"
    aria-modal="true"
    aria-label={`${lightboxProject.title} image preview`}
    onClick={() => setLightboxProject(null)}
  >
    <button
      className="image-lightbox-close"
      type="button"
      aria-label="Close image preview"
      onClick={() => setLightboxProject(null)}
    >
      ×
    </button>
    <img
      src={lightboxProject.image}
      alt={`${lightboxProject.title} full preview`}
      onClick={(event) => event.stopPropagation()}
    />
  </div>
)}
{/* AI ENGINEERING LAB */}
<section className="section lab" id="lab">
<div className="section-head">
<div className="section-title">
<span className="section-number">02</span>
<span>/</span>
<span>AI ENGINEERING LAB</span>
</div>
<span className="section-link">Explore the lab →</span>
</div>
<div className="lab-grid">
<div className="lab-intro">
<h2>From prompts<br/>to working systems.</h2>
<p>Exploring how to build real software with LLMs, agents, tools and context.</p>
<a className="read-more" href="#">Read More →</a>
</div>
<div className="pipeline">
<div className="pipeline-step">
<div className="step-label">INPUT</div>
<div className="step-box">
<span>◉  Codebase</span>
<span>◉  Documents</span>
<span>◉  Web</span>
<span>◉  Data</span>
</div>
</div>
<div className="pipeline-step">
<div className="step-label">ORCHESTRATOR</div>
<div className="step-box step-box-center">
<span>Routes tasks</span>
<span>by type</span>
</div>
</div>
<div className="pipeline-step">
<div className="step-label">AGENTS</div>
<div className="step-box">
<span>◉  Architect</span>
<span>◉  Coder</span>
<span>◉  Debugger</span>
<span>◇  + others</span>
</div>
</div>
<div className="pipeline-step">
<div className="step-label">MODELS</div>
<div className="step-box">
<span>◉  Claude Sonnet/Opus/Haiku</span>
<span>◉  GPT-5.6 Luna/Terra</span>
<span>◉  DeepSeek V4/V4.1</span>
<span>◉  Kimi K3/K2.7</span>
<span>◇  Ollama · qWEN · GEMMA</span>
</div>
</div>
<div className="pipeline-step">
<div className="step-label">MODEL ROUTING</div>
<div className="step-box step-box-center">
<span>▣  LiteLLM</span>
<span>◇  Selection logic</span>
</div>
</div>
<div className="pipeline-step">
<div className="step-label">CODE GENERATION</div>
<div className="step-box step-box-center">
<span>▣  Generated</span>
<span>◇  Output</span>
</div>
</div>
<div className="pipeline-step">
<div className="step-label">MCP ANALYSIS</div>
<div className="step-box">
<span>◉  Qartez — impact</span>
<span>◉  Serena — semantic editing</span>
</div>
</div>
<div className="pipeline-step">
<div className="step-label">VALIDATION</div>
<div className="step-box">
<span>▣  Playwright</span>
<span>◇  Web testing</span>
</div>
</div>
<div className="pipeline-step">
<div className="step-label">OUTPUT</div>
<div className="step-box dark">
<span>Polished code</span>
<span>Opencode / Claude Code</span>
</div>
</div>
<div className="iterate">↖ ───────── Iterate → Improve → Ship ───────── ↗</div>
</div>
</div>
</section>
{/* EXPERIENCE + TECH */}
<div className="two-col">
<section id="experience">
<div className="section-title">
<span className="section-number">03</span>
<span>/</span>
<span>EXPERIENCE</span>
</div>
<div className="timeline">
<div className="timeline-item">
<div className="timeline-date">2025 – Present</div>
<div className="timeline-content">
<strong>UST<br/>Software Developer</strong>
<p>
              Building data pipelines, AI applications and
              automation systems. Working with Python, PySpark
              and SQL across data engineering workflows.
            </p>
<div className="tags">
<span className="tag">Python</span>
<span className="tag">PySpark</span>
<span className="tag">SQL</span>
<span className="tag">RAG</span>
</div>
</div>
</div>
<div className="timeline-item">
<div className="timeline-date">2023 – 2025</div>
<div className="timeline-content">
<strong>MCA – Lourdes Matha College of Science and Technology</strong>
<p>7th Rank in MCA batch 2023–25.</p>
</div>
</div>
</div>
</section>
<section>
<div className="section-title">
<span className="section-number">04</span>
<span>/</span>
<span>TECHNICAL FOCUS</span>
</div>
<div className="tech-grid">
<div className="tech-card">
<div className="tech-icon">&lt;/&gt;</div>
<div>
<strong>Backend</strong>
<p>Python, FastAPI, SQL<br/>PostgreSQL, APIs</p>
</div>
</div>
<div className="tech-card">
<div className="tech-icon">♧</div>
<div>
<strong>AI / ML</strong>
<p>RAG, LLMs<br/>Embeddings, PyTorch<br/>HuggingFace</p>
</div>
</div>
<div className="tech-card">
<div className="tech-icon">◉</div>
<div>
<strong>Data Engineering</strong>
<p>PySpark, ETL<br/>Data Pipelines<br/>Databricks, Informatica</p>
</div>
</div>
<div className="tech-card">
<div className="tech-icon">☁</div>
<div>
<strong>Infrastructure</strong>
<p>Docker, AWS<br/>Redis, Git<br/>Linux</p>
</div>
</div>
</div>
</section>
</div>
{/* MOMENTS */}
<section className="section">
<div className="section-head">
<div className="section-title">
<span className="section-number">05</span>
<span>/</span>
<span>MOMENTS</span>
</div>
<span className="section-link">View all photos →</span>
</div>
<div className="moments-grid">
<article className="moment">
<div className="moment-image" onClick={() => setLightboxMoment({ image: "/images/graduation.jpg", title: "Graduation", subtitle: "MCA 2023–25" })}>
<img src="/images/graduation.jpg" alt="Graduation" />
</div>
<div className="moment-info">
<strong>Graduation</strong>
<span>MCA 2023–25</span>
</div>
</article>
<article className="moment">
<div className="moment-image" onClick={() => setLightboxMoment({ image: "/images/rank7.jpg", title: "University Rank Holder", subtitle: "MCA 2023–25 •  Award by Trivandrum Collector Anu Kumari" })}>
<img src="/images/rank7.jpg" alt="University Rank Holder" />
</div>
<div className="moment-info">
<strong>University Rank Holder</strong>
<span>MCA 2023–25 •  Award by Trivandrum Collector Anu Kumari</span>
</div>
</article>
<article className="moment">
<div className="moment-image" onClick={() => setLightboxMoment({ image: "/images/bos.jpg", title: "Best of Us Event", subtitle: "UST 26th Foundation Day, Trivandrum" })}>
<img src="/images/bos.jpg" alt="Best of Us Event" />
</div>
<div className="moment-info">
<strong>Best of Us Event</strong>
<span>UST 26th Foundation Day, Trivandrum</span>
</div>
</article>
<article className="moment">
<div className="moment-image" onClick={() => setLightboxMoment({ image: "/images/rank3.png", title: "First Semester Award", subtitle: "3rd Rank • Award by Infosys VP Sunil Jose" })}>
<img src="/images/rank3.png" alt="First Semester Award" />
</div>
<div className="moment-info">
<strong>First Semester Award</strong>
<span>3rd Rank • Award by Infosys VP Sunil Jose</span>
</div>
</article>
</div>
</section>
{lightboxMoment && (
<div
className="image-lightbox"
role="dialog"
aria-modal="true"
aria-label={`${lightboxMoment.title} full preview`}
onClick={() => setLightboxMoment(null)}
>
<button
className="image-lightbox-close"
type="button"
aria-label="Close image preview"
onClick={() => setLightboxMoment(null)}
>
×
</button>
<div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
<img src={lightboxMoment.image} alt={`${lightboxMoment.title} full preview`} />
<div className="lightbox-caption">
<strong>{lightboxMoment.title}</strong>
<span>{lightboxMoment.subtitle}</span>
</div>
</div>
</div>
)}
{/* NOTES */}
<section className="section" id="notes">
<div className="section-head">
<div className="section-title">
<span className="section-number">06</span>
<span>/</span>
<span>LATEST NOTES</span>
</div>
<span className="section-link">View all notes →</span>
</div>
<div className="notes-grid">
<a
className="note"
href="https://medium.com/@arunshankar1221/rag-isnt-about-retrieval-it-s-about-ingestion-lessons-from-a-real-project-faa864260a9f"
target="_blank"
rel="noopener noreferrer"
>
<div className="note-title">RAG isn't about retrieval, it's about ingestion: Lessons from a real project</div>
<div className="note-date">May 21, 2026</div>
<div className="note-arrow">↗</div>
</a>
</div>
</section>
{/* CONTACT */}
<section className="section contact">
<div className="section-head">
<div className="section-title">
<span className="section-number">07</span>
<span>/</span>
<span>LET'S BUILD SOMETHING USEFUL</span>
</div>
</div>
<div className="contact-grid">
<h2>Have an engineering problem<br/>or an interesting idea?</h2>
<div className="contact-intro">
        I'm open to opportunities, collaborations
        and projects that make a real impact.
      </div>
<div className="contact-links">
<div className="contact-link">✉ <a href="mailto:arunshankar1221@gmail.com">arunshankar1221@gmail.com</a></div>
<div className="contact-link">in <a href="https://www.linkedin.com/in/arun-shankar1221" target="_blank" rel="noopener noreferrer">linkedin.com/in/arun-shankar-s</a></div>
<div className="contact-link">◉ <a href="https://github.com/arun-shankar-s" target="_blank" rel="noopener noreferrer">github.com/arun-shankar-s</a></div>
</div>
{/* <div className="contact-note">
        Good<br/>
        systems<br/>
        create<br/>
        better<br/>
        opportunities.
      </div> */}
</div>
</section>
{/* FOOTER */}
<footer className="footer">
<div>© 2026 Arun Shankar. Built with curiosity.</div>
<div className="footer-links">
<span>Work</span>
<span>Learn</span>
<span>Build</span>
<span>Repeat</span>
<span>↑</span>
</div>
</footer>
</div>
  );
}
