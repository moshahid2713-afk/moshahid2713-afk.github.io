"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Command,
  Download,
  ExternalLink,
  FileCode2,
  GitBranch,
  Contact,
  Menu,
  Monitor,
  MousePointer2,
  Network,
  Send,
  Terminal,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { certifications, journey, learning, problemSet, profile, projects, skills, type Project } from "@/data/portfolio";

const navItems = ["Home", "About", "Skills", "Projects", "GitHub", "Journey", "Achievements", "Learning", "Contact"];
const sceneIds = ["home", "about", "skills", "projects", "github", "journey", "achievements", "learning", "contact"];
const terminalLines = [
  "$ whoami\nMohammed Shahid",
  "$ education\nB.Tech CSE | 2025 → 2029",
  "$ focus\nDSA • Development • AI/ML",
  "$ status\nLearning → Building → Improving",
];

function SectionLabel({ children, index }: { children: React.ReactNode; index: string }) {
  return <div className="section-label"><span>{index}</span><span>{children}</span></div>;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay, ease: "easeOut" }}>{children}</motion.div>;
}

function MagneticLink({ children, href, className = "", external = false }: { children: React.ReactNode; href: string; className?: string; external?: boolean }) {
  return <a className={`magnetic-link ${className}`} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{children}</a>;
}

function WorkspaceLayer({ cursorRef }: { cursorRef: React.RefObject<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = canvas?.parentElement;
    if (!canvas || !root) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const particles = Array.from({ length: touch ? 18 : 34 }, (_, index) => ({
      x: (index * 97) % window.innerWidth,
      y: (index * 53) % window.innerHeight,
      vx: ((index % 3) - 1) * 0.08,
      vy: (((index + 1) % 3) - 1) * 0.08,
      radius: index % 5 === 0 ? 2 : 1,
    }));
    const pointer = { x: -1000, y: -1000, active: false };
    let frame = 0;
    let animation = 0;
    let width = 0;
    let height = 0;
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const move = (event: PointerEvent) => {
      if (touch) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const leave = () => { pointer.active = false; };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      const glowX = pointer.active ? pointer.x : width * 0.72;
      const glowY = pointer.active ? pointer.y : height * 0.22;
      const glow = context.createRadialGradient(glowX, glowY, 0, glowX, glowY, 220);
      glow.addColorStop(0, "rgba(103,232,249,.075)");
      glow.addColorStop(1, "rgba(103,232,249,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      particles.forEach((particle) => {
        if (!reduce) {
          if (pointer.active && !touch) {
            const dx = particle.x - pointer.x;
            const dy = particle.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 150 && distance > 0) {
              particle.x += (dx / distance) * 0.22;
              particle.y += (dy / distance) * 0.22;
            }
          }
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < -10) particle.x = width + 10;
          if (particle.x > width + 10) particle.x = -10;
          if (particle.y < -10) particle.y = height + 10;
          if (particle.y > height + 10) particle.y = -10;
        }
        context.fillStyle = "rgba(144,177,220,.28)";
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
      if (!touch && !reduce) {
        for (let index = 0; index < particles.length; index += 1) {
          for (let next = index + 1; next < particles.length; next += 1) {
            const distance = Math.hypot(particles[index].x - particles[next].x, particles[index].y - particles[next].y);
            if (distance < 105) {
              context.strokeStyle = `rgba(103,232,249,${0.07 * (1 - distance / 105)})`;
              context.lineWidth = 1;
              context.beginPath();
              context.moveTo(particles[index].x, particles[index].y);
              context.lineTo(particles[next].x, particles[next].y);
              context.stroke();
            }
          }
        }
      }
      animation = reduce ? 0 : window.requestAnimationFrame(draw);
    };
    const onFrame = (event: PointerEvent) => {
      if (touch) return;
      if (!frame) frame = window.requestAnimationFrame(() => {
        frame = 0;
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);
        root.style.setProperty("--hero-x", `${x * 10}px`);
        root.style.setProperty("--hero-y", `${y * 10}px`);
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
          cursorRef.current.classList.add("is-visible");
        }
      });
    };
    const hideCursor = () => cursorRef.current?.classList.remove("is-visible");
    const hoverIn = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest("button, a, input, textarea, .project-card, .terminal-shell, .learning-chip, .skill-item")) cursorRef.current?.classList.add("is-hovering");
    };
    const hoverOut = (event: PointerEvent) => {
      if (!(event.relatedTarget as HTMLElement | null)?.closest?.("button, a, input, textarea, .project-card, .terminal-shell, .learning-chip, .skill-item")) cursorRef.current?.classList.remove("is-hovering");
    };
    resize();
    draw();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointermove", onFrame, { passive: true });
    window.addEventListener("pointerleave", leave, { passive: true });
    window.addEventListener("pointerover", hoverIn, { passive: true });
    window.addEventListener("pointerout", hoverOut, { passive: true });
    window.addEventListener("blur", hideCursor, { passive: true });
    return () => {
      window.cancelAnimationFrame(animation);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointermove", onFrame);
      window.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerover", hoverIn);
      window.removeEventListener("pointerout", hoverOut);
      window.removeEventListener("blur", hideCursor);
    };
  }, [cursorRef]);

  return <canvas ref={canvasRef} className="workspace-canvas" aria-hidden="true" />;
}

