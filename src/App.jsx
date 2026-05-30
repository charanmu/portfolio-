import React, { useState, useEffect, useRef } from 'react';
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCode, setShowCode] = useState(false);

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

  const codeSnippet = `// Custom Spring Boot JWT Authentication Filter developed at LTTS
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        String jwt = authHeader.substring(7);
        String username = jwtService.extractUsername(jwt);
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}`;

  return (
    <section id="experience" className="experience">
      <div className="container">
        <SectionTitle title="Experience" subtitle="Where I've worked and what I've built" />
        <div className="timeline">
          {experiences.map((exp, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-marker"></div>
              <div className="timeline-card clickable" onClick={() => setIsExpanded(!isExpanded)}>
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
                <div className="timeline-expand-prompt">
                  {isExpanded ? "Click to collapse Case Study ▲" : "Click to expand detailed LTTS Case Study ▼"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expandable Deep Dive Case Study */}
        {isExpanded && (
          <div className="case-study-container visible" onClick={(e) => e.stopPropagation()}>
            <h4 className="case-study-title">L&T Technology Services Internship Deep-Dive</h4>
            
            <div className="case-study-grid">
              <div className="case-study-col">
                <h5>🔐 REST APIs & Spring Security</h5>
                <p>Designed stateful authorization workflows using Spring Security and stateless JWT controls. Tokens are verified via customized Request Filter interceptors, mapping roles to secure Spring contexts for robust authorization boundaries.</p>
              </div>
              <div className="case-study-col">
                <h5>⚡ JPA Database Optimization</h5>
                <p>Reduced MySQL indexing lookup overhead by 30-40%. Designed compound index layouts on user entity foreign keys and refactored JPA repositories to use index-triggered custom `@Query` annotations with database pagination bounds.</p>
              </div>
              <div className="case-study-col">
                <h5>🤖 AI-Driven Error Classification</h5>
                <p>Engineered automated pipeline routing in Spring Boot to capture runtime exceptions and push them into OpenAI/Anthropic APIs. The models parse StackTraces to return structured JSON classifications detailing solutions and severity levels.</p>
              </div>
            </div>

            <div className="case-study-actions">
              <button className="btn-show-code" onClick={(e) => { e.stopPropagation(); setShowCode(!showCode); }}>
                {showCode ? "Hide Spring Boot Source Snippet" : "View Spring Boot Source Snippet"}
              </button>
            </div>

            {showCode && (
              <div className="case-study-code-wrapper" onClick={(e) => e.stopPropagation()}>
                <pre className="case-study-code">
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

const ArchitectureModal = ({ project, onClose }) => {
  if (!project) return null;

  const [activeTraceNode, setActiveTraceNode] = useState(null);
  const [traceLogs, setTraceLogs] = useState([]);
  const [isTracing, setIsTracing] = useState(false);

  const traceData = {
    "QuizAI — Kahoot-Style AI Quiz": [
      "👤 [Client] WebSocket handshake initialized. Client session mapped on thread WS-98.",
      "☕ [Spring Boot] JWT decrypted at Security Filter Chain. Access approved for recruiter-guest.",
      "🗄️ [MySQL / H2] JPA Entity lookup executed. Connections loaded from HikariPool (Latency: 0.8ms).",
      "🤖 [LLM API] Dynamic quiz payload query dispatched. Schema generated by Claude-3-Sonnet model."
    ],
    "AI Workflow Automation": [
      "📲 [Twilio] Incoming Twilio WhatsApp Business webhook POST payload captured.",
      "⚙️ [n8n Node] Invoking visual pipeline workflow nodes, parsing webhook variables.",
      "🧠 [Claude API] Executing intent classifier model analysis. Core confidence rating: 98%.",
      "✉️ [Twilio Client] Response push packet delivered to Twilio gateway callback address."
    ],
    "IoT Smart Flooring System": [
      "🔌 [Sensors] Microcontroller registers pressure coordinate differential at node 14.",
      "📡 [GSM Gateway] Cellular transceiver packetizes mesh data coordinates and pushes payload.",
      "⚙️ [Anti-Theft Hub] Server servlet thread parses coordinates, launching safety alerts.",
      "🔔 [GSM Alert] SMS notification sent to owner, triggering camera feed (Latency: 2.1s)."
    ]
  };

  const startTrace = () => {
    setIsTracing(true);
    setActiveTraceNode(0);
    setTraceLogs([traceData[project][0]]);
    
    let currentStep = 1;
    const interval = setInterval(() => {
      if (currentStep < 4) {
        setActiveTraceNode(currentStep);
        setTraceLogs((prev) => [...prev, traceData[project][currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsTracing(false);
      }
    }, 1100);
  };

  const diagrams = {
    "QuizAI — Kahoot-Style AI Quiz": (
      <div className="arch-flow">
        <div className={`arch-node client ${activeTraceNode === 0 ? 'glowing' : ''}`}>
          <div className="node-icon">👤</div>
          <h4>Client Console</h4>
          <p>WebSocket Sessions</p>
        </div>
        <div className="arch-arrow">➜</div>
        <div className={`arch-node backend ${activeTraceNode === 1 ? 'glowing' : ''}`}>
          <div className="node-icon">☕</div>
          <h4>Java Server</h4>
          <p>Spring Boot Core</p>
        </div>
        <div className="arch-arrow">➜</div>
        <div className={`arch-node db ${activeTraceNode === 2 ? 'glowing' : ''}`}>
          <div className="node-icon">🗄️</div>
          <h4>MySQL / H2</h4>
          <p>JPA Score Caches</p>
        </div>
        <div className="arch-arrow branch-arrow">➜</div>
        <div className={`arch-node ai-node ${activeTraceNode === 3 ? 'glowing' : ''}`}>
          <div className="node-icon">🤖</div>
          <h4>Claude / OpenAI</h4>
          <p>LLM JSON Engine</p>
        </div>
      </div>
    ),
    "AI Workflow Automation": (
      <div className="arch-flow">
        <div className={`arch-node webhook ${activeTraceNode === 0 ? 'glowing' : ''}`}>
          <div className="node-icon">📲</div>
          <h4>WhatsApp API</h4>
          <p>Twilio Endpoint</p>
        </div>
        <div className="arch-arrow">➜</div>
        <div className={`arch-node n8n ${activeTraceNode === 1 ? 'glowing' : ''}`}>
          <div className="node-icon">⚙️</div>
          <h4>n8n Pipelines</h4>
          <p>Webhook Router</p>
        </div>
        <div className="arch-arrow">➜</div>
        <div className={`arch-node claude ${activeTraceNode === 2 ? 'glowing' : ''}`}>
          <div className="node-icon">🧠</div>
          <h4>Claude API</h4>
          <p>Intent Classifier</p>
        </div>
        <div className="arch-arrow branch-arrow">➜</div>
        <div className={`arch-node response ${activeTraceNode === 3 ? 'glowing' : ''}`}>
          <div className="node-icon">✉️</div>
          <h4>Automated Reply</h4>
          <p>WhatsApp Push</p>
        </div>
      </div>
    ),
    "IoT Smart Flooring System": (
      <div className="arch-flow">
        <div className={`arch-node sensors ${activeTraceNode === 0 ? 'glowing' : ''}`}>
          <div className="node-icon">🔌</div>
          <h4>Sensors Grid</h4>
          <p>20-30 HW Nodes</p>
        </div>
        <div className="arch-arrow">➜</div>
        <div className={`arch-node gsm ${activeTraceNode === 1 ? 'glowing' : ''}`}>
          <div className="node-icon">📡</div>
          <h4>GSM Gateway</h4>
          <p>Microcontroller Mesh</p>
        </div>
        <div className="arch-arrow">➜</div>
        <div className={`arch-node server ${activeTraceNode === 2 ? 'glowing' : ''}`}>
          <div className="node-icon">⚙️</div>
          <h4>Anti-Theft Hub</h4>
          <p>Real-Time Parser</p>
        </div>
        <div className="arch-arrow branch-arrow">➜</div>
        <div className={`arch-node alert ${activeTraceNode === 3 ? 'glowing' : ''}`}>
          <div className="node-icon">🔔</div>
          <h4>GSM Alerts</h4>
          <p>SMS & Camera Feed</p>
        </div>
      </div>
    )
  };

  const descriptions = {
    "QuizAI — Kahoot-Style AI Quiz": "Multiplayer quiz system engineered with a Spring Boot core. Client browser consoles establish real-time WebSocket session rooms. Under peak session routing, Spring controllers query OpenAI/Claude payload schemas to construct well-structured JSON quizzes on-the-fly, while H2/MySQL caches user credentials, scores, and active room configurations.",
    "AI Workflow Automation": "Visual integration service designed around n8n pipelines and webhook receptors. Raw WhatsApp JSON message objects are routed into Llama/Claude model nodes to classify intentions, automate CRM entry, and trigger customized callback payloads, optimizing processing speeds by 60%.",
    "IoT Smart Flooring System": "A custom embedded-systems blueprint published in the IJRPR Journal. 20-30 hardware sensor nodes register spatial coordinate offsets and push pressure differentials to an Arduino/Raspberry Pi GSM hub. Real-time system threads parse raw streams to dispatch camera captures and alert warnings in 2-3 seconds."
  };

  return (
    <div className="arch-modal-overlay" onClick={onClose}>
      <div className="arch-modal-card" onClick={e => e.stopPropagation()}>
        <div className="arch-modal-header">
          <h3>{project} Architecture Studio</h3>
          <button className="arch-close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="arch-modal-body">
          
          {/* Request Flow Trace Callout */}
          <div className="arch-trace-controls font-monospace">
            <button 
              className={`btn-trace-flow ${isTracing ? 'active' : ''}`}
              onClick={startTrace}
              disabled={isTracing}
            >
              {isTracing ? "⚡ Tracing API Context..." : "🚀 Trace Request Flow"}
            </button>
            <span className="trace-hint">Click to launch simulated network tracing packets</span>
          </div>

          <div className="arch-diagram-container">
            {diagrams[project]}
          </div>

          {/* Tracer Logs Console area */}
          {(isTracing || traceLogs.length > 0) && (
            <div className="arch-tracer-console font-monospace animated-fade-up">
              <div className="console-header-bar">
                <span>API Request Trace Telemetry</span>
              </div>
              <div className="console-logs">
                {traceLogs.map((log, idx) => (
                  <p key={idx} className="trace-log-line font-monospace">{log}</p>
                ))}
                {isTracing && <span className="terminal-cursor">_</span>}
              </div>
            </div>
          )}

          <div className="arch-description">
            <h4>System Design Highlights</h4>
            <p>{descriptions[project]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoSimulationModal = ({ project, onClose }) => {
  if (!project) return null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [telemetry, setTelemetry] = useState([]);
  const [showTelemetry, setShowTelemetry] = useState(true);

  const videoPreviews = {
    "QuizAI — Kahoot-Style AI Quiz": "/images/quiz_portal_video_preview.png",
    "AI Workflow Automation": "/images/ai_workflow_video_preview.png",
    "IoT Smart Flooring System": "/images/smart_flooring_video_preview.png"
  };

  const logs = {
    "QuizAI — Kahoot-Style AI Quiz": [
      "⚡ Establishing connection to core JVM controller...",
      "✔ WebSocket server handshake initiated successfully on port 8080",
      "👤 New client session registration request received from WS-98",
      "🔑 Validating JWT authentication claims header...",
      "🔒 Session approved. Authorized client role: RECRUITER",
      "🎮 Room 'lobby-thread-45' initialized. Waiting for participants (1/10)...",
      "🤖 Dispatching query to OpenAI API for dynamic Java multithreading quiz payload...",
      "📦 Received 3-question quiz schema from Claude-3-Sonnet model",
      "✅ Quiz state synchronized across active rooms. Starting timer..."
    ],
    "AI Workflow Automation": [
      "📡 n8n Node: Listening for incoming webhook telemetry payload...",
      "📥 Webhook POST request registered from Twilio API client Gateway",
      "🔍 Parsing incoming JSON body: { sender: '+917019301031', text: 'Check portfolio' }",
      "🧠 Dispatching message prompt to Llama-3-70B model logic node...",
      "🤖 Classification: INQUIRY_PORTFOLIO (Confidence level: 98.4%)",
      "🔄 Automating active CRM hub synchronization record entry...",
      "📤 Building automated webhook callback response text...",
      "✉ Sending Twilio SMS response payload packet...",
      "✔ Response dispatched successfully to +917019301031. Log code: 200 OK"
    ],
    "IoT Smart Flooring System": [
      "🔋 Activating 24-channel analog spatial hardware sensor grids...",
      "📶 Microcontroller mesh calibrated. Initializing GSM wireless gateway...",
      "🔬 Spatial background pressure baseline offset calculated: 0.00kg/cm²",
      "⚙ Continuous polling active. System thread frequency: 60Hz...",
      "🚨 Telemetry alert! Pressure differential offset detected in Zone 4 (Coordinate [12, 8])",
      "📸 Triggering active camera capture thread via GPIO PIN 18...",
      "📱 Compiling GSM emergency alert SMS message payload packet...",
      "✉ Dispatched SMS: 'INTRUSION DETECTED ZONE 4. PHOTO SAVED TO CORE STORAGE'",
      "✔ Complete alarm event sequence terminated in 2.38 seconds."
    ]
  };

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          const next = prev + 2;
          
          // Add telemetry log based on progress milestones
          const currentLogs = logs[project];
          const logIdx = Math.floor((next / 100) * currentLogs.length);
          if (logIdx < currentLogs.length) {
            setTelemetry((prevLogs) => {
              const matchedLog = currentLogs[logIdx];
              if (!prevLogs.includes(matchedLog)) {
                return [...prevLogs, matchedLog];
              }
              return prevLogs;
            });
          }
          
          return next;
        });
      }, 150);
    }
    return () => clearInterval(timer);
  }, [isPlaying, project]);

  const handlePlayToggle = () => {
    if (progress >= 100) {
      setProgress(0);
      setTelemetry([]);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="video-modal-header">
          <h3>
            <span className="live-rec-dot"></span> Simulated Project Demo: {project}
          </h3>
          <button className="video-close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="video-modal-body">
          <div className="video-player-container">
            {/* The actual image visualization */}
            <div className="video-screen-wrapper">
              <img 
                src={videoPreviews[project]} 
                alt={`${project} preview`} 
                className={`video-canvas-image ${isPlaying ? 'playing' : ''}`} 
              />
              
              {/* Retro static canvas overlay */}
              <div className="video-crt-lines"></div>
              
              {/* Play overlays */}
              {!isPlaying && progress < 100 && (
                <div className="video-center-play" onClick={handlePlayToggle}>
                  <div className="play-triangle"></div>
                </div>
              )}

              {progress >= 100 && (
                <div className="video-center-play replay" onClick={handlePlayToggle}>
                  <span className="replay-icon">🔄</span>
                  <span className="replay-text">Replay Demo</span>
                </div>
              )}

              {/* Glowing operational terminal overlay */}
              {showTelemetry && telemetry.length > 0 && (
                <div className="video-telemetry-console">
                  <div className="console-hud-header">
                    <span>LIVE BACKEND TELEMETRY FEED</span>
                    <span className="hud-uptime">UPTIME: {(progress * 0.1).toFixed(1)}s</span>
                  </div>
                  <div className="console-log-lines">
                    {telemetry.map((log, idx) => (
                      <div key={idx} className="console-log-line">
                        <span className="log-arrow">➜</span> {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status bar details inside the video */}
              <div className="video-feed-hud">
                <span className="hud-res font-monospace">1080p // Core-RTX</span>
                <span className="hud-rec font-monospace">{isPlaying ? "● LIVE FEED" : "|| PAUSED"}</span>
              </div>
            </div>

            {/* Custom media player controls bar */}
            <div className="video-controls-bar">
              <button className="video-play-btn" onClick={handlePlayToggle}>
                {isPlaying ? "⏸ Pause" : progress >= 100 ? "🔄 Replay" : "▶ Play"}
              </button>

              <div className="video-slider-container">
                <div className="video-track-bar">
                  <div className="video-fill-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="video-timestamp font-monospace">{progress}%</span>
              </div>

              <button 
                className={`video-hud-toggle ${showTelemetry ? 'active' : ''}`} 
                onClick={() => setShowTelemetry(!showTelemetry)}
              >
                📟 Telemetry {showTelemetry ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          <div className="video-project-notes">
            <h4>💡 Simulation Information</h4>
            <p>
              This console provides a **high-fidelity hardware/software execution playback** of the {project} runtime engine. 
              Toggle **Telemetry** on the control bar to view the actual REST API webhooks, JSON parsers, and system threads in real-time execution!
            </p>
            {project === "IoT Smart Flooring System" && (
              <a 
                href="/certificates/ijrpr_research_publication.pdf" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-read-publication"
              >
                📄 Read Peer-Reviewed IJRPR Publication
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [selectedProj, setSelectedProj] = useState(null);
  const [selectedVideoProj, setSelectedVideoProj] = useState(null);

  const projects = [
    {
      title: 'QuizAI — Kahoot-Style AI Quiz',
      year: '2025',
      desc: 'Built 20+ REST APIs on a custom Java HTTP server. Features AI-driven quiz generation (OpenAI/Claude), multiplayer rooms for 10 concurrent users, OTP auth, and role-based access control.',
      tags: ['Java', 'REST APIs', 'OpenAI', 'Claude', 'WebSocket', 'JWT'],
      image: '/images/quiz_portal.png',
      status: '● ACTIVE',
      metrics: ['Latency: <80ms', 'Lobbies: 10+ Conc.', 'Auth: JWT / OTP'],
      github: 'https://github.com/charanmu',
      demo: 'https://ai-quizapp.vercel.app/'
    },
    {
      title: 'AI Workflow Automation',
      year: '2025',
      desc: 'Designed 8 n8n automation pipelines integrating WhatsApp Business API & REST webhooks. Supports 500–1000 concurrent users, reducing manual effort by 60–70%.',
      tags: ['n8n', 'WhatsApp API', 'Webhooks', 'AI Integration', 'Monitoring'],
      image: '/images/ai_workflow.png',
      status: '● LIVE',
      metrics: ['Automation: 70%', 'Scale: 500-1000/day', 'Type: n8n Pipelines'],
      github: 'https://github.com/charanmu',
      demo: 'https://github.com/charanmu'
    },
    {
      title: 'IoT Smart Flooring System',
      year: '2025',
      desc: 'Intrusion detection using 20–30 sensor nodes with real-time GSM/camera alerts (2–3s response). Published peer-reviewed paper in IJRPR.',
      tags: ['IoT', 'GSM', 'Sensors', 'Real-time', 'Research'],
      image: '/images/smart_flooring.png',
      status: '● PUBLISHED',
      metrics: ['Response: 2-3s', 'Nodes: 20-30 HW', 'Status: Peer-Reviewed'],
      github: 'https://github.com/charanmu',
      paperLink: '/certificates/ijrpr_research_publication.pdf'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <SectionTitle title="Featured Projects" subtitle="Real-world builds with measurable impact" />
        <div className="projects-grid">
          {projects.map((proj, idx) => (
            <div className="project-card" key={idx}>
              <div className="project-image-wrapper">
                <img src={proj.image} alt={proj.title} className="project-image" />
                <span className={`project-status-badge ${proj.status.toLowerCase().replace('● ', '').trim()}`}>
                  {proj.status}
                </span>
                <div className="project-image-overlay">
                  <span className="overlay-tech-text">SECURE INTERNET CAPABLE // CORE V2</span>
                </div>
              </div>
              
              <div className="project-card-content">
                <div className="project-header">
                  <h3>{proj.title}</h3>
                  <span className="year">{proj.year}</span>
                </div>
                <p className="project-desc-text">{proj.desc}</p>
                
                {/* Visual HUD Metrics Panel */}
                <div className="project-metrics">
                  {proj.metrics.map((metric, i) => (
                    <span className="metric-badge" key={i}>
                      <span className="metric-icon">⚡</span> {metric}
                    </span>
                  ))}
                </div>

                <div className="tags">
                  {proj.tags.map((tag, i) => (
                    <span className="tag" key={i}>{tag}</span>
                  ))}
                </div>
                
                {/* Button Tray */}
                <div className="project-btn-group">
                  <a href={proj.github} target="_blank" rel="noreferrer" className="btn-proj-action github-btn">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style={{marginRight: "6px", display: "inline-block", verticalAlign: "middle"}}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                    GitHub
                  </a>
                  <button className="btn-proj-action demo-btn" onClick={() => setSelectedVideoProj(proj.title)}>
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style={{marginRight: "6px", display: "inline-block", verticalAlign: "middle"}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                    Watch Demo
                  </button>
                  <button className="btn-proj-action arch-btn" onClick={() => setSelectedProj(proj.title)}>
                    Architecture
                    <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24" style={{marginLeft: "4px", display: "inline-block", verticalAlign: "middle"}}><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProj && (
        <ArchitectureModal project={selectedProj} onClose={() => setSelectedProj(null)} />
      )}
      {selectedVideoProj && (
        <VideoSimulationModal project={selectedVideoProj} onClose={() => setSelectedVideoProj(null)} />
      )}
    </section>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      title: 'Languages',
      icon: '💻',
      skills: [
        { name: 'Java', value: 90, detail: 'Enterprise core backend developer, streams API, concurrency' },
        { name: 'Python', value: 85, detail: 'Used for ML modeling, data analytics scripts, automation' },
        { name: 'C', value: 70, detail: 'Academic microcontrollers and memory management' }
      ]
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Spring Boot', value: 90, detail: 'Engineered robust REST microservices, JPA pagination, Hibernate' },
        { name: 'REST APIs', value: 95, detail: 'Designed 20+ secure endpoints, structured request schemas' },
        { name: 'Spring Security', value: 85, detail: 'Configured security filters, authentication filters' },
        { name: 'JWT Auth', value: 90, detail: 'Stateless session controls, token headers, claims validation' }
      ]
    },
    {
      title: 'Databases',
      icon: '🗄️',
      skills: [
        { name: 'MySQL', value: 85, detail: 'Optimized index tables, database transaction queries at LTTS' },
        { name: 'PostgreSQL', value: 80, detail: 'Designed relational tables and secure backend schemas' }
      ]
    },
    {
      title: 'AI & Automation',
      icon: '🤖',
      skills: [
        { name: 'OpenAI/Claude', value: 88, detail: 'Integrated LLMs for smart prompt classification' },
        { name: 'n8n', value: 90, detail: 'Engineered automated WhatsApp CRM workflow pipelines' },
        { name: 'Git', value: 85, detail: 'Repository merging, branching strategies, collaborative PRs' },
        { name: 'JUnit', value: 80, detail: 'Asserted test coverage for backend controller endpoints' }
      ]
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <SectionTitle title="Technical Skills" subtitle="My everyday toolkit & proficiency metrics" />
        
        {/* Skills Filter Tabs */}
        <div className="skills-tabs">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`skills-tab-btn ${activeCategory === idx ? 'active' : ''}`}
              onClick={() => setActiveCategory(idx)}
            >
              <span className="skills-tab-icon">{cat.icon}</span>
              <span className="skills-tab-label">{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Skills Dashboard */}
        <div className="skills-dashboard">
          <div className="skills-dashboard-grid">
            {categories[activeCategory].skills.map((skill, i) => {
              const radius = 35;
              const stroke = 5;
              const normalizedRadius = radius - stroke * 2;
              const circumference = normalizedRadius * 2 * Math.PI;
              const strokeDashoffset = circumference - (skill.value / 100) * circumference;

              return (
                <div className="skill-dashboard-card visible" key={i}>
                  <div className="skill-circle-container">
                    <svg height={radius * 2} width={radius * 2} className="skill-circle-svg">
                      <circle
                        stroke="rgba(255, 255, 255, 0.05)"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                      />
                      <circle
                        stroke="url(#skillsGradient)"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset }}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                      />
                      {/* SVG Gradient declaration for circles */}
                      <defs>
                        <linearGradient id="skillsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--primary)" />
                          <stop offset="100%" stopColor="var(--accent)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="skill-percentage">{skill.value}%</div>
                  </div>
                  <div className="skill-info">
                    <h3>{skill.name}</h3>
                    <p>{skill.detail}</p>
                  </div>
                  <div className="skill-card-glow"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const ApiPlayground = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('otp');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [activeTab, setActiveTab] = useState('payload'); // 'payload' or 'code'
  const [selectedLang, setSelectedLang] = useState('js'); // 'js', 'python', 'java', 'curl'

  const endpoints = {
    otp: {
      method: 'POST',
      url: '/api/v1/auth/otp/send',
      desc: 'Simulate sending a secure verification OTP via Spring Boot Security',
      payload: { email: 'recruiter@company.com', purpose: 'portfolio_verification' },
      response: {
        status: "SUCCESS",
        message: "OTP sent successfully to recruiter@company.com via SMS/Email gateway",
        data: {
          requestId: "req-98f2k4l0a71",
          expiresInSeconds: 120,
          provider: "Spring Boot SMTP Gateway & Twilio Node"
        }
      }
    },
    quiz: {
      method: 'POST',
      url: '/api/v1/quiz/generate',
      desc: 'Simulate Spring Boot calling OpenAI API for dynamic Java Quiz creation',
      payload: { topic: 'Java Multithreading', count: 2, difficulty: 'HARD' },
      response: {
        status: "SUCCESS",
        message: "Dynamic quiz created by Spring Boot using Claude API payload",
        quizRoom: "room-thread-2026",
        questions: [
          { id: 1, text: "Explain volatile keyword in Java memory model.", options: ["Locks thread", "Guarantees visibility", "Atomicity", "Disables memory"] },
          { id: 2, text: "What is thread starvation?", options: ["No processor time", "Infinite lock", "Deadlock", "CPU heating"] }
        ]
      }
    },
    webhook: {
      method: 'POST',
      url: '/api/v1/automation/n8n/webhook',
      desc: 'Simulate WhatsApp Business API webhook triggering n8n workflow',
      payload: { sender: '+917019301031', message: 'Hello AI assistant, check portfolio' },
      response: {
        status: "TRIGGERED",
        pipelineId: "n8n-flow-7f893kld",
        nodesExecuted: 4,
        result: {
          classification: "Portfolio Question",
          replyText: "Hi! I am Charan's WhatsApp assistant. Thanks for reaching out!",
          deliveryStatus: "DELIVERED"
        }
      }
    }
  };

  const clientCodes = {
    otp: {
      java: `// Java OkHttp Client Integration
OkHttpClient client = new OkHttpClient().newBuilder().build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\\n  \\"email\\": \\"recruiter@company.com\\",\\n  \\"purpose\\": \\"portfolio_verification\\"\\n}");
Request request = new Request.Builder()
  .url("http://localhost:8080/api/v1/auth/otp/send")
  .method("POST", body)
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();`,
      python: `# Python requests Integration
import requests
import json

url = "http://localhost:8080/api/v1/auth/otp/send"
payload = {
    "email": "recruiter@company.com",
    "purpose": "portfolio_verification"
}
headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers, data=json.dumps(payload))
print(response.json())`,
      js: `// JavaScript Fetch standard integration
const payload = {
  email: 'recruiter@company.com',
  purpose: 'portfolio_verification'
};

fetch('http://localhost:8080/api/v1/auth/otp/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
})
.then(res => res.json())
.then(data => console.log(data));`,
      curl: `# cURL execution packet
curl -X POST http://localhost:8080/api/v1/auth/otp/send \\
  -H "Content-Type: application/json" \\
  -d '{"email": "recruiter@company.com", "purpose": "portfolio_verification"}'`
    },
    quiz: {
      java: `// Java OkHttp Client Integration
OkHttpClient client = new OkHttpClient().newBuilder().build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\\n  \\"topic\\": \\"Java Multithreading\\",\\n  \\"count\\": 2,\\n  \\"difficulty\\": \\"HARD\\"\\n}");
Request request = new Request.Builder()
  .url("http://localhost:8080/api/v1/quiz/generate")
  .method("POST", body)
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();`,
      python: `# Python requests Integration
import requests
import json

url = "http://localhost:8080/api/v1/quiz/generate"
payload = {
    "topic": "Java Multithreading",
    "count": 2,
    "difficulty": "HARD"
}
headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers, data=json.dumps(payload))
print(response.json())`,
      js: `// JavaScript Fetch standard integration
const payload = {
  topic: 'Java Multithreading',
  count: 2,
  difficulty: 'HARD'
};

fetch('http://localhost:8080/api/v1/quiz/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
})
.then(res => res.json())
.then(data => console.log(data));`,
      curl: `# cURL execution packet
curl -X POST http://localhost:8080/api/v1/quiz/generate \\
  -H "Content-Type: application/json" \\
  -d '{"topic": "Java Multithreading", "count": 2, "difficulty": "HARD"}'`
    },
    webhook: {
      java: `// Java OkHttp Client Integration
OkHttpClient client = new OkHttpClient().newBuilder().build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\\n  \\"sender\\": \\"+917019301031\\",\\n  \\"message\\": \\"Hello AI assistant, check portfolio\\"\\n}");
Request request = new Request.Builder()
  .url("http://localhost:8080/api/v1/automation/n8n/webhook")
  .method("POST", body)
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();`,
      python: `# Python requests Integration
import requests
import json

url = "http://localhost:8080/api/v1/automation/n8n/webhook"
payload = {
    "sender": "+917019301031",
    "message": "Hello AI assistant, check portfolio"
}
headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers, data=json.dumps(payload))
print(response.json())`,
      js: `// JavaScript Fetch standard integration
const payload = {
  sender: '+917019301031',
  message: 'Hello AI assistant, check portfolio'
};

fetch('http://localhost:8080/api/v1/automation/n8n/webhook', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
})
.then(res => res.json())
.then(data => console.log(data));`,
      curl: `# cURL execution packet
curl -X POST http://localhost:8080/api/v1/automation/n8n/webhook \\
  -H "Content-Type: application/json" \\
  -d '{"sender": "+917019301031", "message": "Hello AI assistant, check portfolio"}'`
    }
  };

  const handleSend = () => {
    setIsLoading(true);
    setResponse(null);
    setTimeout(() => {
      setResponse(endpoints[selectedEndpoint].response);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <section className="api-playground-section">
      <div className="container">
        <SectionTitle title="Interactive REST API Playground" subtitle="Test Charan's simulated backend APIs in real-time" />
        <div className="playground-card visible">
          <div className="playground-sidebar">
            <h3>Endpoints</h3>
            <div className="endpoint-list">
              {Object.keys(endpoints).map(key => (
                <button
                  key={key}
                  className={`endpoint-item ${selectedEndpoint === key ? 'active' : ''}`}
                  onClick={() => { setSelectedEndpoint(key); setResponse(null); }}
                >
                  <span className={`method-badge ${endpoints[key].method.toLowerCase()}`}>{endpoints[key].method}</span>
                  <span className="url-text">{endpoints[key].url}</span>
                </button>
              ))}
            </div>
            <p className="sidebar-desc">{endpoints[selectedEndpoint].desc}</p>
          </div>
          
          <div className="playground-main">
            <div className="playground-header-bar">
              <div className="mock-window-dots">
                <span></span><span></span><span></span>
              </div>
              <span className="window-title">Spring Boot Console Client</span>
            </div>
            
            <div className="console-area">
              <div className="playground-tab-selectors">
                <button 
                  className={`playground-tab ${activeTab === 'payload' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('payload')}
                >
                  Request Body (JSON)
                </button>
                <button 
                  className={`playground-tab ${activeTab === 'code' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('code')}
                >
                  Client Code Generator ⚡
                </button>
              </div>

              {activeTab === 'payload' ? (
                <div className="console-block">
                  <pre className="request-payload font-monospace">
                    {JSON.stringify(endpoints[selectedEndpoint].payload, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="console-block code-gen-block">
                  <div className="lang-selectors">
                    {['js', 'python', 'java', 'curl'].map(lang => (
                      <button 
                        key={lang} 
                        className={`lang-tab-btn ${selectedLang === lang ? 'active' : ''}`}
                        onClick={() => setSelectedLang(lang)}
                      >
                        {lang === 'js' ? 'JavaScript' : lang === 'python' ? 'Python' : lang === 'java' ? 'Java' : 'cURL'}
                      </button>
                    ))}
                  </div>
                  <pre className="request-payload font-monospace client-code-pre">
                    <code>{clientCodes[selectedEndpoint][selectedLang]}</code>
                  </pre>
                </div>
              )}
              
              <button className="btn-send-api" onClick={handleSend} disabled={isLoading}>
                {isLoading ? (
                  <span className="loading-dots">Sending Request<span>.</span><span>.</span><span>.</span></span>
                ) : (
                  <>Send Request ⚡</>
                )}
              </button>
              
              <div className="console-block response-block">
                <span className="console-label">Console Output (JSON Response)</span>
                <pre className={`response-output ${isLoading ? 'loading' : ''} ${response ? 'active' : ''}`}>
                  {isLoading && `HTTP/1.1 100 Continue...\nConnecting to server...\nExecuting Spring/JPA Controllers...`}
                  {response && `HTTP/1.1 200 OK\nContent-Type: application/json\n\n` + JSON.stringify(response, null, 2)}
                  {!isLoading && !response && `Click "Send Request" to test this endpoint...`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const JwtSandbox = () => {
  const [username, setUsername] = useState('recruiter-guest');
  const [role, setRole] = useState('ROLE_ADMIN');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tokenDecomp, setTokenDecomp] = useState(null);
  const [firewallTesting, setFirewallTesting] = useState(false);
  const [authStatus, setAuthStatus] = useState(null);

  const generateJwt = () => {
    setIsGenerating(true);
    setTokenDecomp(null);
    setAuthStatus(null);
    setTimeout(() => {
      const headerObj = { alg: "HS256", typ: "JWT" };
      const payloadObj = {
        sub: username,
        role: role,
        iss: "spring-security-jwt-auth",
        exp: Math.floor(Date.now() / 1000) + 3600,
        authorities: [role]
      };

      const b64Header = btoa(JSON.stringify(headerObj)).replace(/=/g, '');
      const b64Payload = btoa(JSON.stringify(payloadObj)).replace(/=/g, '');
      const signatureText = `HMACSHA256(${b64Header}.${b64Payload}, secure_charan_backend_jwt_secret_key_2026)`;
      const b64Signature = btoa(signatureText).replace(/=/g, '').substring(0, 43);

      setTokenDecomp({
        header: JSON.stringify(headerObj, null, 2),
        payload: JSON.stringify(payloadObj, null, 2),
        signature: signatureText,
        b64Header,
        b64Payload,
        b64Signature,
        raw: `${b64Header}.${b64Payload}.${b64Signature}`
      });
      setIsGenerating(false);
    }, 800);
  };

  const testFirewall = () => {
    if (!tokenDecomp) return;
    setFirewallTesting(true);
    setAuthStatus('checking');
    setTimeout(() => {
      if (role === 'ROLE_ADMIN') {
        setAuthStatus('success');
      } else {
        setAuthStatus('fail');
      }
      setFirewallTesting(false);
    }, 1500);
  };

  return (
    <section id="jwt-sandbox" className="jwt-sandbox-section">
      <div className="container">
        <SectionTitle title="Spring Boot Security JWT Sandbox" subtitle="Deconstruct token cryptography and simulate REST API firewall handshakes" />
        <div className="jwt-sandbox-card visible">
          
          <div className="jwt-input-panel">
            <h3>🔑 Security Token Builder</h3>
            <p className="panel-sub">Input recruiter variables to sign a cryptographic token through a mock Spring Security provider.</p>
            
            <div className="jwt-field">
              <label>Subject (Username)</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
                placeholder="recruiter-guest"
              />
            </div>
            
            <div className="jwt-field">
              <label>Granted Authority (Security Role)</label>
              <div className="jwt-role-toggles">
                <button 
                  className={`jwt-role-btn admin ${role === 'ROLE_ADMIN' ? 'active' : ''}`}
                  onClick={() => { setRole('ROLE_ADMIN'); setAuthStatus(null); }}
                >
                  🛡️ ROLE_ADMIN
                </button>
                <button 
                  className={`jwt-role-btn user ${role === 'ROLE_USER' ? 'active' : ''}`}
                  onClick={() => { setRole('ROLE_USER'); setAuthStatus(null); }}
                >
                  👤 ROLE_USER
                </button>
              </div>
            </div>

            <button className="btn-sign-jwt" onClick={generateJwt} disabled={isGenerating}>
              {isGenerating ? "Signing Token Cryptography..." : "⚡ Generate Signed JWT"}
            </button>
          </div>

          <div className="jwt-display-panel">
            <div className="jwt-panel-header">
              <div className="mock-window-dots"><span></span><span></span><span></span></div>
              <span>HMAC-SHA256 Token Decomposition</span>
            </div>

            {tokenDecomp ? (
              <div className="jwt-split-layout">
                <div className="jwt-token-string-box">
                  <span className="part-header">JWT Token String:</span>
                  <p className="jwt-token-string">
                    <span className="t-red">{tokenDecomp.b64Header}</span>.
                    <span className="t-blue">{tokenDecomp.b64Payload}</span>.
                    <span className="t-green">{tokenDecomp.b64Signature}</span>
                  </p>
                </div>

                <div className="jwt-blocks-grid">
                  <div className="jwt-decomp-block header">
                    <span className="block-label red">Header (Algorithm & Type)</span>
                    <pre className="font-monospace text-red">{tokenDecomp.header}</pre>
                  </div>
                  <div className="jwt-decomp-block payload">
                    <span className="block-label blue">Payload (Claims & Authorities)</span>
                    <pre className="font-monospace text-blue">{tokenDecomp.payload}</pre>
                  </div>
                  <div className="jwt-decomp-block signature">
                    <span className="block-label green">Signature (HMAC-SHA256 Checksum)</span>
                    <p className="sig-text font-monospace text-green">{tokenDecomp.signature}</p>
                  </div>
                </div>

                <div className="jwt-firewall-test-zone">
                  <button className="btn-firewall-test" onClick={testFirewall} disabled={firewallTesting}>
                    {firewallTesting ? "Analyzing filter chains..." : "🚀 Test Spring Security Firewall"}
                  </button>

                  {authStatus === 'checking' && (
                    <div className="firewall-status-card checking font-monospace animated-fade-up">
                      <div className="jwt-spin"></div>
                      <p>📡 Extracting Bearer token header...</p>
                      <p>✔ Verifying HS256 signature against local signing key...</p>
                      <p>⏳ Loading UserDetails and executing SecurityContextFilter...</p>
                    </div>
                  )}

                  {authStatus === 'success' && (
                    <div className="firewall-status-card success font-monospace animated-fade-up">
                      <h4>✅ Access Granted // 200 OK</h4>
                      <p><strong>Principal:</strong> {username}</p>
                      <p><strong>Authorities:</strong> [ROLE_ADMIN]</p>
                      <p className="success-note">Authentication successfully parsed! Spring security filter chains approved Admin privileges.</p>
                    </div>
                  )}

                  {authStatus === 'fail' && (
                    <div className="firewall-status-card fail font-monospace animated-fade-up">
                      <h4>❌ Access Denied // 403 Forbidden</h4>
                      <p><strong>Principal:</strong> {username}</p>
                      <p><strong>Authorities:</strong> [ROLE_USER]</p>
                      <p className="fail-note">Authorization failed! Role ROLE_USER lacks sufficient privileges to access target endpoint.</p>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="jwt-placeholder">
                <span className="jwt-large-icon">🔑</span>
                <p>Click "Generate Signed JWT" to compile a token and trace the authorization pipeline.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

const RetroArcade = () => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('charan_arcade_highscore') || '0', 10);
  });
  const [gameOver, setGameOver] = useState(false);

  const playSound = (freq, type, duration) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.error("Audio synthesis blocked:", e);
    }
  };

  const playEatSound = () => playSound(523.25, 'triangle', 0.15);
  const playCrashSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  };

  const gridSize = 20;
  const tileCount = 20;

  const snakeRef = useRef([{ x: 10, y: 10 }]);
  const foodRef = useRef({ x: 5, y: 5 });
  const dirRef = useRef({ x: 0, y: 0 });

  const handleDirection = (dx, dy) => {
    if (!isPlaying || gameOver) return;
    const currentDir = dirRef.current;
    if (dx !== 0 && currentDir.x !== 0) return;
    if (dy !== 0 && currentDir.y !== 0) return;
    dirRef.current = { x: dx, y: dy };
  };

  const startGame = () => {
    snakeRef.current = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
    foodRef.current = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
    dirRef.current = { x: 0, y: -1 };
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    playSound(440, 'sine', 0.2);
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const updateGame = () => {
      const snake = [...snakeRef.current];
      const dir = dirRef.current;
      
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        setGameOver(true);
        playCrashSound();
        return;
      }

      for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
          setGameOver(true);
          playCrashSound();
          return;
        }
      }

      snake.unshift(head);

      const food = foodRef.current;
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => {
          const nextScore = prev + 10;
          if (nextScore > highScore) {
            setHighScore(nextScore);
            localStorage.setItem('charan_arcade_highscore', nextScore.toString());
          }
          return nextScore;
        });
        playEatSound();
        
        foodRef.current = {
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount)
        };
      } else {
        snake.pop();
      }

      snakeRef.current = snake;

      ctx.fillStyle = '#0f052d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(134, 46, 190, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
      }

      ctx.shadowBlur = 15;
      ctx.shadowColor = '#e21b3c';
      ctx.fillStyle = '#e21b3c';
      ctx.beginPath();
      ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = '#64ffda';
      ctx.fillStyle = '#64ffda';
      
      snake.forEach((seg, index) => {
        if (index === 0) {
          ctx.fillStyle = '#64ffda';
          ctx.shadowBlur = 18;
        } else {
          ctx.fillStyle = '#14b8a6';
          ctx.shadowBlur = 8;
        }
        ctx.fillRect(seg.x * gridSize + 2, seg.y * gridSize + 2, gridSize - 4, gridSize - 4);
      });

      ctx.shadowBlur = 0;
    };

    const gameInterval = setInterval(updateGame, 130);

    const handleKeys = (e) => {
      switch (e.key) {
        case 'ArrowUp': handleDirection(0, -1); e.preventDefault(); break;
        case 'ArrowDown': handleDirection(0, 1); e.preventDefault(); break;
        case 'ArrowLeft': handleDirection(-1, 0); e.preventDefault(); break;
        case 'ArrowRight': handleDirection(1, 0); e.preventDefault(); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeys);

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener('keydown', handleKeys);
    };
  }, [isPlaying, gameOver, highScore]);

  return (
    <section id="arcade" className="arcade-section">
      <div className="container">
        <SectionTitle title="Playground Retro Cyber Arcade" subtitle="Interactive HTML5 canvas vector physics & sound synthesis demo" />
        <div className="arcade-cabinet-wrapper visible">
          <div className="arcade-cabinet-frame">
            <div className="cabinet-header">
              <span className="cabinet-title font-monospace">⚡ NEON_SNAKE_V1.EXE</span>
              <div className="arcade-score-display font-monospace">
                <span>SCORE: {score}</span>
                <span>HI-SCORE: {highScore}</span>
              </div>
            </div>

            <div className="arcade-screen-container">
              <canvas 
                ref={canvasRef} 
                width={400} 
                height={400} 
                className="arcade-canvas"
              />

              {!isPlaying && (
                <div className="arcade-screen-overlay">
                  <span className="arcade-logo">🎮</span>
                  <h3>CHARAN_ARCADE</h3>
                  <p>Playable HTML5 Canvas Vector Physics Demo</p>
                  <button className="btn-arcade-play" onClick={startGame}>INSERT COIN (PLAY)</button>
                  <p className="controls-hint">Use Keyboard Arrow keys or click buttons below</p>
                </div>
              )}

              {isPlaying && gameOver && (
                <div className="arcade-screen-overlay game-over animated-fade-up">
                  <span className="arcade-logo-red">💀</span>
                  <h3 className="game-over-title">GAME OVER</h3>
                  <p>Final Score: {score}</p>
                  <button className="btn-arcade-play" onClick={startGame}>TRY AGAIN</button>
                </div>
              )}
            </div>

            <div className="arcade-controller-dpad">
              <button className="ctrl-btn up" onClick={() => handleDirection(0, -1)}>▲</button>
              <div className="ctrl-row">
                <button className="ctrl-btn left" onClick={() => handleDirection(-1, 0)}>◀</button>
                <button className="ctrl-btn right" onClick={() => handleDirection(1, 0)}>▶</button>
              </div>
              <button className="ctrl-btn down" onClick={() => handleDirection(0, 1)}>▼</button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const DatabaseVisualizer = () => {
  const [selectedTable, setSelectedTable] = useState('users');
  const [viewMode, setViewMode] = useState('erd'); // 'erd', 'jpa', or 'sql'
  const [selectedSqlQuery, setSelectedSqlQuery] = useState('leaderboard');
  const [isExecutingSql, setIsExecutingSql] = useState(false);
  const [sqlLogs, setSqlLogs] = useState([]);
  const [sqlResults, setSqlResults] = useState(null);

  // Phase 9 HikariCP pool states
  const [hikariStats, setHikariStats] = useState({ active: 2, idle: 8, max: 10 });
  const [poolTesting, setPoolTesting] = useState(false);
  const [hikariLogs, setHikariLogs] = useState([]);

  const tables = {
    users: {
      name: 'users',
      desc: 'Stores core user profiles, encrypted credentials, and verification markers',
      columns: [
        { name: 'id', type: 'BIGINT', key: 'PK', opt: 'Auto-Increment' },
        { name: 'email', type: 'VARCHAR(255)', key: 'UQ', opt: 'Indexed, Non-Null' },
        { name: 'password_hash', type: 'VARCHAR(512)', key: '', opt: 'Non-Null' },
        { name: 'is_verified', type: 'BOOLEAN', key: '', opt: 'Default false' },
        { name: 'role', type: 'VARCHAR(50)', key: '', opt: 'Default USER' }
      ],
      relations: [
        { target: 'otp_verifications', type: 'One-to-Many', key: 'users.id ➜ otp_verifications.user_id' },
        { target: 'scores', type: 'One-to-Many', key: 'users.id ➜ scores.user_id' }
      ],
      jpaCode: `@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_user_email", columnList = "email", unique = true)
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 512)
    private String passwordHash;

    @Column(name = "is_verified", nullable = false)
    private boolean isVerified = false;

    @Column(nullable = false)
    private String role = "USER";

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Score> scores = new ArrayList<>();
}`
    },
    quiz_rooms: {
      name: 'quiz_rooms',
      desc: 'Manages multiplayer quiz lobby sessions and dynamic topic configurations',
      columns: [
        { name: 'id', type: 'VARCHAR(100)', key: 'PK', opt: 'UUID / Unique Code' },
        { name: 'topic', type: 'VARCHAR(255)', key: '', opt: 'Non-Null' },
        { name: 'max_players', type: 'INT', key: '', opt: 'Default 10' },
        { name: 'created_at', type: 'TIMESTAMP', key: '', opt: 'Default CURRENT_TIMESTAMP' }
      ],
      relations: [
        { target: 'scores', type: 'One-to-Many', key: 'quiz_rooms.id ➜ scores.room_id' }
      ],
      jpaCode: `@Entity
@Table(name = "quiz_rooms")
public class QuizRoom {
    @Id
    @Column(length = 100)
    private String id; // Custom lobby code

    @Column(nullable = false)
    private String topic;

    @Column(name = "max_players", nullable = false)
    private int maxPlayers = 10;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Score> scores = new ArrayList<>();
}`
    },
    scores: {
      name: 'scores',
      desc: 'Tracks historical and live leaderboard records for multiplayer room completions',
      columns: [
        { name: 'id', type: 'BIGINT', key: 'PK', opt: 'Auto-Increment' },
        { name: 'user_id', type: 'BIGINT', key: 'FK', opt: 'Indexed, links to users.id' },
        { name: 'room_id', type: 'VARCHAR(100)', key: 'FK', opt: 'Indexed, links to quiz_rooms.id' },
        { name: 'score', type: 'INT', key: '', opt: 'Non-Null' },
        { name: 'completed_at', type: 'TIMESTAMP', key: '', opt: 'Default CURRENT_TIMESTAMP' }
      ],
      relations: [
        { target: 'users', type: 'Many-to-One', key: 'scores.user_id ➜ users.id' },
        { target: 'quiz_rooms', type: 'Many-to-One', key: 'scores.room_id ➜ quiz_rooms.id' }
      ],
      jpaCode: `@Entity
@Table(name = "scores", indexes = {
    @Index(name = "idx_score_user", columnList = "user_id"),
    @Index(name = "idx_score_room", columnList = "room_id")
})
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private QuizRoom room;

    @Column(nullable = false)
    private int score;

    @Column(name = "completed_at", nullable = false)
    private LocalDateTime completedAt = LocalDateTime.now();
}`
    }
  };

  const sqlQueries = {
    leaderboard: {
      name: "Q1: Leaderboard Standings (INNER JOIN)",
      sql: `SELECT u.email, s.score, r.topic, s.completed_at 
FROM scores s 
JOIN users u ON s.user_id = u.id 
JOIN quiz_rooms r ON s.room_id = r.id 
ORDER BY s.score DESC LIMIT 4;`,
      logs: [
        "⚡ Parser: Checking SQL relational query mapping...",
        "✔ Optimizer: Generating EXPLAIN execution pipeline...",
        "🔑 Primary Key Scans: scores.id (PK), users.id (PK), quiz_rooms.id (PK)",
        "📊 MySQL Query Plan: Nested Loop Hash Join (Rows scanned: 4)",
        "✔ Execution completed successfully in 1.14 milliseconds."
      ],
      cols: ["email", "score", "topic", "completed_at"],
      rows: [
        { email: "hiring-manager@google.com", score: 1000, topic: "Java Multithreading", completed_at: "2026-05-26 12:44" },
        { email: "recruiter-guest@netflix.com", score: 900, topic: "REST Architectures", completed_at: "2026-05-26 10:15" },
        { email: "lead-engineer@microsoft.com", score: 850, topic: "Spring Security Chain", completed_at: "2026-05-25 15:30" },
        { email: "tech-talent@amazon.com", score: 800, topic: "JPA Hibernate Pools", completed_at: "2026-05-25 09:22" }
      ]
    },
    rooms: {
      name: "Q2: Multiplayer Quiz Lobbies Audit (SELECT)",
      sql: `SELECT id, topic, max_players, created_at 
FROM quiz_rooms 
ORDER BY created_at DESC;`,
      logs: [
        "⚡ Parser: Checking SQL relational query mapping...",
        "✔ Optimizer: Generating EXPLAIN execution pipeline...",
        "🔑 Primary Key Scans: quiz_rooms.id (PK)",
        "📊 MySQL Query Plan: Index-Range Scan (Rows scanned: 3)",
        "✔ Execution completed successfully in 0.85 milliseconds."
      ],
      cols: ["id", "topic", "max_players", "created_at"],
      rows: [
        { id: "room-thread-2026", topic: "Java Multithreading & volatile", max_players: 10, created_at: "2026-05-26 13:00" },
        { id: "room-rest-45", topic: "REST API Security Chain", max_players: 8, created_at: "2026-05-26 11:30" },
        { id: "room-n8n-99", topic: "WhatsApp n8n Webhooks", max_players: 12, created_at: "2026-05-25 18:22" }
      ]
    },
    unverified: {
      name: "Q3: Security Failure Audit (LEFT JOIN & WHERE)",
      sql: `SELECT u.email, o.code, o.expires_at 
FROM otp_verifications o 
JOIN users u ON o.user_id = u.id 
WHERE u.is_verified = false AND o.expires_at < NOW();`,
      logs: [
        "⚡ Parser: Checking SQL relational query mapping...",
        "✔ Optimizer: Generating EXPLAIN execution pipeline...",
        "🔑 Primary Key Scans: otp_verifications.id (PK)",
        "⚡ Index hits: idx_user_email on users.email",
        "📊 MySQL Query Plan: Index-Nested Loop Join (Rows scanned: 2)",
        "✔ Execution completed successfully in 1.45 milliseconds."
      ],
      cols: ["email", "code", "expires_at"],
      rows: [
        { email: "unverified-user-1@spam.com", code: "772183", expires_at: "2026-05-25 10:00 (EXPIRED)" },
        { email: "unverified-user-2@test.com", code: "912083", expires_at: "2026-05-25 12:30 (EXPIRED)" }
      ]
    }
  };

  const executeSqlQuery = () => {
    setIsExecutingSql(true);
    setSqlResults(null);
    setSqlLogs([]);
    
    const logsList = sqlQueries[selectedSqlQuery].logs;
    let logIdx = 0;
    
    const logInterval = setInterval(() => {
      if (logIdx < logsList.length) {
        setSqlLogs((prev) => [...prev, logsList[logIdx]]);
        logIdx++;
      } else {
        clearInterval(logInterval);
        setSqlResults(sqlQueries[selectedSqlQuery]);
        setIsExecutingSql(false);
      }
    }, 280);
  };

  return (
    <section className="db-visualizer-section">
      <div className="container">
        <SectionTitle title="JPA Database ERD & Entity Visualizer" subtitle="Explore Charan's relational schemas, JPA models, and test raw SQL performance" />
        
        <div className="db-visualizer-layout visible">
          <div className="db-sidebar">
            <h3>Database Hub</h3>
            <div className="db-table-list">
              {Object.keys(tables).map(key => (
                <button
                  key={key}
                  className={`db-table-btn ${selectedTable === key && viewMode !== 'sql' ? 'active' : ''}`}
                  onClick={() => { setSelectedTable(key); if (viewMode === 'sql') setViewMode('erd'); }}
                >
                  📁 {tables[key].name}
                </button>
              ))}
            </div>
            
            <p className="db-table-desc">
              {viewMode === 'sql' 
                ? "Running raw SQL queries directly against memory schemas to verify relations and indexes." 
                : tables[selectedTable].desc
              }
            </p>

            <div className="db-view-selector">
              <button
                className={`db-view-btn ${viewMode === 'erd' ? 'active' : ''}`}
                onClick={() => setViewMode('erd')}
              >
                ERD Schema
              </button>
              <button
                className={`db-view-btn ${viewMode === 'jpa' ? 'active' : ''}`}
                onClick={() => setViewMode('jpa')}
              >
                JPA Java Code
              </button>
              <button
                className={`db-view-btn ${viewMode === 'sql' ? 'active' : ''}`}
                onClick={() => { setViewMode('sql'); setSqlResults(null); setSqlLogs([]); }}
              >
                SQL Playground ⚡
              </button>
              <button
                className={`db-view-btn ${viewMode === 'pool' ? 'active' : ''}`}
                onClick={() => { setViewMode('pool'); setHikariLogs([]); setPoolTesting(false); setHikariStats({ active: 2, idle: 8, max: 10 }); }}
              >
                HikariCP Pool 🧪
              </button>
            </div>
          </div>

          <div className="db-main">
            {viewMode === 'erd' && (
              <div className="erd-container">
                <div className="erd-table-card">
                  <div className="erd-table-header">
                    <span>TABLE</span>
                    <h4>{tables[selectedTable].name}</h4>
                  </div>
                  <div className="erd-table-columns">
                    <div className="erd-column-row header">
                      <span>Key</span>
                      <span>Column</span>
                      <span>Type</span>
                      <span>Options</span>
                    </div>
                    {tables[selectedTable].columns.map((col, idx) => (
                      <div className="erd-column-row" key={idx}>
                        <span className={`key-badge ${col.key.toLowerCase()}`}>{col.key || '•'}</span>
                        <span className="col-name">{col.name}</span>
                        <span className="col-type">{col.type}</span>
                        <span className="col-opt">{col.opt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="erd-relations-card">
                  <h4>Schema Relationships</h4>
                  <div className="erd-relation-list">
                    {tables[selectedTable].relations.map((rel, idx) => (
                      <div className="erd-relation-item" key={idx}>
                        <div className="erd-relation-header">
                          <span className="rel-type">{rel.type}</span>
                          <h5>To {rel.target}</h5>
                        </div>
                        <span className="rel-key">{rel.key}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {viewMode === 'jpa' && (
              <div className="jpa-code-container">
                <pre className="jpa-code-block">
                  <code>{tables[selectedTable].jpaCode}</code>
                </pre>
              </div>
            )}

            {viewMode === 'sql' && (
              <div className="sql-playground-container font-monospace">
                <div className="sql-editor-card">
                  <div className="sql-card-header">
                    <span>Select Preset Query:</span>
                    <select 
                      value={selectedSqlQuery} 
                      onChange={(e) => { setSelectedSqlQuery(e.target.value); setSqlResults(null); setSqlLogs([]); }}
                      disabled={isExecutingSql}
                    >
                      {Object.keys(sqlQueries).map(key => (
                        <option key={key} value={key}>{sqlQueries[key].name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sql-code-box">
                    <pre className="sql-code text-green"><code>{sqlQueries[selectedSqlQuery].sql}</code></pre>
                  </div>
                  <button className="btn-execute-sql" onClick={executeSqlQuery} disabled={isExecutingSql}>
                    {isExecutingSql ? "Executing query optimizer..." : "⚡ Execute Query"}
                  </button>
                </div>

                {/* Animated SQL Execution Terminal Logs */}
                {(isExecutingSql || sqlLogs.length > 0) && (
                  <div className="sql-terminal-box animated-fade-up">
                    <div className="terminal-header-bar">
                      <span>Query Trace Terminal Output</span>
                    </div>
                    <div className="terminal-logs">
                      {sqlLogs.map((log, idx) => (
                        <p key={idx} className="terminal-log-line">{log}</p>
                      ))}
                      {isExecutingSql && <span className="terminal-cursor">_</span>}
                    </div>
                  </div>
                )}

                {/* Data Grid Result Output */}
                {sqlResults && (
                  <div className="sql-result-grid-box animated-fade-up">
                    <div className="grid-header-bar">
                      <span>Live MySQL Data Grid Rows</span>
                    </div>
                    <div className="grid-table-wrapper">
                      <table className="sql-grid-table">
                        <thead>
                          <tr>
                            {sqlResults.cols.map(col => <th key={col}>{col}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {sqlResults.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {sqlResults.cols.map(col => <td key={col}>{row[col]}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {viewMode === 'pool' && (
              <div className="hikari-pool-container font-monospace text-light">
                <div className="hikari-controls-card">
                  <h4>HikariCP Relational Connection Pool Simulation</h4>
                  <p className="pool-sub font-sans">Simulate connection throttling and observe thread allocation performance locks.</p>
                  
                  <div className="pool-dashboard-meters">
                    <div className="pool-gauge-box">
                      <div className="pool-num active">{hikariStats.active}</div>
                      <span className="pool-lbl">Active Sessions</span>
                    </div>
                    <div className="pool-gauge-box">
                      <div className="pool-num idle">{hikariStats.idle}</div>
                      <span className="pool-lbl">Idle Sessions</span>
                    </div>
                    <div className="pool-gauge-box">
                      <div className="pool-num max">{hikariStats.max}</div>
                      <span className="pool-lbl">Max Size</span>
                    </div>
                  </div>

                  <button 
                    className="btn-stress-pool" 
                    onClick={() => {
                      setPoolTesting(true);
                      setHikariLogs(["⚡ Spawning 25 concurrent transaction threads...", "⏳ Requesting connection allocations..."]);
                      
                      setTimeout(() => {
                        setHikariStats({ active: 10, idle: 0, max: 10 });
                        setHikariLogs(prev => [
                          ...prev,
                          "🔴 CONNECTION POOL EXHAUSTED! Max connections reached (10/10).",
                          "⚠️ [HikariPool-1] Connection acquisition timeout alert!",
                          "⏳ Thread-14 waiting for 250ms... thread-15 blocked.",
                          "💥 Lock conflict: MySQL InnoDB Row Share Locks active."
                        ]);
                      }, 800);

                      setTimeout(() => {
                        setHikariStats({ active: 2, idle: 8, max: 10 });
                        setHikariLogs(prev => [
                          ...prev,
                          "✔ Transaction threads complete. Releasing connection sockets.",
                          "🟢 Pool returned to optimal idle state (Active: 2, Idle: 8)."
                        ]);
                        setPoolTesting(false);
                      }, 3200);
                    }} 
                    disabled={poolTesting}
                  >
                    {poolTesting ? "Saturating connections..." : "💥 Stress Test DB Connection Pool (25 Threads)"}
                  </button>
                </div>

                {(poolTesting || hikariLogs.length > 0) && (
                  <div className="hikari-terminal-logs animated-fade-up">
                    <div className="terminal-header-bar">
                      <span>HikariCP Pool Saturation Logs</span>
                    </div>
                    <div className="terminal-logs">
                      {hikariLogs.map((log, idx) => (
                        <p key={idx} className="terminal-log-line" style={{ color: log.includes('🔴') || log.includes('⚠️') ? '#ff4757' : log.includes('🟢') ? '#10b981' : '' }}>
                          {log}
                        </p>
                      ))}
                      {poolTesting && <span className="terminal-cursor">_</span>}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ThemeCustomizer = () => {
  const [activeTheme, setActiveTheme] = useState('green');

  const themes = [
    { id: 'green', name: 'Cyberpunk Green', color: '#0f9d58', icon: '💚' },
    { id: 'purple', name: 'Amethyst Purple', color: '#7c3aed', icon: '💜' },
    { id: 'blue', name: 'Deep Ocean Blue', color: '#2563eb', icon: '💙' }
  ];

  const handleThemeChange = (id) => {
    setActiveTheme(id);
    document.body.classList.remove('theme-purple', 'theme-blue');
    if (id === 'purple') {
      document.body.classList.add('theme-purple');
    } else if (id === 'blue') {
      document.body.classList.add('theme-blue');
    }
  };

  return (
    <div className="theme-customizer">
      <div className="theme-customizer-pill">
        {themes.map(t => (
          <button
            key={t.id}
            className={`theme-btn ${activeTheme === t.id ? 'active' : ''}`}
            onClick={() => handleThemeChange(t.id)}
            title={t.name}
            style={{ '--theme-color': t.color }}
          >
            {t.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

const ServerDashboard = () => {
  const [logs, setLogs] = useState([
    { id: 1, time: new Date().toLocaleTimeString(), method: 'GET', url: '/api/v1/actuator/health', status: 200 },
    { id: 2, time: new Date().toLocaleTimeString(), method: 'GET', url: '/api/v1/auth/session', status: 200 }
  ]);
  const [metrics, setMetrics] = useState({ cpu: 12, memory: 45, uptime: '0h 00m 00s' });
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchmarkProgress, setBenchmarkProgress] = useState(0);
  const [showReport, setShowReport] = useState(false);

  // Phase 9 GC & Leak States
  const [isLeaking, setIsLeaking] = useState(false);
  const [leakIntervalId, setLeakIntervalId] = useState(null);
  const [gcState, setGcState] = useState(null); // 'sweeping', 'done'

  useEffect(() => {
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      if (isBenchmarking || isLeaking || gcState === 'sweeping') return;

      const cpuVal = Math.floor(Math.random() * 20) + 5;
      const memVal = Math.floor(Math.random() * 4) + 40;
      
      const diffMs = Date.now() - startTime;
      const hours = Math.floor(diffMs / 3600000);
      const minutes = Math.floor((diffMs % 3600000) / 60000);
      const seconds = Math.floor((diffMs % 60000) / 1000);
      const uptimeStr = `${hours}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;

      setMetrics({ cpu: cpuVal, memory: memVal, uptime: uptimeStr });

      const urls = [
        '/api/v1/auth/otp/send',
        '/api/v1/quiz/generate',
        '/api/v1/automation/n8n/webhook',
        '/api/v1/certifications/list',
        '/api/v1/actuator/metrics',
        '/api/v1/profile/load'
      ];
      const randomUrl = urls[Math.floor(Math.random() * urls.length)];
      const randomMethod = randomUrl.includes('generate') || randomUrl.includes('send') || randomUrl.includes('webhook') ? 'POST' : 'GET';
      
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        method: randomMethod,
        url: randomUrl,
        status: 200
      };

      setLogs(prev => [newLog, ...prev.slice(0, 4)]);
    }, 4000);

    return () => clearInterval(interval);
  }, [isBenchmarking, isLeaking, gcState]);

  // Performance Load Testing Simulator routine
  useEffect(() => {
    let benchmarkInterval;
    if (isBenchmarking) {
      const urls = [
        '/api/v1/auth/otp/send',
        '/api/v1/quiz/generate',
        '/api/v1/automation/n8n/webhook',
        '/api/v1/actuator/metrics',
        '/api/v1/profile/load'
      ];
      
      // Spike meters
      setMetrics(prev => ({ ...prev, cpu: 94, memory: 82 }));

      benchmarkInterval = setInterval(() => {
        setBenchmarkProgress(prev => {
          if (prev >= 100) {
            setIsBenchmarking(false);
            setShowReport(true);
            clearInterval(benchmarkInterval);
            return 100;
          }
          return prev + 5;
        });

        // Spawn a log line at high speed
        const randomUrl = urls[Math.floor(Math.random() * urls.length)];
        const randomMethod = randomUrl.includes('generate') || randomUrl.includes('send') || randomUrl.includes('webhook') ? 'POST' : 'GET';
        const isError = Math.random() < 0.006;
        
        const newLog = {
          id: Date.now() + Math.random(),
          time: new Date().toLocaleTimeString(),
          method: randomMethod,
          url: randomUrl,
          status: isError ? 500 : 200
        };

        setLogs(prev => [newLog, ...prev.slice(0, 6)]);
      }, 150);
    }
    return () => clearInterval(benchmarkInterval);
  }, [isBenchmarking]);

  const startBenchmark = () => {
    if (isLeaking) return;
    setIsBenchmarking(true);
    setBenchmarkProgress(0);
    setShowReport(false);
  };

  const triggerMemoryLeak = () => {
    if (isBenchmarking || gcState === 'sweeping') return;
    setIsLeaking(true);
    setGcState(null);
    setMetrics(prev => ({ ...prev, cpu: 32 }));

    let currentMem = metrics.memory;
    const interval = setInterval(() => {
      currentMem = Math.min(98, currentMem + Math.floor(Math.random() * 5) + 3);
      setMetrics(prev => ({ ...prev, memory: currentMem }));
      
      const alertLogs = [
        { id: Date.now() + Math.random(), time: new Date().toLocaleTimeString(), method: 'WARN', url: '[HEAP LIMIT] Saturation at ' + currentMem + '%', status: 503 },
        { id: Date.now() + Math.random(), time: new Date().toLocaleTimeString(), method: 'WARN', url: '[JVM THREAD] OutOfMemory close to threshold', status: 503 }
      ];
      
      if (currentMem >= 90) {
        setLogs(prev => [alertLogs[0], alertLogs[1], ...prev.slice(0, 4)]);
      }

      if (currentMem >= 98) {
        clearInterval(interval);
      }
    }, 450);

    setLeakIntervalId(interval);
  };

  const triggerGarbageCollection = () => {
    if (leakIntervalId) clearInterval(leakIntervalId);
    setIsLeaking(false);
    setGcState('sweeping');
    
    setTimeout(() => {
      setGcState('done');
      setMetrics(prev => ({ ...prev, memory: 22, cpu: 15 }));
      
      const gcLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        method: 'INFO',
        url: '[GC TRACE] PS YoungGen sweep completed, reclaimed 641MB heap space in 12ms',
        status: 200
      };
      setLogs(prev => [gcLog, ...prev.slice(0, 5)]);
    }, 1200);
  };

  return (
    <section className="server-dashboard-section">
      <div className="container">
        <SectionTitle title="Spring Boot Actuator Observer" subtitle="Live simulated observability metrics, memory leaks, and active server logs" />
        
        <div className="actuator-grid visible">
          <div className="actuator-metrics-card">
            <div className="actuator-card-header">
              <h4>JVM Server Metrics</h4>
              <div className="actuator-actions">
                <button 
                  className={`btn-run-benchmark ${isBenchmarking ? 'running' : ''}`} 
                  onClick={startBenchmark} 
                  disabled={isBenchmarking || isLeaking || gcState === 'sweeping'}
                >
                  {isBenchmarking ? `Benchmarking ${benchmarkProgress}%... ⚡` : "🚀 Load Simulator"}
                </button>
                
                <button 
                  className="btn-trigger-leak"
                  onClick={triggerMemoryLeak}
                  disabled={isBenchmarking || isLeaking || gcState === 'sweeping' || metrics.memory >= 95}
                >
                  🚨 Leak Memory
                </button>

                <button 
                  className="btn-run-gc"
                  onClick={triggerGarbageCollection}
                  disabled={isBenchmarking || gcState === 'sweeping'}
                >
                  {gcState === 'sweeping' ? "Sweeping JVM..." : "🧹 Sweep GC"}
                </button>
              </div>
            </div>
            
            <div className="actuator-gauges-container">
              <div className="actuator-gauge-box">
                <div className="gauge-dial">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" className="gauge-track" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      className="gauge-fill" 
                      style={{ 
                        strokeDasharray: `${2 * Math.PI * 40}`, 
                        strokeDashoffset: `${2 * Math.PI * 40 * (1 - (isBenchmarking ? 94 : metrics.cpu) / 100)}`,
                        stroke: (isBenchmarking ? 94 : metrics.cpu) > 85 ? '#ef4444' : 'var(--primary)'
                      }} 
                    />
                  </svg>
                  <span className="gauge-value font-monospace">{isBenchmarking ? 94 : metrics.cpu}%</span>
                </div>
                <span className="gauge-lbl">JVM CPU Load</span>
              </div>

              <div className="actuator-gauge-box">
                <div className="gauge-dial">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" className="gauge-track" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      className="gauge-fill" 
                      style={{ 
                        strokeDasharray: `${2 * Math.PI * 40}`, 
                        strokeDashoffset: `${2 * Math.PI * 40 * (1 - metrics.memory / 100)}`,
                        stroke: metrics.memory > 90 ? '#ff4757' : metrics.memory > 75 ? '#ffa502' : 'var(--accent)'
                      }} 
                    />
                  </svg>
                  <span className="gauge-value font-monospace">{metrics.memory}%</span>
                </div>
                <span className="gauge-lbl">JVM Heap Memory</span>
              </div>
            </div>

            {metrics.memory >= 90 && (
              <div className="actuator-heap-alert font-monospace animated-flash">
                ⚠️ WARNING: JVM heap memory critically saturated! Sweep GC immediately!
              </div>
            )}

            {gcState === 'sweeping' && (
              <div className="actuator-gc-sweeping font-monospace">
                🧹 executing Concurrent Mark Sweep (CMS) GC...
              </div>
            )}

            <div className="actuator-stats">
              <div className="stat-box">
                <span className="stat-lbl">Uptime</span>
                <span className="stat-val monospace">{metrics.uptime}</span>
              </div>
              <div className="stat-box">
                <span className="stat-lbl">JVM Threads</span>
                <span className="stat-val monospace">{isBenchmarking ? "124 Active" : isLeaking ? "88 Active" : "34 Active"}</span>
              </div>
              <div className="stat-box">
                <span className="stat-lbl">Status</span>
                <span className="stat-val health-up" style={{ color: metrics.memory >= 90 ? '#ff4757' : '' }}>
                  {isBenchmarking ? "● BENCHMARKING" : isLeaking ? "● MEMORY_LEAK" : gcState === 'sweeping' ? "● GC_SWEEP" : "● UP"}
                </span>
              </div>
            </div>
          </div>

          <div className="actuator-log-card">
            <div className="log-card-header">
              <h4>Spring Boot System Logs</h4>
              <span className={`pulse-dot ${isBenchmarking ? 'benchmark-pulsing' : isLeaking ? 'leak-pulsing' : ''}`}></span>
            </div>
            <div className="log-console">
              {logs.map(log => (
                <div className="log-line" key={log.id}>
                  <span className="log-time">[{log.time}]</span>
                  <span className="log-info" style={{ color: log.method === 'WARN' ? '#ff4757' : '' }}>
                    {log.method === 'WARN' ? 'WARN' : 'INFO'}
                  </span>
                  <span className="log-msg">
                    {log.method === 'INFO' && log.url.includes('[GC') ? (
                      <span className="text-green font-monospace">{log.url}</span>
                    ) : log.method === 'WARN' ? (
                      <span className="text-error font-monospace">{log.url} (Code: {log.status})</span>
                    ) : (
                      <>DispatcherServlet: Completed <span className={`log-method ${log.method.toLowerCase()}`}>{log.method}</span> <span className="log-url">{log.url}</span> with status <span className="log-status">{log.status}</span></>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gatling Load Test Performance Report Modal */}
        {showReport && (
          <div className="benchmark-modal-overlay" onClick={() => setShowReport(false)}>
            <div className="benchmark-modal-card" onClick={e => e.stopPropagation()}>
              <div className="benchmark-modal-header">
                <h3>📊 Gatling / Spring Boot Performance Report</h3>
                <button className="benchmark-close-btn" onClick={() => setShowReport(false)}>&times;</button>
              </div>
              <div className="benchmark-modal-body">
                <div className="benchmark-summary-readout">
                  <div className="readout-title">BENCHMARK EXECUTION SUCCESSFUL</div>
                  <p>Targeted 1000 simulated HTTP requests/second at internal Servlet contexts.</p>
                </div>
                
                <div className="benchmark-stats-grid">
                  <div className="b-stat-card">
                    <span className="b-label">Total Requests</span>
                    <span className="b-value monospace">4,289</span>
                  </div>
                  <div className="b-stat-card">
                    <span className="b-label">Success Rate</span>
                    <span className="b-value success monospace">99.93%</span>
                  </div>
                  <div className="b-stat-card">
                    <span className="b-label">Avg Response Time</span>
                    <span className="b-value monospace">12.4 ms</span>
                  </div>
                  <div className="b-stat-card">
                    <span className="b-label">Peak Throughput</span>
                    <span className="b-value monospace">1,021 req/s</span>
                  </div>
                </div>

                <div className="benchmark-details-list">
                  <h4>💡 Execution Metrics</h4>
                  <div className="b-detail-row">
                    <span>HikariCP Database Connections Max Saturation:</span>
                    <span className="font-monospace">28/30 active sessions (Relational caches optimal)</span>
                  </div>
                  <div className="b-detail-row">
                    <span>Failed HTTP packets (500 Internal Error):</span>
                    <span className="font-monospace text-error">3 Requests (JWT Signature decrypt timeout under load)</span>
                  </div>
                  <div className="b-detail-row font-monospace">
                    <span>Garbage Collection overhead:</span>
                    <span>1.2% active memory pause duration</span>
                  </div>
                </div>

                {/* Simulated Gatling distribution histogram chart */}
                <div className="latency-distribution">
                  <h4>⏱ Latency Percentile Distribution</h4>
                  <div className="dist-grid">
                    <div className="dist-row">
                      <span className="dist-label">p50 (Median)</span>
                      <div className="dist-bar-outer"><div className="dist-bar-inner" style={{width: '30%'}}></div></div>
                      <span className="dist-val">8.2 ms</span>
                    </div>
                    <div className="dist-row">
                      <span className="dist-label">p90 (High Load)</span>
                      <div className="dist-bar-outer"><div className="dist-bar-inner" style={{width: '50%'}}></div></div>
                      <span className="dist-val">14.5 ms</span>
                    </div>
                    <div className="dist-row">
                      <span className="dist-label">p95 (Peak Load)</span>
                      <div className="dist-bar-outer"><div className="dist-bar-inner" style={{width: '70%'}}></div></div>
                      <span className="dist-val">22.0 ms</span>
                    </div>
                    <div className="dist-row">
                      <span className="dist-label">p99 (Outliers)</span>
                      <div className="dist-bar-outer"><div className="dist-bar-inner" style={{width: '95%'}}></div></div>
                      <span className="dist-val">45.8 ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'ai', label: 'AI & GenAI' },
    { id: 'backend', label: 'Java & Backend' },
    { id: 'datascience', label: 'Python & Data Science' },
    { id: 'security', label: 'Security & Agile' },
    { id: 'internship', label: 'Internship & Research' }
  ];

  const certs = [
    // === AI / Generative AI ===
    {
      title: "Generative AI & LLMs Foundations: From Basics to Application",
      issuer: "Udemy",
      date: "2025",
      category: "ai",
      icon: "🤖",
      focus: ["Generative AI", "Large Language Models", "AI applications"],
      link: "/certificates/udemy_generative_ai_llms.pdf"
    },
    {
      title: "Introduction to Large Language Models",
      issuer: "IBM SkillsBuild",
      date: "2025",
      category: "ai",
      icon: "🧠",
      focus: ["LLM basics", "AI foundations", "Language model concepts"],
      link: "/certificates/ibm_skillsbuild_intro_llms.png"
    },
    {
      title: "Introduction to Artificial Intelligence (AI)",
      issuer: "IBM / Coursera",
      date: "Dec 8, 2025",
      category: "ai",
      icon: "🤖",
      focus: ["AI fundamentals", "Machine learning basics", "AI concepts"],
      link: "/certificates/ibm_coursera_intro_ai.pdf"
    },
    {
      title: "AI Fluency for Students",
      issuer: "Anthropic",
      date: "2025",
      category: "ai",
      icon: "✨",
      focus: ["Responsible AI", "AI usage", "AI productivity"],
      link: "/certificates/anthropic_ai_fluency.png"
    },
    {
      title: "15 Days Generative AI Program",
      issuer: "Learnomate Technologies",
      date: "April 2026",
      category: "ai",
      icon: "⚙️",
      focus: ["Generative AI tools", "AI applications", "AI workflows"],
      link: "/certificates/learnomate_15_days_genai.pdf"
    },
    {
      title: "AI for Beginners",
      issuer: "HP LIFE",
      date: "Dec 8, 2025",
      category: "ai",
      icon: "💡",
      focus: ["AI basics", "AI applications", "Data importance", "Ethical implications"],
      link: "/certificates/hp_life_ai_beginners.pdf"
    },

    // === Java / Backend ===
    {
      title: "Fundamentals of Java Programming",
      issuer: "Board Infinity via Coursera",
      date: "Dec 8, 2025",
      category: "backend",
      icon: "☕",
      focus: ["Java programming", "Core Java fundamentals"],
      link: "/certificates/coursera_fundamentals_java.pdf"
    },
    {
      title: "Software Engineering Job Simulation",
      issuer: "Forage",
      date: "March 31, 2026",
      category: "backend",
      icon: "💻",
      focus: ["REST API integration", "Kafka integration", "Backend setup", "H2 integration"],
      link: "/certificates/forage_software_engineering.pdf"
    },
    {
      title: "Ansible Essentials for Network Engineers",
      issuer: "Ansible",
      date: "Nov 2025",
      category: "backend",
      icon: "⚙️",
      focus: ["Ansible automation", "Network automation"],
      link: "/certificates/ansible_essentials.pdf"
    },

    // === Python / Data Science ===
    {
      title: "Python Programming Mastery: From Beginner to Pro",
      issuer: "Udemy",
      date: "2025",
      category: "datascience",
      icon: "🐍",
      focus: ["Python programming", "Intermediate Python concepts"],
      link: "/certificates/udemy_python_mastery.pdf"
    },
    {
      title: "Python 101 for Data Science",
      issuer: "IBM Cognitive Class",
      date: "Nov 26, 2025",
      category: "datascience",
      icon: "📊",
      focus: ["Python for data science", "Data analysis basics"],
      link: "/certificates/ibm_python_data_science.pdf"
    },
    {
      title: "Introduction to Data Science",
      issuer: "Cisco Networking Academy",
      date: "Aug 2, 2025",
      category: "datascience",
      icon: "🔬",
      focus: ["Data science basics", "Analytics introduction"],
      link: "/certificates/cisco_intro_data_science.pdf"
    },
    {
      title: "Microsoft Power BI (Self Learning)",
      issuer: "Skill Course",
      date: "Feb 14, 2026",
      category: "datascience",
      icon: "📊",
      focus: ["Power BI", "Data Visualization", "Data Analytics", "Self Learning"],
      link: "/certificates/microsoft_power_bi.png"
    },
    {
      title: "Data Science & Analytics",
      issuer: "HP LIFE",
      date: "Oct 20, 2024",
      category: "datascience",
      icon: "📈",
      focus: ["Analytics practices", "Data-driven approaches", "Business analytics"],
      link: "/certificates/hp_life_data_science_analytics.pdf"
    },
    {
      title: "Introduction to Data Science Job Simulation",
      issuer: "Forage",
      date: "Aug 4, 2025",
      category: "datascience",
      icon: "📁",
      focus: ["Data aggregation", "Database design", "Analysis approaches"],
      link: "/certificates/forage_intro_data_science.pdf"
    },
    {
      title: "Data Science Job Simulation",
      issuer: "Forage",
      date: "Aug 4, 2025",
      category: "datascience",
      icon: "🤖",
      focus: ["Customer prediction", "Modeling", "Data analysis"],
      link: "/certificates/forage_data_science_modeling.pdf"
    },
    {
      title: "GenAI Powered Data Analytics Job Simulation",
      issuer: "Forage",
      date: "July 19, 2025",
      category: "datascience",
      icon: "⚡",
      focus: ["AI-driven analytics", "Risk profiling", "Business reporting", "Data storytelling"],
      link: "/certificates/forage_genai_data_analytics.pdf"
    },

    // === Cybersecurity & Agile ===
    {
      title: "Introduction to Cybersecurity Awareness",
      issuer: "HP LIFE",
      date: "Oct 24, 2024",
      category: "security",
      icon: "🛡️",
      focus: ["Cybersecurity threats", "Online security basics"],
      link: "/certificates/hp_life_cybersecurity_awareness.pdf"
    },
    {
      title: "Cybersecurity Analyst Job Simulation",
      issuer: "Forage",
      date: "Aug 4, 2025",
      category: "security",
      icon: "🔐",
      focus: ["IAM fundamentals", "Security integration", "IAM strategies"],
      link: "/certificates/forage_cybersecurity_analyst.pdf"
    },
    {
      title: "Agile Project Management",
      issuer: "HP LIFE",
      date: "Oct 24, 2024",
      category: "security",
      icon: "📅",
      focus: ["Scrum", "Kanban", "Agile workflows", "MVP concepts"],
      link: "/certificates/hp_life_agile_pm.pdf"
    },

    // === Internship & Research ===
    {
      title: "Machine Learning Internship",
      issuer: "Entelika Consultancy & IT Services",
      date: "Aug 4 – Nov 4, 2025",
      category: "internship",
      icon: "💼",
      focus: ["Credit Card Fraud Detection", "Machine Learning"],
      link: "/certificates/entelika_ml_internship.pdf"
    },
    {
      title: "Research Publication — IJRPR",
      issuer: "IJRPR Journal",
      date: "2025",
      category: "internship",
      icon: "📝",
      focus: ["IoT Anti-Theft Flooring System", "Survey Paper", "Sensors & IoT"],
      link: "/certificates/ijrpr_research_publication.pdf"
    }
  ];

  const filteredCerts = activeCategory === 'all'
    ? certs
    : certs.filter(cert => cert.category === activeCategory);

  return (
    <section className="certs">
      <div className="container">
        <SectionTitle title="Certifications" subtitle="A comprehensive collection of my professional credentials and academic achievements" />
        
        {/* Category Filters */}
        <div className="certs-filter-container">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`certs-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Certs Grid */}
        <div className="certs-grid">
          {filteredCerts.map((cert, idx) => (
            <div className="cert-card visible" key={`${activeCategory}-${idx}`}>
              <div className="cert-card-inner">
                <div className="cert-header">
                  <div className="cert-icon">{cert.icon}</div>
                  <span className="cert-date">{cert.date}</span>
                </div>
                <div className="cert-content">
                  <h4>{cert.title}</h4>
                  <div className="cert-issuer-badge">{cert.issuer}</div>
                  {cert.focus && cert.focus.length > 0 && (
                    <div className="cert-focus-tags">
                      {cert.focus.map((item, i) => (
                        <span key={i} className="cert-focus-tag">{item}</span>
                      ))}
                    </div>
                  )}
                  {cert.link && (
                    <a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="cert-link-btn"
                    >
                      View Certificate
                      <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24" style={{marginLeft: "4px", display: "inline-block", verticalAlign: "middle"}}><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.83 6.977-7.07 4.125 4.17v-11z"/></svg>
                    </a>
                  )}
                </div>
              </div>
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

    document.querySelectorAll('.timeline-item, .project-card, .skill-card, .cert-card, .skill-dashboard-card, .playground-card, .case-study-container, .db-visualizer-layout, .actuator-grid').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

const DynamicResume = () => {
  const [track, setTrack] = useState('backend'); // 'backend', 'ai', 'fullstack'

  const resumeData = {
    backend: {
      role: "Java Backend Engineer & JVM Specialist",
      summary: "High-performance software engineer specialized in Java, Spring Boot, Spring Security, Hibernate JPA, and MySQL relational pool optimizations. Experienced in building multi-threaded REST APIs, securing microservices with custom JWT cryptopads, and benchmarking thread pools under load.",
      skills: ["Java (Core & OOP)", "Spring Boot", "Spring Security", "JPA / Hibernate", "HikariCP", "MySQL / PostgreSQL", "JUnit / Mockito", "Multithreading", "REST API Design"],
      projects: [
        { title: "QuizAI — Kahoot-Style AI Quiz", desc: "Engineered 20+ REST APIs on custom Java HTTP server. Features multiplayer room WebSocket sessions, JWT/OTP security, and optimized MySQL database caches." },
        { title: "IoT Smart Flooring System", desc: "Anti-theft microcontroller grid detecting coordinates. Published peer-reviewed paper in IJRPR Journal illustrating real-time cellular GSM parser servlet." }
      ],
      certs: ["Fundamentals of Java Programming (Coursera)", "Software Engineering Job Simulation (Forage)", "Database Design & SQL (HP LIFE)"],
      coverLetter: "Dear Hiring Manager,\n\nI am writing to express my enthusiastic interest in your Backend Developer position. With a strong academic foundation in Computer Science and hands-on experience engineering high-performance Java architectures, I am eager to contribute to your engineering team.\n\nDuring my internship, I designed secure REST APIs in Spring Boot, optimized database latency by 30-40% using custom Hibernate JPA queries, and managed DB connection pools under stress using HikariCP. Furthermore, I built a custom multi-threaded WebSocket server for multiplayer room lobbies, validating token signatures at custom JWT filter chains. I am highly comfortable with JVM concurrency, volatile thread-visibility flags, and heap memory analysis.\n\nI look forward to discussing how my backend skills can help scale your services.\n\nSincerely,\nCharan M U"
    },
    ai: {
      role: "AI Integration & LLM Workflow Automation Engineer",
      summary: "AI engineering enthusiast skilled in visual n8n automation pipelines, Twilio WhatsApp Business APIs, Claude/OpenAI REST integrations, intent classifications, and intelligent error troubleshooting.",
      skills: ["OpenAI & Claude APIs", "n8n Automation Pipelines", "WhatsApp Business API", "Twilio Integrations", "Intent Classification", "GenAI Risk Profiling", "Python", "API Integrations"],
      projects: [
        { title: "AI Workflow Automation Suite", desc: "Designed 8 visual n8n automation workflows integrating WhatsApp Business API, serving 500-1000 daily active sessions and reducing operational friction by 70%." },
        { title: "QuizAI Dynamic LLM Engine", desc: "Integrated Claude API models to dynamically parse multithreading quizzes into structured JSON payloads on-the-fly inside custom Spring contexts." }
      ],
      certs: ["Generative AI & LLMs Foundations (Udemy)", "Intro to Large Language Models (IBM)", "GenAI Powered Data Analytics (Forage)", "AI Fluency for Students (Anthropic)"],
      coverLetter: "Dear Hiring Manager,\n\nI am writing to express my strong interest in your AI Integrator / LLM Automation position. Having spent extensive time building and deploying dynamic visual pipelines and integrating state-of-the-art LLM endpoints, I am confident in my ability to automate and streamline your operations.\n\nI designed and deployed 8 production-ready n8n automation pipelines that integrate the Twilio WhatsApp Business API with Claude API intent classifiers. This visual orchestrator scales to handle 1000 concurrent user sessions daily, executing automatic failure retries, webhook captures, and syncing active CRM profiles. I specialize in prompt engineering, structuring JSON payload outputs from models, and designing secure webhooks.\n\nI would love the opportunity to bring my AI integration and visual pipeline expertise to your company.\n\nSincerely,\nCharan M U"
    },
    fullstack: {
      role: "Full-Stack Web & Creative Visuals Engineer",
      summary: "Creative full-stack developer specialized in modern React SPAs, interactive visual playgrounds, 3D WebGL meshes (Three.js), CSS glassmorphism, HTML5 canvas simulations, and MySQL relational ERD visualizers.",
      skills: ["React.js", "Three.js (WebGL)", "HTML5 Canvas Physics", "Web Audio API", "Vanilla CSS / HSL", "JavaScript (ES6+)", "Responsive UI Design", "REST integrations"],
      projects: [
        { title: "Three.js Neural Hero & Visuals", desc: "Overhauled portfolio with three.js particle gravity drift networks, parallax tilts, and dynamic Class swapper MutationObservers." },
        { title: "Playground Retro CRT Arcade", desc: "Built a fully playable neon Snake canvas game with oscillator beep synthesizer triggers using the browser's Web Audio API." }
      ],
      certs: ["Python Programming Mastery (Udemy)", "JavaScript ES6 (Cognitive Class)", "Microsoft Power BI (Skill Course)"],
      coverLetter: "Dear Hiring Manager,\n\nI am writing to apply for your Full-Stack Developer position. I combine a deep understanding of robust backend APIs (Java / SQL) with a strong passion for designing beautiful, modern, and highly interactive user interfaces in React.\n\nOn the frontend, I specialize in creative coding, including WebGL parallax particle simulations in Three.js, responsive HTML5 canvas game physics, and Web Audio API synthesizer algorithms. On the backend, I design secure JWT token sandboxes, database connection pool stress dashboards, and interactive REST playgrounds. I ensure that every page loads under 2.5s and is completely optimized for recruiter engagement.\n\nI am excited to demonstrate my creative full-stack capabilities at your organization.\n\nSincerely,\nCharan M U"
    }
  };

  const currentData = resumeData[track];

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="dynamic-resume" className="dynamic-resume-section">
      <div className="container">
        <SectionTitle title="AI-Powered Career Customizer" subtitle="Customize Charan's credentials and print a tailored 1-page PDF instantly" />
        
        <div className="resume-customizer-wrapper visible">
          {/* Customization Toggles */}
          <div className="customizer-sidebar font-sans">
            <h3>Choose Target Role</h3>
            <p className="customizer-desc">Select a career track. Charan's resume content, skills priority, and cover letter will dynamically rearrange to fit the target role.</p>
            
            <div className="track-toggles-vertical">
              <button 
                className={`btn-track-select ${track === 'backend' ? 'active' : ''}`}
                onClick={() => setTrack('backend')}
              >
                ☕ Java & Spring Backend
              </button>
              <button 
                className={`btn-track-select ${track === 'ai' ? 'active' : ''}`}
                onClick={() => setTrack('ai')}
              >
                🤖 AI Integration & n8n
              </button>
              <button 
                className={`btn-track-select ${track === 'fullstack' ? 'active' : ''}`}
                onClick={() => setTrack('fullstack')}
              >
                🎨 Full-Stack Web & 3D
              </button>
            </div>

            <button className="btn-print-resume font-monospace" onClick={handlePrint}>
              📄 Export 1-Page PDF Resume
            </button>
          </div>

          {/* Dynamic Printable Document Sheet */}
          <div className="printable-resume-sheet font-sans" id="printable-area">
            <div className="sheet-watermark">OFFICIAL DOCUMENT</div>
            
            <div className="sheet-header">
              <div className="sheet-title-block">
                <h2>CHARAN M U</h2>
                <span className="sheet-role text-primary font-monospace">{currentData.role}</span>
              </div>
              <div className="sheet-contact-block font-monospace">
                <span>📧 jeevancharanmu@gmail.com</span>
                <span>📞 +91 7019301031</span>
                <span>🔗 github.com/charanmu</span>
              </div>
            </div>

            <div className="sheet-divider"></div>

            <div className="sheet-section summary">
              <h4>PROFILE SUMMARY</h4>
              <p>{currentData.summary}</p>
            </div>

            <div className="sheet-section skills">
              <h4>TECHNICAL EXPERTISE</h4>
              <div className="skills-comma-list">
                {currentData.skills.map((skill, idx) => (
                  <span key={idx} className="sheet-skill-node">
                    {skill}{idx < currentData.skills.length - 1 ? " • " : ""}
                  </span>
                ))}
              </div>
            </div>

            <div className="sheet-section experience">
              <h4>HIGHLIGHTED PROJECTS</h4>
              {currentData.projects.map((proj, idx) => (
                <div key={idx} className="sheet-project-item">
                  <span className="sheet-proj-title font-monospace">{proj.title}</span>
                  <p className="sheet-proj-desc">{proj.desc}</p>
                </div>
              ))}
            </div>

            <div className="sheet-section credentials">
              <h4>FEATURED CERTIFICATIONS</h4>
              <ul className="sheet-certs-list font-monospace">
                {currentData.certs.map((cert, idx) => (
                  <li key={idx}>✔ {cert}</li>
                ))}
              </ul>
            </div>

            <div className="sheet-divider"></div>

            {/* Dynamic Recruiter Cover Letter block */}
            <div className="sheet-section cover-letter">
              <h4>CUSTOMIZED COVER LETTER</h4>
              <pre className="font-sans sheet-letter-body">{currentData.coverLetter}</pre>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  useScrollReveal();

  return (
    <div className="app">
      <ThemeCustomizer />
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <ApiPlayground />
      <JwtSandbox />
      <DatabaseVisualizer />
      <RetroArcade />
      <Certifications />
      <ServerDashboard />
      <Education />
      <DynamicResume />
      <Contact />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default App;
