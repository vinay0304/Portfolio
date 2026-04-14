// Portfolio Data
const EXPERIENCE = [
  {
    role: "Software Engineer",
    company: "Cisco",
    location: "San Jose, CA",
    period: "Sept 2024 – Present",
    points: [
      "Engineered distributed data pipelines using AWS EMR and Spark to process 1.2TB daily telemetry data",
      "Implemented agentic AI workflows reducing false positive detection time by 15%",
      "Architected serverless solutions (AWS Lambda, SQS, Fargate) cutting manual overhead by 25%",
      "Led architecture and code reviews for mission-critical backend services (Java, Python) at 99.9% uptime"
    ]
  },
  {
    role: "Associate Software Engineer",
    company: "Humana (via TCS)",
    location: "Hyderabad, India",
    period: "Aug 2021 – Aug 2022",
    points: [
      "Built microservices for healthcare data management on SAP BTP processing 15,000+ clinical records",
      "Optimized SQL and distributed data layers, reducing latency to under 300ms",
      "Full SDLC contributions across code reviews, builds, and cloud-native scaling"
    ]
  }
];

const FEATURED_PROJECTS = [
  {
    title: "Distributed File Storage System",
    description: "Fault-tolerant distributed key-value store with sharding and replication via consistent hashing. Handles 500+ concurrent requests.",
    tags: ["Go", "gRPC", "Docker", "Hashing"],
    link: "#"
  },
  {
    title: "Machine Learning Course Predictor",
    description: "Recommends grad courses from student history with 82% accuracy using Scikit-learn and Pandas. Processed 10,000+ records.",
    tags: ["Python", "Scikit-learn", "Pandas"],
    link: "#"
  },
  {
    title: "Real-Time Sentiment Analysis Engine",
    description: "Live tweet streaming pipeline via Kafka and NLP classification for real-time trend tracking and dashboarding.",
    tags: ["Python", "NLP", "Twitter API", "Kafka"],
    link: "#"
  }
];

const SKILLS = {
  "Languages": ["Java", "Python", "C++", "C#", "SQL", "Go", "JavaScript", "TypeScript", "Scala"],
  "Cloud & Infra": ["AWS", "Spark", "Docker", "Terraform", "IAM", "Linux"],
  "Tools": ["Git", "Jenkins", "CI/CD", "Splunk", "DynaTrace", "Agile"],
  "Concepts": ["Distributed Systems", "Microservices", "DSA", "System Design"]
};

const EDUCATION = [
  {
    school: "University of Maryland, Baltimore County",
    degree: "Master of Professional Studies in Software Engineering",
    period: "Aug 2022 – Jun 2024",
    coursework: "Advanced Algorithms, Distributed Systems, Cloud Security, Data Engineering"
  }
];

const CERTIFICATIONS = [
  { name: "AWS Certified Developer Associate", icon: "shield-check" },
  { name: "SAP Certified Development Associate (BTP Suite)", icon: "award" },
  { name: "Oracle Certified Professional (Java SE Programmer)", icon: "code" },
  { name: "Google Cloud Associate Engineer", icon: "cloud" }
];

// --- Core Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initParticles();
  renderExperience();
  renderFeaturedProjects();
  fetchGitHubRepos();
  renderSkills();
  renderEducation();
  renderCertifications();
  initScrollAnimations();
  if (window.lucide) lucide.createIcons();
});

// --- Typewriter Effect ---
function initTypewriter() {
  const words = ["Software Engineer", "Distributed Systems Builder", "Security-Focused Developer", "Cloud Architect"];
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

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Wait at end
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

// --- Particle/Constellation Effect ---
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 100;
  const connectionDistance = 150;

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', setCanvasSize);
  setCanvasSize();

  class Particle {
    constructor() {
      this.init();
    }
    init() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 243, 255, 0.5)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(188, 19, 254, ${1 - distance / connectionDistance})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// --- Render Functions ---
function renderExperience() {
  const container = document.getElementById('experience-timeline');
  container.innerHTML = EXPERIENCE.map(exp => `
    <div class="timeline-item reveal">
      <div class="timeline-dot"></div>
      <div class="glass-card exp-card">
        <h3>${exp.role}</h3>
        <p class="company">${exp.company} | ${exp.location} | ${exp.period}</p>
        <ul>
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
      <a href="${proj.link}" class="btn-link">View Details &rarr;</a>
    </div>
  `).join('');
}

async function fetchGitHubRepos() {
  const container = document.getElementById('github-projects');
  try {
    const res = await fetch('https://api.github.com/users/vinay0304/repos?sort=updated&per_page=6');
    const repos = await res.json();
    
    container.innerHTML = repos.map(repo => `
      <div class="glass-card project-card reveal">
        <div class="repo-header">
           <h3>${repo.name}</h3>
           <span class="stars"><i data-lucide="star"></i> ${repo.stargazers_count}</span>
        </div>
        <p>${repo.description || 'No description available.'}</p>
        <div class="tags">
          <span class="tag language">${repo.language || 'Code'}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" class="btn-link">GitHub <i data-lucide="external-link"></i></a>
      </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
  } catch (err) {
    container.innerHTML = '<p class="error">Failed to load repositories. Please check back later.</p>';
  }
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  container.innerHTML = Object.entries(SKILLS).map(([cat, list]) => `
    <div class="skill-category reveal">
      <h3>${cat}</h3>
      <div class="skill-pills">
        ${list.map(s => `<span class="skill-pill">${s}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderEducation() {
  const container = document.getElementById('education-container');
  container.innerHTML = EDUCATION.map(edu => `
    <div class="glass-card education-card reveal">
      <h3>${edu.school}</h3>
      <p class="degree">${edu.degree}</p>
      <p class="period">${edu.period}</p>
      <p class="coursework"><strong>Key Coursework:</strong> ${edu.coursework}</p>
    </div>
  `).join('');
}

function renderCertifications() {
  const container = document.getElementById('certs-container');
  container.innerHTML = CERTIFICATIONS.map(cert => `
    <div class="glass-card cert-card reveal">
      <i data-lucide="${cert.icon}" class="cert-icon"></i>
      <h3>${cert.name}</h3>
    </div>
  `).join('');
}

// --- Animation & Navigation ---
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        updateNav(entry.target.id);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section, .reveal').forEach(el => observer.observe(el));

  // Back to Top functionality
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function updateNav(sectionId) {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.classList.add('active');
    }
  });
}