function TerminalWindow() {
  const reduce = useReducedMotion();
  const [line, setLine] = useState(() => reduce ? terminalLines.length : 0);
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => setLine((current) => current < terminalLines.length ? current + 1 : current), 700);
    return () => window.clearInterval(timer);
  }, [reduce]);

  function runCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = command.trim().toLowerCase();
    if (!normalized) return;
    const responses: Record<string, string> = {
      whoami: "Mohammed Shahid — B.Tech CSE | 2029",
      help: "whoami · skills · projects · clear · help",
      skills: "C · C++ · Python · Java · DSA · Git · GitHub · AI/ML fundamentals",
      projects: "C Line Editor · Student Record Management System · LeetCode Solutions · Mobile Recharge System",
    };
    const response = responses[normalized] ?? `command not found: ${normalized}`;
    setOutput((current) => normalized === "clear" ? [] : [...current, `> ${normalized}`, response]);
    setCommand("");
  }

  return <div className="terminal-shell" aria-label="Interactive developer terminal">
    <div className="terminal-topbar"><span className="traffic red" /><span className="traffic yellow" /><span className="traffic green" /><span className="terminal-title"><Terminal size={13} /> shahid@workspace:~</span><span className="terminal-dots">•••</span></div>
    <div className="terminal-body">
      <div className="terminal-path">~/portfolio <span>main</span></div>
      {terminalLines.slice(0, line).map((item) => <div className="terminal-line" key={item}>{item.split("\n").map((part, index) => <div key={part} className={index === 0 ? "terminal-command" : "terminal-value"}>{part}</div>)}</div>)}
      {output.map((item, index) => <div className={index % 2 === 0 ? "terminal-command" : "terminal-value"} key={`${item}-${index}`}>{item}</div>)}
      <form onSubmit={runCommand} className="terminal-input"><span>$</span><input aria-label="Terminal command" value={command} onChange={(event) => setCommand(event.target.value)} placeholder="type a command..." /><span className="cursor-block" /></form>
    </div>
  </div>;
}

