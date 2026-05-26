import React, { useState, useEffect } from 'react';
import './index.css';
import ThreeHero from './ThreeHero';
import ChatBot from './ChatBot';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#about" className="logo">Charan.</a>

        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} onClick={() => setMobileOpen(false)}>{link.name}</a>
            </li>
          ))}
        </ul>

        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section id="about" className="hero">
    <div className="container hero-container-grid">
      <div className="hero-content">
        <span className="badge">Backend Engineer & AI Integrator</span>
        <h1 className="hero-title">
          Hi, I'm <span className="gradient-text">Charan M U</span>
        </h1>
        <p className="hero-subtitle">
          I build scalable <strong>Java & Spring Boot</strong> backends, design 
          <strong> REST APIs</strong>, and integrate <strong>AI-powered automation</strong> 
          into real-world applications.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="#contact" className="btn btn-secondary">Contact Me</a>
        </div>
        <div className="hero-socials">
          <a href="https://linkedin.com/in/charan-m-u" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="mailto:jeevancharanmu@gmail.com" aria-label="Email">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </a>
          <a href="tel:+917019301031" aria-label="Phone">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <ThreeHero />
      </div>
    </div>
  </section>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="section-header">
    <h2>{title}</h2>
    {subtitle && <p>{subtitle}</p>}
  </div>
);

const Experience = () => {
  const experiences = [
    {
      role: 'Backend Java Intern',
      company: 'L&T Technology Services (LTTS)',
      date: 'Jan 2026 – May 2026',
      points: [
        'Engineered 3–4 secure REST APIs using Java, Spring Boot, Hibernate & MySQL with JWT authentication.',
        'Optimized MySQL with JPA pagination & indexing, cutting API latency by 30–40% under peak load.',
        'Integrated Anthropic & OpenAI APIs for intelligent error classification and automated test generation.',
        'Refactored backend logic with Java Streams, improving efficiency and maintainability.',
      ]
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <SectionTitle title="Experience" subtitle="Where I've worked and what I've built" />
        <div className="timeline">
          {experiences.map((exp, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-marker"></div>
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3>{exp.role}</h3>
                    <span className="company">{exp.company}</span>
                  </div>
                  <span className="date">{exp.date}</span>
                </div>
                <ul>
                  {exp.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'Java Quiz Portal',
      year: '2025',
      desc: 'Built 20+ REST APIs on a custom Java HTTP server. Features AI-driven quiz generation (OpenAI/Claude), multiplayer rooms for 10 concurrent users, OTP auth, and role-based access control.',
      tags: ['Java', 'REST APIs', 'OpenAI', 'Claude', 'WebSocket', 'JWT']
    },
    {
      title: 'AI Workflow Automation',
      year: '2025',
      desc: 'Designed 8 n8n automation pipelines integrating WhatsApp Business API & REST webhooks. Supports 500–1000 concurrent users, reducing manual effort by 60–70%.',
      tags: ['n8n', 'WhatsApp API', 'Webhooks', 'AI Integration', 'Monitoring']
    },
    {
      title: 'IoT Smart Flooring System',
      year: '2025',
      desc: 'Intrusion detection using 20–30 sensor nodes with real-time GSM/camera alerts (2–3s response). Published peer-reviewed paper in IJRPR.',
      tags: ['IoT', 'GSM', 'Sensors', 'Real-time', 'Research']
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <SectionTitle title="Featured Projects" subtitle="Real-world builds with measurable impact" />
        <div className="projects-grid">
          {projects.map((proj, idx) => (
            <div className="project-card" key={idx}>
              <div className="project-header">
                <h3>{proj.title}</h3>
                <span className="year">{proj.year}</span>
              </div>
              <p>{proj.desc}</p>
              <div className="tags">
                {proj.tags.map((tag, i) => (
                  <span className="tag" key={i}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const categories = [
    { title: 'Languages', icon: '💻', skills: ['Java', 'Python', 'C'] },
    { title: 'Backend', icon: '⚙️', skills: ['Spring Boot', 'REST APIs', 'Spring Security', 'JPA', 'Hibernate', 'JWT Auth'] },
    { title: 'Databases', icon: '🗄️', skills: ['MySQL', 'PostgreSQL'] },
    { title: 'AI & Tools', icon: '🤖', skills: ['OpenAI APIs', 'Claude', 'GitHub Copilot', 'n8n', 'Git', 'Maven', 'JUnit'] },
    { title: 'Concepts', icon: '🧠', skills: ['DSA', 'OOP', 'System Design', 'API Design', 'Data Analysis'] },
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <SectionTitle title="Technical Skills" subtitle="My everyday toolkit" />
        <div className="skills-grid">
          {categories.map((cat, idx) => (
            <div className="skill-card" key={idx}>
              <div className="skill-icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <div className="skill-tags">
                {cat.skills.map((skill, i) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  const certs = [
    { title: 'Generative AI & LLM Foundations', issuer: 'Coursera' },
    { title: 'Python Programming Mastery', issuer: 'Udemy' },
    { title: 'Introduction to LLMs', issuer: 'Google Cloud' },
    { title: 'IoT Smart Flooring System', issuer: 'IJRPR Research Publication' },
  ];

  return (
    <section className="certs">
      <div className="container">
        <SectionTitle title="Certifications" subtitle="Continuous learning" />
        <div className="certs-grid">
          {certs.map((cert, idx) => (
            <div className="cert-card" key={idx}>
              <div className="cert-icon">🏆</div>
              <h4>{cert.title}</h4>
              <p>{cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => (
  <section className="education">
    <div className="container">
      <SectionTitle title="Education" subtitle="Academic foundation" />
      <div className="edu-card">
        <div className="edu-icon">🎓</div>
        <h3>B.E. in Computer Science Engineering</h3>
        <p className="edu-school">ATME College of Engineering, Mysore</p>
        <p className="edu-year">2022 – 2026</p>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="contact">
    <div className="container">
      <div className="contact-card">
        <h2>Let's Work Together</h2>
        <p>Open for backend engineering roles, API development, and AI integration projects.</p>
        <div className="contact-links">
          <a href="mailto:jeevancharanmu@gmail.com" className="btn btn-primary">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            Email Me
          </a>
          <a href="https://linkedin.com/in/charan-m-u" target="_blank" rel="noreferrer" className="btn btn-secondary">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <p>© {new Date().getFullYear()} Charan M U. Built with React & attention to detail.</p>
  </footer>
);

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.timeline-item, .project-card, .skill-card, .cert-card').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

const App = () => {
  useScrollReveal();

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <Education />
      <Contact />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default App;
