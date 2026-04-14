// --- GLOW FOX ENGINE (Canvas 2D) ---
class GlowFox {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.lerpFactor = 0.08;
    this.sparks = [];
    this.idleTime = 0;
    this.isIdle = false;
    this.size = 80;
    this.targetSize = 80;
    this.activeSection = null;
    this.patrolProgress = 0;
    this.state = 'following'; // 'following', 'patrolling', 'idle'

    this.init();
  }

  init() {
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.idleTime = 0;
      this.state = 'following';
    });
  }

  update() {
    this.idleTime++;
    if (this.idleTime > 120 && this.state !== 'patrolling') {
      this.state = 'patrolling';
      this.patrolProgress = 0;
    }

    if (this.state === 'following') {
      this.pos.x += (this.mouse.x - this.pos.x) * this.lerpFactor;
      this.pos.y += (this.mouse.y - this.pos.y) * this.lerpFactor;
    } else if (this.state === 'patrolling' && this.activeSection) {
      this.updatePatrol();
    }

    // Size easing
    this.size += (this.targetSize - this.size) * 0.1;

    // Sparks
    if (Math.random() > 0.4) {
      this.sparks.push(new Spark(this.pos.x, this.pos.y));
    }
    this.sparks = this.sparks.filter(s => s.update());
  }

  updatePatrol() {
    const rect = this.activeSection.getBoundingClientRect();
    // Safety check if section is too small
    if (rect.width < 100) return;

    this.patrolProgress += 0.005;
    const perimeter = (rect.width + rect.height) * 2;
    const progress = this.patrolProgress % 1;
    
    // Simple rectangular walk logic
    const x = rect.left;
    const y = rect.top;
    const w = rect.width;
    const h = rect.height;

    let targetX, targetY;
    if (progress < 0.25) { // Top
        targetX = x + (progress / 0.25) * w;
        targetY = y;
    } else if (progress < 0.5) { // Right
        targetX = x + w;
        targetY = y + ((progress - 0.25) / 0.25) * h;
    } else if (progress < 0.75) { // Bottom
        targetX = x + w - ((progress - 0.5) / 0.25) * w;
        targetY = y + h;
    } else { // Left
        targetX = x;
        targetY = y + h - ((progress - 0.75) / 0.25) * h;
    }

    this.pos.x += (targetX - this.pos.x) * 0.05;
    this.pos.y += (targetY - this.pos.y) * 0.05;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw Sparks
    this.sparks.forEach(s => s.draw(this.ctx));

    const { x, y } = this.pos;
    const s = this.size;

    this.ctx.save();
    this.ctx.translate(x, y);
    
    // Body (Glow)
    const grd = this.ctx.createRadialGradient(0, 0, 0, 0, 0, s);
    grd.addColorStop(0, 'rgba(245, 158, 11, 0.4)');
    grd.addColorStop(1, 'rgba(245, 158, 11, 0)');
    this.ctx.fillStyle = grd;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, s, 0, Math.PI * 2);
    this.ctx.fill();

    // Stylized Fox Shape
    this.ctx.fillStyle = '#F59E0B';
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = '#F59E0B';
    
    // Ears
    this.ctx.beginPath();
    this.ctx.moveTo(-15, -10);
    this.ctx.lineTo(-20, -30);
    this.ctx.lineTo(-5, -15);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(15, -10);
    this.ctx.lineTo(20, -30);
    this.ctx.lineTo(5, -15);
    this.ctx.fill();

    // Face
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, 20, 15, 0, 0, Math.PI * 2);
    this.ctx.fill();

    // Eyes
    this.ctx.fillStyle = '#fff';
    this.ctx.beginPath();
    this.ctx.arc(-8, -2, 2, 0, Math.PI * 2);
    this.ctx.arc(8, -2, 2, 0, Math.PI * 2);
    this.ctx.fill();

    // Tail (Bushy)
    this.ctx.fillStyle = '#F59E0B';
    this.ctx.beginPath();
    this.ctx.ellipse(30, 10, 25, 12, Math.PI/4, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();
  }
}