function ProjectCard({ project, index, onOpen, highlighted }: { project: Project; index: number; onOpen: (project: Project) => void; highlighted: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(x, { stiffness: 180, damping: 18 });
  function tilt(event: React.MouseEvent<HTMLElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - box.left - box.width / 2) / 18);
    y.set(-(event.clientY - box.top - box.height / 2) / 18);
  }
  return <motion.article className={`project-card accent-${project.accent} ${highlighted ? "is-highlighted" : ""}`} style={{ rotateX, rotateY }} onMouseMove={tilt} onMouseLeave={() => { x.set(0); y.set(0); }} onClick={() => onOpen(project)} tabIndex={0} onKeyDown={(event) => event.key === "Enter" && onOpen(project)}>
    <div className="project-card-top"><span className="project-index">0{index + 1}</span><span className="project-category">{project.category}</span><ArrowUpRight size={18} /></div>
    <div className="project-icon"><FileCode2 size={25} /></div>
    <h3>{project.name}</h3>
    <p>{project.description}</p>
    <div className="tag-row">{project.technologies.map((technology) => <motion.span className="tag" whileHover={{ y: -3 }} key={technology}>{technology}</motion.span>)}</div>
    <div className="project-footer"><span>View details</span><ChevronRight size={16} />{project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} on GitHub`} onClick={(event) => event.stopPropagation()}><GitBranch size={15} /></a>}</div>
  </motion.article>;
}

function JourneyItem({ item, index }: { item: (typeof journey)[number]; index: number }) {
  return <motion.article className="timeline-item" initial={{ opacity: 0.45 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.65 }} transition={{ duration: 0.35, delay: index * 0.04 }}>
    <div className="timeline-year">{item.year}</div><div className="timeline-node"><span /></div><div className="timeline-content"><h3>{item.title}</h3><p>{item.text}</p></div>
  </motion.article>;
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formStatus, setFormStatus] = useState("");
  const [resumeStatus, setResumeStatus] = useState("");
  const [scroll, setScroll] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const filteredProjects = useMemo(() => projectFilter === "All" ? projects : projects.filter((project) => project.category === projectFilter), [projectFilter]);

  useEffect(() => {
    const sections = sceneIds;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? (window.scrollY / max) * 100 : 0);
      const current = sections.find((id) => { const element = document.getElementById(id); return element && element.getBoundingClientRect().top <= 180 && element.getBoundingClientRect().bottom > 180; });
      if (current) setActive(current === "home" ? "Home" : current[0].toUpperCase() + current.slice(1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let lockedUntil = 0;
    let startX = 0;
    let startY = 0;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const sceneIndex = () => Math.max(0, sceneIds.findIndex((id) => id === active.toLowerCase()));
    const moveScene = (direction: 1 | -1) => {
      const next = Math.min(sceneIds.length - 1, Math.max(0, sceneIndex() + direction));
      if (next !== sceneIndex()) document.getElementById(sceneIds[next])?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const wheel = (event: WheelEvent) => {
      if (touch || Math.abs(event.deltaY) < 18 || Date.now() < lockedUntil) return;
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea, .problem-list")) return;
      event.preventDefault();
      lockedUntil = Date.now() + 680;
      moveScene(event.deltaY > 0 ? 1 : -1);
    };
    const key = (event: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((event.target as HTMLElement).tagName)) return;
      if (event.key === "ArrowDown" || event.key === "PageDown") { event.preventDefault(); moveScene(1); }
      if (event.key === "ArrowUp" || event.key === "PageUp") { event.preventDefault(); moveScene(-1); }
      if (event.key === "Home") { event.preventDefault(); document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }); }
      if (event.key === "End") { event.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }
    };
    const touchStart = (event: TouchEvent) => { startX = event.touches[0]?.clientX ?? 0; startY = event.touches[0]?.clientY ?? 0; };
    const touchEnd = (event: TouchEvent) => {
      const endX = event.changedTouches[0]?.clientX ?? 0;
      const endY = event.changedTouches[0]?.clientY ?? 0;
      if (Math.abs(startY - endY) > 90 && Math.abs(startY - endY) > Math.abs(startX - endX)) moveScene(startY > endY ? 1 : -1);
    };
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("keydown", key);
    window.addEventListener("touchstart", touchStart, { passive: true });
    window.addEventListener("touchend", touchEnd, { passive: true });
    return () => { window.removeEventListener("wheel", wheel); window.removeEventListener("keydown", key); window.removeEventListener("touchstart", touchStart); window.removeEventListener("touchend", touchEnd); };
  }, [active]);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setFormStatus("Thanks for reaching out. This form is ready to connect to an email service.");
    form.reset();
  }

  async function openResume(download: boolean) {
    const response = await fetch("/resume.pdf", { method: "HEAD" });
    if (!response.ok) {
      setResumeStatus("Resume PDF not added yet.");
      return;
    }
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.target = download ? "_self" : "_blank";
    if (download) link.download = "Mohammed-Shahid-Resume.pdf";
    link.click();
  }

  function goTo(id: string) { setMenuOpen(false); document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth", block: "start" }); }

  return <div className="site-shell">
    <div className="scroll-progress" style={{ width: `${scroll}%` }} />
    <div ref={cursorRef} className="custom-cursor"><span /></div>
    <WorkspaceLayer cursorRef={cursorRef} /><div className="ambient-grid" aria-hidden="true" /><div className="ambient-glow glow-one" aria-hidden="true" /><div className="ambient-glow glow-two" aria-hidden="true" />
    <header className="navbar"><button className="brand" onClick={() => goTo("home")} aria-label="Go to home"><span className="brand-mark"><Command size={17} /></span><span>MS<span className="brand-dot">.</span></span></button><nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">{navItems.map((item) => <button className={active.toLowerCase() === item.toLowerCase() ? "active" : ""} key={item} onClick={() => goTo(item)}>{item}</button>)}<span className="mobile-nav-social"><MagneticLink href={profile.github} external>GitHub <ArrowUpRight size={13} /></MagneticLink><MagneticLink href={profile.linkedin} external>LinkedIn <ArrowUpRight size={13} /></MagneticLink></span></nav><div className="nav-actions"><MagneticLink href={profile.github} external className="nav-social"><GitBranch size={17} /></MagneticLink><MagneticLink href={profile.linkedin} external className="nav-social"><Contact size={17} /></MagneticLink><button className="resume-link" onClick={() => openResume(false)}>Resume <Download size={14} /></button><button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button></div></header>

    <main>
      <section id="home" className="hero section-wrap"><div className="hero-copy"><div className="eyebrow"><span className="status-dot" />Available for learning, building & connecting</div><h1>Hi, I&apos;m <span>Mohammed Shahid.</span></h1><p className="hero-role">B.Tech CSE Student <i>•</i> Developer <i>•</i> Problem Solver</p><p className="hero-description">I&apos;m a Computer Science student focused on strengthening my programming fundamentals, solving problems with code, and turning what I learn into practical projects.</p><div className="hero-actions"><button className="button button-primary" onClick={() => goTo("projects")}>Explore my work <ArrowDown size={16} /></button><button className="button button-ghost" onClick={() => goTo("contact")}>Let&apos;s connect <ArrowUpRight size={16} /></button></div><div className="resume-actions"><button onClick={() => openResume(false)}>View Resume <ExternalLink size={13} /></button><button onClick={() => openResume(true)}>Download Resume <Download size={13} /></button></div>{resumeStatus && <p className="resume-status" role="status">{resumeStatus}</p>}<div className="hero-socials"><span>Find me in the wild</span><MagneticLink href={profile.github} external><GitBranch size={16} /> GitHub</MagneticLink><MagneticLink href={profile.linkedin} external><Contact size={16} /> LinkedIn</MagneticLink></div></div><motion.div className="hero-visual"><div className="visual-label label-one"><span className="pulse-dot" /> live workspace</div><TerminalWindow /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="floating-chip chip-one"><Code2 size={14} /> C++</div><div className="floating-chip chip-two"><Network size={14} /> DSA</div><div className="floating-chip chip-three"><Monitor size={14} /> Git</div></motion.div><div className="scroll-cue"><MousePointer2 size={15} /> scroll to explore</div></section>

      <section id="about" className="section-wrap content-section"><SectionLabel index="01">A little about me</SectionLabel><div className="about-grid"><div><h2>Learning in public,<br /><em>building with purpose.</em></h2><p className="large-copy">I&apos;m a B.Tech Computer Science & Engineering student learning software development one project at a time. I enjoy the clarity that comes from solving a problem, understanding why it works, and making the next attempt a little better.</p><p className="muted-copy">Right now, that means practicing DSA, building programming projects, learning AI/ML fundamentals, and continuously improving my technical skills.</p></div><div className="focus-panel"><div className="panel-heading"><span>currently focused on</span><span className="panel-line" /></div>{["Data Structures & Algorithms", "C++", "Problem Solving", "Software Development", "AI/ML Fundamentals", "Quantitative Aptitude"].map((item, index) => <div className="focus-item" key={item}><span>0{index + 1}</span>{item}<ArrowUpRight size={15} /></div>)}</div></div></section>

      <section id="skills" className="section-wrap content-section"><SectionLabel index="02">The toolkit</SectionLabel><div className="section-heading-row"><h2>Tools for the<br /><em>next problem.</em></h2><p>Click a technology to trace where it appears in the workspace.</p></div><div className="skill-focus-bar"><span>{selectedSkill ? `Filtering related work: ${selectedSkill}` : "Show all skills and projects"}</span><button className={!selectedSkill ? "selected" : ""} onClick={() => setSelectedSkill("")}>Show all</button></div><div className="skills-grid">{skills.map((skill, index) => <Reveal className="skill-group" delay={index * 0.06} key={skill.group}><div className="skill-group-head"><span>0{index + 1}</span><h3>{skill.group}</h3></div>{skill.items.map((item) => <button className={`skill-item ${selectedSkill === item ? "selected" : ""}`} onClick={() => setSelectedSkill(item)} key={item}><span className="skill-symbol">{item.slice(0, 1)}</span>{item}<ChevronRight size={14} /></button>)}</Reveal>)}</div></section>

      <section id="projects" className="section-wrap content-section projects-section"><SectionLabel index="03">Selected work</SectionLabel><div className="section-heading-row project-heading"><div><h2>Things I&apos;ve<br /><em>been building.</em></h2></div><div><p>Small, honest projects that make concepts tangible. Open one to look closer.</p><div className="filter-row">{["All", "Systems", "Problem Solving"].map((filter) => <button className={projectFilter === filter ? "selected" : ""} onClick={() => setProjectFilter(filter)} key={filter}>{filter}</button>)}</div></div></div><div className="projects-grid">{filteredProjects.map((project, index) => <Reveal delay={index * 0.06} key={project.name}><ProjectCard project={project} index={index} highlighted={!selectedSkill || project.relatedSkills?.includes(selectedSkill) === true} onOpen={setSelectedProject} /></Reveal>)}</div></section>

      <section id="github" className="section-wrap content-section github-section"><SectionLabel index="04">GitHub workspace</SectionLabel><div className="section-heading-row"><h2>Seven repos.<br /><em>One workspace.</em></h2><p>Actual public repositories from <a className="inline-link" href={profile.github} target="_blank" rel="noreferrer">@moshahid2713-afk</a>. No invented metrics.</p></div><div className="repo-dashboard">{projects.map((project, index) => <a className="repo-row" href={project.github} target="_blank" rel="noreferrer" key={project.name}><span className="repo-number">0{index + 1}</span><span className="repo-name"><GitBranch size={15} />{project.name}</span><span className="repo-category">{project.category}</span><span className="repo-stack">{project.technologies.slice(0, 3).join(" · ")}</span><ArrowUpRight size={15} /></a>)}</div></section>

      <section id="journey" className="section-wrap content-section journey-section"><SectionLabel index="05">The journey</SectionLabel><div className="section-heading-row"><h2>A work in<br /><em>progress.</em></h2><p>There&apos;s no finished version yet. Just a clear direction and a habit of showing up.</p></div><div className="timeline">{journey.map((item, index) => <JourneyItem item={item} index={index} key={item.year} />)}</div></section>

      <section id="achievements" className={`section-wrap content-section dashboard-section ${selectedSkill === "Python" ? "python-focus" : ""}`}><SectionLabel index="06">Practice room</SectionLabel><div className="dashboard-grid"><div className="problem-panel"><div className="panel-heading"><span><span className="panel-icon"><Code2 size={14} /></span> problem_solving.log</span><span className="live-label">active</span></div><div className="problem-intro"><h2>Sharpening the<br /><em>thinking muscle.</em></h2><p>Currently sharpening my problem-solving skills through Data Structures & Algorithms.</p></div><div className="problem-list">{problemSet.map(([name, category, language, concept], index) => <div className="problem-row" key={name}><span className="problem-check"><Check size={11} /></span><span>{name}</span><small>{category}</small><small className="problem-language">{language}</small><small className="problem-concept">{concept}</small><span className="problem-number">0{index + 1}</span></div>)}</div><MagneticLink href={profile.github} external className="dashboard-link">View on GitHub <ArrowUpRight size={15} /></MagneticLink></div><div className="cert-panel"><div className="panel-heading"><span><Award size={15} /> certifications</span><span className="panel-count">{certifications.length} entries</span></div>{certifications.map((cert) => <div className="cert-item" key={cert.name}><div className="cert-icon"><Award size={18} /></div><div><h3>{cert.name}</h3><p>{cert.issuer} · {cert.skill}</p></div></div>)}<div className="future-achievement"><span><BookOpen size={16} /></span><div><strong>More to come.</strong><p>Achievements will appear here as they happen.</p></div></div></div></div></section>

      <section id="learning" className="section-wrap content-section learning-section"><SectionLabel index="07">Now in the lab</SectionLabel><div className="learning-layout"><div><h2>Currently<br /><em>learning.</em></h2><p>The active tabs in my mental workspace. Hover a node to reveal the note behind it.</p></div><div className="learning-cloud">{learning.map(([item, description], index) => <motion.div className="learning-chip" whileHover={{ y: -5, rotate: index % 2 ? 2 : -2 }} key={item} tabIndex={0}><span>0{index + 1}</span><strong>{item}</strong><small>{description}</small></motion.div>)}</div></div></section>

      <section id="contact" className="section-wrap contact-section"><div className="contact-title"><SectionLabel index="07">Open a conversation</SectionLabel><h2>Let&apos;s build<br /><em>something.</em></h2><p>Have a project idea, a problem worth discussing, or just want to say hello? My inbox is open.</p><div className="contact-links"><MagneticLink href={profile.github} external><GitBranch size={17} /> GitHub <ArrowUpRight size={14} /></MagneticLink><MagneticLink href={profile.linkedin} external><Contact size={17} /> LinkedIn <ArrowUpRight size={14} /></MagneticLink></div></div><form className="contact-form" onSubmit={submitForm}><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" type="email" required placeholder="you@example.com" /></label><label>Message<textarea name="message" required minLength={10} placeholder="What&apos;s on your mind?" rows={4} /></label><button className="button button-primary" type="submit">Send message <Send size={15} /></button>{formStatus && <p className="form-status" role="status">{formStatus}</p>}</form></section>
    </main>

    <footer className="footer section-wrap"><div><span className="footer-name">Mohammed Shahid</span><span>B.Tech CSE · Developer · Learner</span></div><div className="footer-right"><span>© 2026 Mohammed Shahid</span><MagneticLink href={profile.github} external>GitHub</MagneticLink><MagneticLink href={profile.linkedin} external>LinkedIn</MagneticLink><button onClick={() => goTo("home")} aria-label="Back to top"><ArrowUp size={15} /></button></div></footer>

    <AnimatePresence>{selectedProject && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}><motion.div className="project-modal" initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${selectedProject.name} details`}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={18} /></button><span className={`modal-kicker accent-text-${selectedProject.accent}`}>{selectedProject.category} / project</span><h2>{selectedProject.name}</h2><p>{selectedProject.details}</p>{selectedProject.concepts && <div className="modal-concepts"><span>concepts</span>{selectedProject.concepts.map((concept) => <strong key={concept}>{concept}</strong>)}</div>}<div className="modal-feature-grid">{selectedProject.features.map((feature) => <span key={feature}><Check size={13} />{feature}</span>)}</div><div className="modal-bottom"><div className="tag-row">{selectedProject.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div>{selectedProject.github && <MagneticLink href={selectedProject.github} external className="button button-primary">Open repository <ExternalLink size={14} /></MagneticLink>}</div></motion.div></motion.div>}</AnimatePresence>
  </div>;
}
