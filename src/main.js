// Portfolio Data - MS CS @ Syracuse & TCS Experience
const EXPERIENCE = [
  {
    role: "Systems Engineer",
    company: "Tata Consultancy Services (TCS)",
    location: "Mumbai/Hybrid",
    period: "July 2021 – July 2023",
    points: [
      "Designed and deployed microservices architecture on AWS reducing system latency by 40%",
      "Built secure REST APIs handling 2M+ daily requests with JWT and OAuth2 authentication",
      "Automated CI/CD pipelines using Jenkins and Docker cutting deployment time by 60%",
      "Led a team of 4 engineers delivering a cloud migration project 2 weeks ahead of schedule",
      "Implemented real-time data streaming with Apache Kafka processing 500K events/day"
    ]
  },
  {
    role: "MS Computer Science Student",
    company: "Syracuse University",
    location: "Syracuse, NY",
    period: "August 2023 – Present",
    points: [
      "Advanced coursework: Distributed Systems, Cloud Computing, Network Security, Algorithms",
      "Research Assistant focused on distributed consensus and sharding algorithms",
      "Teaching Assistant for graduate-level programming and system design courses",
      "Current GPA: 3.8/4.0"
    ]
  }
];

const FEATURED_PROJECTS = [
  {
    title: "CloudGuard",
    description: "Cloud security monitoring tool built with Python and AWS Lambda that detects anomalies and sends real-time alerts.",
    tags: ["Python", "AWS", "Terraform", "Security"],
    links: { github: "#", demo: "#" }
  },
  {
    title: "DistributeX",
    description: "A distributed key-value store implementing Raft consensus algorithm from scratch with strong consistency.",
    tags: ["Go", "gRPC", "Docker", "Raft"],
    links: { github: "#", demo: "#" }
  },
  {
    title: "SecureChat",
    description: "End-to-end encrypted messaging app with perfect forward secrecy and WebSocket-based real-time communication.",
    tags: ["Node.js", "WebSockets", "Cryptography"],
    links: { github: "#", demo: "#" }
  },
  {
    title: "StreamPipeline",
    description: "Real-time data pipeline processing 1M events/hour using Kafka and Spark for high-throughput telemetry.",
    tags: ["Kafka", "Apache Spark", "Python"],
    links: { github: "#", demo: "#" }
  }
];

const SKILLS = {
  "Languages": ["Python", "Java", "JavaScript", "TypeScript", "Go", "C++"],
  "Cloud": ["AWS", "GCP", "Azure", "Docker", "Kubernetes"],
  "Backend": ["Node.js", "Spring Boot", "FastAPI", "GraphQL", "REST"],
  "Databases": ["PostgreSQL", "MongoDB", "Redis", "Cassandra"],
  "Security": ["OAuth2", "JWT", "SSL/TLS", "OWASP", "PenTesting"],
  "Tools": ["Git", "CI/CD", "Terraform", "Jenkins", "Kafka"]
};

// --- Core Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initCreatureCursor();
  initParticles();
  renderSkills();
  renderExperience();
  renderFeaturedProjects();
  fetchGitHubRepos();
  initRevealAnimations();
  initContactForm();
  if (window.lucide) lucide.createIcons();
});

// --- Typewriter Effect ---
function initTypewriter() {
  const words = ["Software Engineer", "Distributed Systems Architect", "Cloud & Security Specialist", "Full Stack Developer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const element = document.getElementById('typewriter');

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
  }
  type();
}

// --- Custom Creature Cursor ---
function initCreatureCursor() {
  const canvas = document.getElementById('cursor-canvas');
  const ctx = canvas.getContext('2d');
  let mouse = { x: -100, y: -100 };
  let points = [];
  const segmentCount = 12;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Initialize trail points
  for (let i = 0; i < segmentCount; i++) {
    points.push({ x: mouse.x, y: mouse.y });
  }

  // Head of creature
  let headSize = 6;
  let targetHeadSize = 6;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Smooth head movement
    points[0].x += (mouse.x - points[0].x) * 0.25;
    points[0].y += (mouse.y - points[0].y) * 0.25;

    for (let i = 1; i < segmentCount; i++) {
        points[i].x += (points[i-1].x - points[i].x) * 0.35;
        points[i].y += (points[i-1].y - points[i].y) * 0.35;
    }

    // Creature trail
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < segmentCount; i++) {
        const xc = (points[i].x + points[i - 1].x) / 2;
        const yc = (points[i].y + points[i - 1].y) / 2;
        ctx.quadraticCurveTo(points[i-1].x, points[i-1].y, xc, yc);
    }
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.3)';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Body glow
    headSize += (targetHeadSize - headSize) * 0.2;
    ctx.beginPath();
    ctx.arc(points[0].x, points[0].y, headSize, 0, Math.PI * 2);
    ctx.fillStyle = '#00f3ff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00f3ff';
    ctx.fill();

    requestAnimationFrame(animate);
  }
  animate();

  // Hover reactions
  document.querySelectorAll('a, button, .skill-pill, .glass-card').forEach(el => {
    el.addEventListener('mouseenter', () => targetHeadSize = 12);
    el.addEventListener('mouseleave', () => targetHeadSize = 6);
  });
}

