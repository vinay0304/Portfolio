# Vinay Varma Pericherla - Professional Portfolio

A stunning, interactive, and cinematic personal portfolio website built for a Software Engineer specializing in distributed systems, cloud architecture, and security.

![Portfolio Preview](public/preview.png) *(Note: Add a screenshot here and name it preview.png)*

## 🚀 Vision
The goal of this portfolio is to provide an immersive, high-performance experience that showcases technical depth through futuristic aesthetics, real-time data integration, and smooth interactive elements.

## 🛠️ Tech Stack
- **Framework**: [Vite](https://vitejs.dev/) (Vanilla JS / ES6+)
- **Styling**: Vanilla CSS (Custom HSL System, Glassmorphism)
- **Icons**: [Lucide](https://lucide.dev/)
- **Dynamic Content**: GitHub REST API
- **Animations**: Canvas Particle Engine, Intersection Observer API

## ✨ Key Features
- **Constellation Background**: A custom-coded particle system that generates a dynamic, interactive web of connections.
- **Terminal Typewriter**: A typewriter effect on the hero section cycling through professional roles.
- **Dynamic Projects**: Auto-populates your latest GitHub repositories alongside hardcoded featured projects.
- **Experience Timeline**: A vertical interactive timeline of your professional career.
- **Glassmorphism**: Modern UI design with frosted glass cards and vibrant neon glows.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- npm (installed with Node)

### Local Development
1. **Clone or Download**: Copy the folder to your machine.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run Dev Server**:
   ```bash
   npm run dev
   ```
4. **Build for Production**:
   ```bash
   npm run build
   ```

## 🌐 Deployment

This project is built with Vite, making it extremely easy to deploy to modern platforms:

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Follow the prompts — it will auto-detect Vite settings.

### Option 2: Netlify
1. Drag and drop the `dist` folder (after running `npm run build`) onto the Netlify dashboard.
2. Or connect your GitHub repo and set the build command to `npm run build` and directory to `dist`.

### Option 3: GitHub Pages
1. Install the `gh-pages` package: `npm install gh-pages --save-dev`
2. Update `package.json` with a `"deploy": "gh-pages -d dist"` script.
3. Run `npm run build` then `npm run deploy`.

## 📝 Customization
- **Experience & Projects**: Edit the data constants at the top of `src/main.js`.
- **Theme Colors**: Adjust the HSL variables in `:root` inside `src/style.css`.
- **GitHub Username**: Change the username in the `fetchGitHubRepos()` function in `src/main.js`.

---
Built with Passion by Antigravity AI.
