import React, { useState, useEffect, useRef } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Charan's AI Assistant. Ask me anything about Charan's skills, backend development experience, or featured projects!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const suggestions = [
    "What are your core skills?",
    "Tell me about your LTTS internship",
    "What is the Java Quiz Portal?"
  ];

  const handleSend = async (text) => {
    const messageText = text || inputValue;
    if (!messageText.trim() || isLoading) return;

    // Clear input
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
              content: `You are Charan's AI Assistant, a friendly and professional chatbot on Charan M U's portfolio website. Your goal is to represent Charan beautifully, answering questions about his skills, background, work experience, and projects.
              
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
              - Projects:
                * Java Quiz Portal: 20+ REST APIs on custom Java HTTP server, AI quiz generation, WebSocket multiplayer rooms, JWT/OTP authentication.
                * AI Workflow Automation: 8 n8n automation pipelines with WhatsApp Business API, serving 500-1000 concurrent users.
                * IoT Smart Flooring System: Sensor-based intrusion detection with real-time GSM/camera alerts. Peer-reviewed publication in IJRPR.
              - Contact: Email: jeevancharanmu@gmail.com, Phone: +91 7019301031, LinkedIn: linkedin.com/in/charan-m-u.
              
              Keep your answers brief, professional, enthusiastic, and direct. Do not say "Charan says...", act as his direct assistant representing him. If a user asks about general topics not related to Charan or coding/backend, politely guide them back to Charan's portfolio.`
            },
            ...newMessages.slice(-8) // Send up to last 8 messages for context
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
          content: "Sorry, I encountered an issue connecting to my backend brain. Please try again in a bit or contact Charan directly via email!"
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
          <svg className="chat-icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title-area">
              <div className="avatar-dot-wrapper">
                <div className="chatbot-avatar">🤖</div>
                <span className="online-dot"></span>
              </div>
              <div>
                <h3>Charan's AI Assistant</h3>
                <p>Powered by Groq Llama 3</p>
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>&times;</button>
          </div>

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
        </div>
      )}
    </div>
  );
};

export default ChatBot;
