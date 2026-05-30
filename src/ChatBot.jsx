import React, { useState, useEffect, useRef } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Charan's AI Assistant. Ask me anything about Charan's skills, backend development experience, or featured projects! Or, click 'Start Mock Interview' below to test your own technical backend skills!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Gamified Mock Interview States
  const [interviewMode, setInterviewMode] = useState(false);
  const [interviewTrack, setInterviewTrack] = useState(null); // 'java' or 'rest'
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, interviewMode, currentQIdx, showFeedback]);

  const suggestions = [
    "Tell me about your Java credentials",
    "Show me your AI & GenAI certificates",
    "What ML models did you build for Entelika?",
    "Tell me about your LTTS internship"
  ];

  // Interview Questions Datastore
  const javaQuestions = [
    {
      q: "Which keyword in Java ensures that changes to a variable are visible to all threads immediately without caching?",
      opts: ["synchronized", "volatile", "transient", "final"],
      ans: 1, // volatile
      explain: "The volatile keyword guarantees that threads read/write variables directly from main memory rather than thread-local CPU caches, establishing thread-safe visibility."
    },
    {
      q: "What is the primary role of the Spring Boot Actuator in production microservices?",
      opts: [
        "Encrypt security tokens", 
        "Generate boilerplate JPA entities", 
        "Provide health, metric, and telemetry HTTP endpoints", 
        "Compile bytecode to native binary"
      ],
      ans: 2, // Telemetry HTTP endpoints
      explain: "Spring Boot Actuator exposes system health, database connection pool stats, and memory heap dumps through production-ready REST endpoints."
    },
    {
      q: "Which HTTP status code is most appropriate when a JWT token is signature-invalid or expired?",
      opts: ["400 Bad Request", "401 Unauthorized", "403 Forbidden", "500 Internal Server Error"],
      ans: 1, // 401 Unauthorized
      explain: "HTTP 401 Unauthorized must be returned when authentication fails or token validation (like expired/tampered JWT signatures) is absent or invalid."
    },
    {
      q: "In JPA/Hibernate, what is the default fetching strategy for @OneToMany annotations?",
      opts: ["Eager loading", "Lazy loading", "Batch loading", "Join loading"],
      ans: 1, // Lazy loading
      explain: "@OneToMany relationship annotations default to FetchType.LAZY to prevent performance-killing N+1 query loops when querying parent entities."
    }
  ];

  const restQuestions = [
    {
      q: "How does WebSocket differ from standard HTTP REST APIs?",
      opts: [
        "It uses UDP protocols exclusively", 
        "It provides full-duplex persistent bidirectional channels over a single TCP connection", 
        "It automatically encrypts the local storage data", 
        "It requires a custom browser extension"
      ],
      ans: 1, // bidirectional
      explain: "WebSockets establish a persistent TCP handshake session, allowing low-overhead, full-duplex bi-directional communications ideal for live multiplayer servers."
    },
    {
      q: "To reduce database roundtrips during multiple-table retrievals, which JPA feature is best utilized?",
      opts: ["Entity Graphs & JOIN FETCH", "Single Query Loops", "Auto-Generated ID keys", "Raw SQL Inserts"],
      ans: 0, // JOIN FETCH
      explain: "Using JPQL 'JOIN FETCH' or Entity Graphs instructs Hibernate to load child entities in a single SQL JOIN query, solving the N+1 SELECT performance issue."
    },
    {
      q: "Which hashing algorithm is standard for signing JWT tokens in modern Spring Security implementations?",
      opts: ["MD5", "SHA-1", "HMAC-SHA256 (HS256)", "AES-128"],
      ans: 2, // HS256
      explain: "HMAC with SHA-256 (HS256) is a high-speed symmetric cryptographic standard used widely to guarantee integrity and authenticity of JSON Web Tokens."
    },
    {
      q: "What is the primary benefit of deploying n8n node automation instead of writing raw custom cron scripts?",
      opts: [
        "Automatic code-level obfuscation",
        "Visual design pipelines, failure retries, webhook listeners, and zero-code logic integrations",
        "It runs directly inside the MySQL engine",
        "It removes the need for virtual servers"
      ],
      ans: 1, // Visual design pipelines etc.
      explain: "n8n offers visual pipeline logic nodes, instant REST webhook captures, robust automatic retries, and unified credentials management that speeds up automation."
    }
  ];

  const currentQuestions = interviewTrack === 'java' ? javaQuestions : restQuestions;

  const handleSend = async (text) => {
    const messageText = text || inputValue;
    if (!messageText.trim() || isLoading) return;

    if (!text) setInputValue('');

    const newMessages = [...messages, { role: 'user', content: messageText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) {
        throw new Error("Groq API Key is not set in environment variables.");
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `You are Charan's AI Assistant, a friendly and professional chatbot on Charan M U's portfolio website. Your goal is to represent Charan beautifully, answering questions about his skills, background, work experience, certifications, and projects.
              
              Charan M U is a Backend Engineer & AI Integrator.
              
              Key details about Charan:
              - Experience: Backend Java Intern at L&T Technology Services (LTTS) (Jan 2026 – May 2026), where he engineered secure REST APIs with Spring Boot, Hibernate, MySQL, JWT, optimized database latency by 30-40%, and integrated OpenAI/Anthropic APIs for intelligent error classification.
              - Education: B.E. in Computer Science Engineering from ATME College of Engineering, Mysore (2022 – 2026).
              - Technical Skills:
                * Languages: Java, Python, C
                * Backend: Spring Boot, REST APIs, Spring Security, JPA, Hibernate, JWT Auth, MVC, Java Streams
                * Databases: MySQL, PostgreSQL
                * AI & Tools: OpenAI APIs, Claude, n8n, Git, Maven, JUnit, GitHub Copilot
                * Concepts: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), System Design, API Design, Data Analysis
              - Certifications & Credentials (22 total):
                * AI & Generative AI: Generative AI & LLMs Foundations (Udemy, 2025), Intro to Large Language Models (IBM SkillsBuild, 2025), Intro to Artificial Intelligence (IBM/Coursera, Dec 2025), AI Fluency for Students (Anthropic, 2025), 15 Days Generative AI Program (Learnomate Technologies, April 2026), AI for Beginners (HP LIFE, Dec 2025).
                * Java & Backend: Fundamentals of Java Programming (Coursera, Dec 2025), Software Engineering Job Simulation (Forage, March 2026), Ansible Essentials for Network Engineers (Nov 2025).
                * Python & Data Science: Python Programming Mastery (Udemy, 2025), Python 101 for Data Science (IBM Cognitive Class, Nov 2025), Intro to Data Science (Cisco, Aug 2025), Microsoft Power BI (Self Learning) (Skill Course, Feb 2026), Data Science & Analytics (HP LIFE, Oct 2024), Intro to Data Science Job Simulation (Forage, Aug 2025), Data Science Job Simulation (Forage, Aug 2025), GenAI Powered Data Analytics Job Simulation (Forage, July 2025).
                * Cybersecurity & Agile: Intro to Cybersecurity Awareness (HP LIFE, Oct 2024), Cybersecurity Analyst Job Simulation (Forage, Aug 2025), Agile Project Management (HP LIFE, Oct 2024).
                * Internship & Publications: Machine Learning Internship (Entelika, Aug–Nov 2025 - built Credit Card Fraud Detection models), Research Publication on "A Survey on IoT Based Anti-Theft Flooring System" published in IJRPR Journal (2025).
              - Projects:
                * Java Quiz Portal (QuizAI): 20+ REST APIs on custom Java HTTP server, AI quiz generation, WebSocket multiplayer rooms, JWT/OTP authentication.
                * AI Workflow Automation: 8 n8n automation pipelines with WhatsApp Business API, serving 500-1000 concurrent users.
                * IoT Smart Flooring System: Sensor-based intrusion detection with real-time GSM/camera alerts. Peer-reviewed publication in IJRPR.
              - Contact: Email: jeevancharanmu@gmail.com, Phone: +91 7019301031, LinkedIn: linkedin.com/in/charan-m-u.
              
              Keep your answers brief, professional, enthusiastic, and direct. Do not say "Charan says...", act as his direct assistant representing him. If a user asks about general topics not related to Charan or coding/backend, politely guide them back to Charan's portfolio.`
            },
            ...newMessages.slice(-8)
          ],
          temperature: 0.7,
          max_tokens: 256
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from API");
      }

      const data = await response.json();
      const botReply = data.choices[0].message.content;
      setMessages((prev) => [...prev, { role: 'assistant', content: botReply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I encountered an issue connecting to my backend brain. But I can tell you Charan is an expert Java Backend Engineer and AI Integrator!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const startInterview = () => {
    setInterviewMode(true);
    setInterviewTrack(null);
    setCurrentQIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setShowFeedback(false);
  };

  const selectTrack = (track) => {
    setInterviewTrack(track);
    setCurrentQIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (optIdx) => {
    if (showFeedback) return;
    setSelectedOpt(optIdx);
    setShowFeedback(true);
    if (optIdx === currentQuestions[currentQIdx].ans) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedOpt(null);
    setShowFeedback(false);
    setCurrentQIdx((prev) => prev + 1);
  };

  const exitInterview = () => {
    setInterviewMode(false);
    setInterviewTrack(null);
  };

  const getInterviewTitle = () => {
    if (score === 4) return { rank: "🏆 Principal Backend Architect", offer: "HIRED! (Full-time JVM Specialist)", color: "#10b981" };
    if (score === 3) return { rank: "🚀 Senior Spring Boot Engineer", offer: "HIRED! (REST Microservices Expert)", color: "#3b82f6" };
    if (score === 2) return { rank: "💻 Associate API Developer", offer: "SHORTLISTED! (Solid Base Credentials)", color: "#f59e0b" };
    return { rank: "🌱 Backend Tech Intern", offer: "SHORTLISTED! (Great learning potential)", color: "#ef4444" };
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Action Button */}
      <button 
        className={`chatbot-btn ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with AI Assistant"
      >
        {isOpen ? (
          <span className="close-icon">&times;</span>
        ) : (
          <div className="chat-btn-pulse-content">
            <svg className="chat-icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
            </svg>
            <span className="chat-pulse-badge">Interview</span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title-area">
              <div className="avatar-dot-wrapper">
                <div className="chatbot-avatar">{interviewMode ? '🎓' : '🤖'}</div>
                <span className="online-dot"></span>
              </div>
              <div>
                <h3>{interviewMode ? 'Mock Tech Interview' : "Charan's AI Assistant"}</h3>
                <p>{interviewMode ? 'JVM & System Design Evaluator' : 'Powered by Groq Llama 3'}</p>
              </div>
            </div>
            {interviewMode ? (
              <button className="chatbot-exit-btn" onClick={exitInterview} title="Exit to General Chat">🚪 Exit</button>
            ) : (
              <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>&times;</button>
            )}
          </div>

          {/* Gamified Mock Interview Interface */}
          {interviewMode ? (
            <div className="chatbot-interview-content">
              {/* Track Selector Screen */}
              {interviewTrack === null ? (
                <div className="interview-intro-screen">
                  <h4>Choose Your Technical Evaluation Track</h4>
                  <p className="intro-sub">Recruiters can test their own Java Backend and REST system capabilities through this visual evaluation dashboard.</p>
                  
                  <div className="track-options">
                    <button className="track-btn track-java" onClick={() => selectTrack('java')}>
                      <span className="track-icon">☕</span>
                      <div className="track-details">
                        <h5>Java & Spring Boot Core</h5>
                        <p>Volatile memory, Actuator metrics, JPA fetching strategy, and REST error status codes.</p>
                      </div>
                    </button>

                    <button className="track-btn track-rest" onClick={() => selectTrack('rest')}>
                      <span className="track-icon">📡</span>
                      <div className="track-details">
                        <h5>REST APIs & System Design</h5>
                        <p>WebSockets bidirectional channels, N+1 query optimizations, JWT signatures, and n8n integrations.</p>
                      </div>
                    </button>
                  </div>
                  
                  <button className="btn-cancel-interview" onClick={exitInterview}>Return to General Chat</button>
                </div>
              ) : currentQIdx < currentQuestions.length ? (
                /* Question Session Screen */
                <div className="interview-question-screen">
                  <div className="interview-progress-bar">
                    <div className="progress-text">
                      <span>Track: <strong>{interviewTrack === 'java' ? 'Java Core' : 'REST APIs'}</strong></span>
                      <span>Question {currentQIdx + 1} of {currentQuestions.length}</span>
                    </div>
                    <div className="progress-track">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${((currentQIdx) / currentQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="question-text-box">
                    <p className="q-badge">QUESTION</p>
                    <p className="q-content">{currentQuestions[currentQIdx].q}</p>
                  </div>

                  <div className="options-layout">
                    {currentQuestions[currentQIdx].opts.map((opt, oIdx) => {
                      let btnClass = "";
                      if (showFeedback) {
                        if (oIdx === currentQuestions[currentQIdx].ans) {
                          btnClass = "opt-correct";
                        } else if (selectedOpt === oIdx) {
                          btnClass = "opt-incorrect";
                        } else {
                          btnClass = "opt-disabled";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          className={`opt-btn ${btnClass}`}
                          onClick={() => handleAnswerSelect(oIdx)}
                          disabled={showFeedback}
                        >
                          <span className="opt-letter">{['A', 'B', 'C', 'D'][oIdx]}</span>
                          <span className="opt-val">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showFeedback && (
                    <div className="answer-explanation-card animated-fade-up">
                      <h5 className={selectedOpt === currentQuestions[currentQIdx].ans ? "correct-header" : "wrong-header"}>
                        {selectedOpt === currentQuestions[currentQIdx].ans ? "✔ Correct Answer!" : "❌ Incorrect"}
                      </h5>
                      <p className="explanation-text">{currentQuestions[currentQIdx].explain}</p>
                      
                      <button className="btn-next-question" onClick={nextQuestion}>
                        {currentQIdx + 1 === currentQuestions.length ? 'View Results 🏆' : 'Next Question ➜'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Final Scorecard & Offer Letter Screen */
                <div className="interview-results-screen animated-fade-up">
                  <div className="results-badge">EVALUATION REPORT CARD</div>
                  
                  <div className="circular-score-hud">
                    <span className="score-num">{score}</span>
                    <span className="score-total">/{currentQuestions.length}</span>
                  </div>

                  <div className="hiring-offer-card" style={{ borderColor: getInterviewTitle().color }}>
                    <div className="offer-glow" style={{ backgroundColor: getInterviewTitle().color }}></div>
                    <h5>Hiring Recommendation:</h5>
                    <h3 style={{ color: getInterviewTitle().color }}>{getInterviewTitle().rank}</h3>
                    <p className="offer-status">{getInterviewTitle().offer}</p>
                    <p className="offer-note">"Charan's AI shadow has evaluated your system skills and issued a visual offer of employment!"</p>
                  </div>

                  <div className="results-actions">
                    <button className="btn-restart-interview" onClick={startInterview}>🔄 Try Again</button>
                    <button className="btn-close-interview" onClick={exitInterview}>🚪 General Chat</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Standard AI Chat Interface */
            <>
              <div className="chatbot-messages">
                {messages.map((msg, index) => (
                  <div key={index} className={`chatbot-msg-row ${msg.role}`}>
                    {msg.role === 'assistant' && <div className="bot-avatar-small">🤖</div>}
                    <div className="chatbot-msg-bubble">
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="chatbot-msg-row assistant">
                    <div className="bot-avatar-small">🤖</div>
                    <div className="chatbot-msg-bubble typing">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {messages.length === 1 && (
                <div className="chatbot-suggestions">
                  {suggestions.map((sug, i) => (
                    <button key={i} className="sug-btn" onClick={() => handleSend(sug)}>
                      {sug}
                    </button>
                  ))}
                </div>
              )}

              {/* Start Gamified Mock Interview Callout */}
              <div className="interview-callout-banner">
                <div className="callout-content">
                  <h5>📝 Interactive Tech Evaluator</h5>
                  <p>Test your Spring Boot and System API design skills.</p>
                </div>
                <button className="btn-callout-interview" onClick={startInterview}>Start ⚡</button>
              </div>

              <div className="chatbot-input-area">
                <input
                  type="text"
                  placeholder="Ask about skills, experience, projects..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                />
                <button 
                  className="chatbot-send-btn" 
                  onClick={() => handleSend()}
                  disabled={isLoading || !inputValue.trim()}
                  aria-label="Send message"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
