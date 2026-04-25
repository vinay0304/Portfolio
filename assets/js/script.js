// ============================================================
//  VS Code Portfolio — script.js
// ============================================================

const SECTIONS = ['about', 'about-detail', 'experience', 'skills', 'projects', 'contact'];
const FILE_MAP = {
  'about':        'about_me.ts',
  'about-detail': 'about_me.ts',
  'experience':   'experience.ts',
  'skills':       'skills.ts',
  'projects':     'projects.ts',
  'contact':      'contact.ts',
};

// ── Single reference to scroll container ──
const editorScroll = document.getElementById('editor-scroll');

// ============================================================
//  TYPING ANIMATION
// ============================================================
const PHRASES = ['Software Engineer', 'Distributed Systems', 'Cloud-Native · AWS', 'C# · Java · Python', 'Open to Opportunities'];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-role');

function typeLoop() {
  if (!typedEl) return;
  const phrase = PHRASES[phraseIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++charIdx);
    if (charIdx === phrase.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    typedEl.textContent = phrase.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % PHRASES.length; }
  }
  setTimeout(typeLoop, deleting ? 45 : 90);
}
typeLoop();

// ============================================================
//  SCROLL-REVEAL
//  Hero (.reveal inside section-hero) fires immediately on load.
//  Everything else fires when scrolled into view.
// ============================================================
function triggerReveal(el) {
  el.classList.add('visible');
}

// Immediately show anything already in the viewport
function checkInitialReveal() {
  const scrollRect = editorScroll.getBoundingClientRect();
  document.querySelectorAll('.reveal, .reveal-children').forEach(el => {
    const r = el.getBoundingClientRect();
    // element is within the scroll container viewport
    if (r.top < scrollRect.bottom && r.bottom > scrollRect.top) {
      triggerReveal(el);
    }
  });
}

// Observer for elements that come into view on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      triggerReveal(e.target);
      observer.unobserve(e.target);
    }
  });
}, { root: editorScroll, threshold: 0.05 });

document.querySelectorAll('.reveal, .reveal-children').forEach(el => observer.observe(el));

// Run initial check after a short paint delay
setTimeout(checkInitialReveal, 80);

// ============================================================
//  ACTIVE SECTION (scroll-based)
// ============================================================
function getActiveSection() {
  let current = SECTIONS[0];
  for (const id of SECTIONS) {
    const el = document.getElementById('section-' + id);
    if (el && editorScroll.scrollTop >= el.offsetTop - 120) current = id;
  }
  return current;
}

function setActiveUI(name) {
  const tabName = (name === 'about-detail') ? 'about' : name;
  document.querySelectorAll('.tab').forEach(t =>
    t.classList.toggle('active', t.dataset.section === tabName));
  document.querySelectorAll('.sidebar-nav').forEach(f =>
    f.classList.toggle('active-file', f.dataset.section === tabName));
  document.querySelectorAll('#open-editors-body .tree-file').forEach(f =>
    f.classList.toggle('active-file', f.dataset.section === tabName));
  const bc = document.getElementById('bc-file');
  if (bc) bc.textContent = FILE_MAP[name] || name;
}

editorScroll.addEventListener('scroll', () => {
  setActiveUI(getActiveSection());
}, { passive: true });

// ============================================================
//  NAVIGATION
// ============================================================
function scrollToSection(name) {
  const el = document.getElementById('section-' + name);
  if (!el) return;
  editorScroll.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', e => {
    if (e.target.closest('.tab-close')) return;
    scrollToSection(tab.dataset.section);
  });
});

document.querySelectorAll('.tab-close').forEach(btn => {
  btn.addEventListener('click', e => { e.stopPropagation(); scrollToSection('about'); });
});

document.querySelectorAll('.sidebar-nav').forEach(item =>
  item.addEventListener('click', () => scrollToSection(item.dataset.section)));

document.querySelectorAll('.scroll-to').forEach(btn =>
  btn.addEventListener('click', e => { e.preventDefault(); scrollToSection(btn.dataset.target); }));

// ============================================================
//  SIDEBAR COLLAPSE
// ============================================================
document.querySelectorAll('.tree-section-header[data-target]').forEach(header => {
  header.addEventListener('click', () => {
    const body = document.getElementById(header.dataset.target);
    if (!body) return;
    const hidden = body.classList.toggle('hidden');
    header.classList.toggle('collapsed', hidden);
  });
});

// ============================================================
//  FOLDER TOGGLE
// ============================================================
document.querySelectorAll('.tree-folder-row').forEach(row => {
  row.addEventListener('click', () => {
    const children = document.getElementById(row.dataset.target);
    if (!children) return;
    const isOpen = row.classList.toggle('open');
    children.classList.toggle('hidden', !isOpen);
    const chevron = row.querySelector('.folder-chevron');
    const icon = row.querySelector('.icon-folder');
    if (chevron) { chevron.classList.toggle('fa-chevron-down', isOpen); chevron.classList.toggle('fa-chevron-right', !isOpen); }
    if (icon)    { icon.classList.toggle('fa-folder-open', isOpen); icon.classList.toggle('fa-folder', !isOpen); }
  });
});

// ============================================================
//  SKILLS FILTER
// ============================================================
document.querySelectorAll('.sk-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.sk-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.cat;
    document.querySelectorAll('.sk-card').forEach(card =>
      card.classList.toggle('hidden', cat !== 'all' && card.dataset.cat !== cat));
  });
});

// ============================================================
//  CONTACT FORM
// ============================================================
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sent ✓';
    btn.style.background = '#4ec9b0';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; form.reset(); }, 3000);
  });
}

// ============================================================
//  LINE NUMBERS
// ============================================================
function buildLineNumbers() {
  const content = document.querySelector('.editor-content');
  const container = document.getElementById('line-numbers');
  if (!content || !container) return;
  const count = Math.ceil(content.scrollHeight / 21.45);
  let html = '';
  for (let i = 1; i <= count; i++) html += '<div>' + i + '</div>';
  container.innerHTML = html;
}
setTimeout(buildLineNumbers, 300);
window.addEventListener('resize', buildLineNumbers);

// ============================================================
//  INIT
// ============================================================
setActiveUI('about');