class Spark {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.alpha = 1;
    this.size = Math.random() * 3;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.02;
    return this.alpha > 0;
  }
  draw(ctx) {
    ctx.fillStyle = `rgba(245, 158, 11, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// --- LIQUID GLASS EFFECT (Spring Physics) ---
class LiquidGlass {
  constructor() {
    this.el = document.getElementById('liquid-glass-cursor');
    this.pos = { x: 0, y: 0 };
    this.current = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };
    this.k = 0.15; // spring constant
    this.d = 0.7; // damping
    this.isVisible = false;

    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.pos.x = e.clientX;
      this.pos.y = e.clientY;
    });

    const targetSelectors = 'h1, h2, h3, p, li, span.tags span';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(targetSelectors)) {
        this.isVisible = true;
        this.el.style.opacity = '1';
        this.el.style.transform = `translate(-50%, -50%) scale(1)`;
      } else {
        this.isVisible = false;
        this.el.style.opacity = '0';
        this.el.style.transform = `translate(-50%, -50%) scale(0)`;
      }
    });
  }

  update() {
    // Spring physics update
    const ax = (this.pos.x - this.current.x) * this.k;
    const ay = (this.pos.y - this.current.y) * this.k;
    this.vel.x = (this.vel.x + ax) * this.d;
    this.vel.y = (this.vel.y + ay) * this.d;
    this.current.x += this.vel.x;
    this.current.y += this.vel.y;

    this.el.style.left = `${this.current.x}px`;
    this.el.style.top = `${this.current.y}px`;
  }
}

// --- CONSTELLATION BACKGROUND ---
class Constellation {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.count = 80;
    this.mouse = { x: 0, y: 0 };
    
    this.init();
  }

  init() {
    for (let i = 0; i < this.count; i++) {
        this.particles.push({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }
    
    document.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    });
  }

  update() {
    this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Mouse reaction
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
            p.x += dx * 0.01;
            p.y += dy * 0.01;
        }

        if (p.x < 0) p.x = this.canvas.width;
        if (p.x > this.canvas.width) p.x = 0;
        if (p.y < 0) p.y = this.canvas.height;
        if (p.y > this.canvas.height) p.y = 0;
    });
  }

  draw() {
    this.ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
    this.particles.forEach(p => {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
    });

    for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
            const dx = this.particles[i].x - this.particles[j].x;
            const dy = this.particles[i].y - this.particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                this.ctx.strokeStyle = `rgba(59, 130, 246, ${1 - dist / 120})`;
                this.ctx.lineWidth = 0.5;
                this.ctx.stroke();
            }
        }
    }
  }
}

// --- CORE SYSTEM: MAIN ---
document.addEventListener('DOMContentLoaded', () => {
  const foxCanvas = document.getElementById('cursor-canvas-overlay');
  const fox = new GlowFox(foxCanvas);
  const glass = new LiquidGlass();
  const constellation = new Constellation(foxCanvas); // Reuse overlay canvas or separate if collision needed

  // Animation Loop
  function loop() {
    // We clear fox ctx inside its draw, so we need to coordinate
    fox.update();
    constellation.update();
    
    fox.draw(); // Fox draw clears the canvas
    constellation.draw();
    
    glass.update();
    requestAnimationFrame(loop);
  }
  loop();

  initInteractions(fox);
  initScrollAnimations(fox);
});

function initInteractions(fox) {
  // Typewriter
  const words = ["Software Engineer", "Distributed Systems Architect", "Cloud & Security Specialist"];
  let wordIndex = 0, charIndex = 0, isDeleting = false;
  const element = document.getElementById('typewriter');

  function type() {
    const current = words[wordIndex];
    element.textContent = isDeleting ? current.substring(0, charIndex--) : current.substring(0, charIndex++);
    
    let speed = 100;
    if (!isDeleting && charIndex === current.length + 1) { speed = 2000; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { speed = 500; isDeleting = false; wordIndex = (wordIndex + 1) % words.length; }
    
    setTimeout(type, speed);
  }
  type();

  // Hover Reactions for Fox
  document.querySelectorAll('a, button, .glass-card').forEach(el => {
    el.addEventListener('mouseenter', () => fox.targetSize = 110);
    el.addEventListener('mouseleave', () => fox.targetSize = 80);
  });

  // Particle Burst on Submit
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('submit-btn');
      btn.textContent = "Sent! ✨";
      // Burst implementation using fox sparks
      for (let i = 0; i < 50; i++) fox.sparks.push(new Spark(fox.pos.x, fox.pos.y));
    });
  }
  
  if (window.lucide) lucide.createIcons();
}

function initScrollAnimations(fox) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        fox.activeSection = entry.target.closest('section');
        updateNav(fox.activeSection.id);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.reveal, .stagger-in, section').forEach(el => observer.observe(el));
}

function updateNav(id) {
  const links = document.querySelectorAll('.nav-links a');
  const indicator = document.getElementById('nav-indicator');
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
        const rect = link.getBoundingClientRect();
        const navRect = link.closest('.navbar').getBoundingClientRect();
        indicator.style.width = `${rect.width}px`;
        indicator.style.left = `${rect.left - navRect.left}px`;
    }
  });
}