// --- Background Particles ---
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
    constructor() {
      this.init();
    }
    init() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = (Math.random() - 0.5) * 0.2;
      this.size = Math.random() * 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.fillStyle = 'rgba(0, 243, 255, 0.2)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for(let i=0; i<80; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Parallax logic relative to mouse
    const mouseX = (window.innerWidth / 2 - (window.lastMouseX || 0)) * 0.05;
    const mouseY = (window.innerHeight / 2 - (window.lastMouseY || 0)) * 0.05;

    particles.forEach(p => { 
        p.update(); 
        p.draw(mouseX, mouseY); 
    });
    requestAnimationFrame(animate);
  }
  
  document.addEventListener('mousemove', (e) => {
    window.lastMouseX = e.clientX;
    window.lastMouseY = e.clientY;
  });

  animate();
}

class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.init();
    }
    init() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = (Math.random() - 0.5) * 0.2;
      this.size = Math.random() * 2;
      this.depth = Math.random() * 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = this.canvas.width;
      if (this.x > this.canvas.width) this.x = 0;
      if (this.y < 0) this.y = this.canvas.height;
      if (this.y > this.canvas.height) this.y = 0;
    }
    draw(mx, my) {
      const ctx = this.canvas.getContext('2d');
      ctx.fillStyle = 'rgba(0, 243, 255, 0.2)';
      ctx.beginPath();
      // Apply depth-based parallax
      ctx.arc(this.x + mx * this.depth, this.y + my * this.depth, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
}

// --- Rendering Functions ---
function renderSkills() {
  const container = document.getElementById('skills-container');
  container.innerHTML = Object.entries(SKILLS).map(([cat, list]) => `
    <div class="skill-category reveal">
      <h4>${cat}</h4>
      <div class="skill-pills">
        ${list.map(s => `<span class="skill-pill">${s}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderExperience() {
  const container = document.getElementById('experience-timeline');
  container.innerHTML = EXPERIENCE.map(exp => `
    <div class="timeline-item reveal">
      <div class="timeline-dot"></div>
      <div class="timeline-content glass-card">
        <h3>${exp.role}</h3>
        <p class="company">${exp.company} | ${exp.period}</p>
        <ul class="points">
          ${exp.points.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

function renderFeaturedProjects() {
  const container = document.getElementById('featured-projects');
  container.innerHTML = FEATURED_PROJECTS.map(proj => `
    <div class="glass-card project-card reveal">
      <h3>${proj.title}</h3>
      <p>${proj.description}</p>
      <div class="tags">
        ${proj.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="project-actions">
        <a href="${proj.links.github}" class="btn-link"><i data-lucide="github"></i> Repository</a>
        <a href="${proj.links.demo}" class="btn-link"><i data-lucide="external-link"></i> Live Demo</a>
      </div>
    </div>
  `).join('');
}

async function fetchGitHubRepos() {
  const container = document.getElementById('github-projects');
  try {
    const res = await fetch('https://api.github.com/users/vinayvarma187/repos?sort=updated&per_page=6');
    const repos = await res.json();
    if (!Array.isArray(repos)) throw new Error('Invalid response');

    container.innerHTML = repos.map(repo => `
      <div class="glass-card project-card reveal">
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description available.'}</p>
        <div class="tags">
          <span class="tag">${repo.language || 'Code'}</span>
          <span class="tag"><i data-lucide="star"></i> ${repo.stargazers_count}</span>
        </div>
        <a href="${repo.html_url}" class="btn-link" target="_blank">View Repo &rarr;</a>
      </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
  } catch (err) {
    container.innerHTML = '<p class="error-msg">GitHub API limit reached. Showing offline projects instead.</p>';
  }
}

// --- Helper: Animations ---
function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.classList.contains('timeline-content')) {
            animateNumbers(entry.target);
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .timeline-content').forEach(el => observer.observe(el));
  
  // Mobile Nav Logic
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
        hamburger.classList.toggle('active');
    });
  }
}

function animateNumbers(container) {
  const numEls = container.querySelectorAll('li');
  numEls.forEach(li => {
    const text = li.innerText;
    const match = text.match(/(\d+)(%|M\+|K)/);
    if (match && !li.dataset.animated) {
        li.dataset.animated = "true";
        const target = parseInt(match[1]);
        const suffix = match[2];
        let current = 0;
        const duration = 2000;
        const start = performance.now();
        
        const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            current = Math.floor(progress * target);
            li.innerHTML = text.replace(match[0], `<span class="counter">${current}${suffix}</span>`);
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }
  });
}

// --- Helper: Contact Form ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  const sendBtn = document.getElementById('send-btn');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    createParticleBurst(sendBtn);
    sendBtn.innerText = "Message Sent! ✨";
    form.reset();
  });
}

function createParticleBurst(el) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '10000';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const rect = el.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    
    let particles = [];
    for (let i = 0; i < 30; i++) {
        particles.push({
            x: originX,
            y: originY,
            vx: (Math.random() - 0.5) * 15,
            vy: (Math.random() - 0.5) * 15,
            size: Math.random() * 4 + 2,
            alpha: 1,
            color: Math.random() > 0.5 ? '#00f3ff' : '#bc13fe'
        });
    }
    
    function animateBurst() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2; // gravity
            p.alpha -= 0.02;
            
            if (p.alpha > 0) {
                alive = true;
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        if (alive) {
            requestAnimationFrame(animateBurst);
        } else {
            document.body.removeChild(canvas);
        }
    }
    animateBurst();
}
