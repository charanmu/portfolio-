# 🚀 Charan M U — Premium Developer Portfolio

A modern, ultra-high-performance portfolio built with **React**, **Vite**, **Three.js**, and integrated with a high-speed **Groq AI Chatbot**. It is designed with a premium, sleek dark glassmorphism theme, smooth WebGL animations, and responsive layout for all screens.

---

## ✨ Features

- **🌐 Interactive 3D WebGL Canvas**: A beautiful rotating Torus Knot hero graphic customized with custom physical wireframe glow, ambient lights, and floating starfield dust particles.
- **🤖 Mini AI Assistant**: A custom-built floating chatbot powered by **Groq Llama 3** that dynamically answers queries about Charan's skills, experience, and projects.
- **🎨 Premium Dark Theme**: Clean glassmorphism styling utilizing custom CSS variables, layout transitions, and high-tech teal accents (`#64ffda`).
- **📱 Fluid & Responsive**: Fully responsive grid systems tailored for seamless viewing from desktop screens down to mobile devices.
- **🎬 Scroll Reveal Effects**: Utilizes native browser Intersection Observer API to animate cards as they slide into view.

---

## 🛠️ Tech Stack

- **Frontend Core:** React 18, HTML5, Vanilla CSS3 (highly custom variables & glassmorphism)
- **3D Graphics:** Three.js (WebGL rendering)
- **Build System:** Vite (fast hot-reloading)
- **AI Brain:** Groq API / Llama 3.3 70B
- **Animation:** CSS keyframes & Web Intersection Observer

---

## 🚀 Quick Start

### 1. Prerequisite
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Set Up Environment Variables
Create a `.env` file in the root directory:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### 3. Install & Start Dev Server
```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```
Open **http://localhost:5173** to preview your site.

---

## 📦 Build for Production

```bash
npm run build
```
The compiled, ready-to-deploy static assets will be created in the `dist/` directory.

---

## 🌐 Deployment

This application is ready for instant deployment to cloud edge platforms:
- **Vercel**: Import directly via GitHub integration and specify `VITE_GROQ_API_KEY` under Project Environment Variables.
- **Netlify**: Connect your GitHub repository, specify build command `npm run build` and directory `dist`.
