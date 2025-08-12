/* =============================================
   SHIVAM THAKUR PORTFOLIO — script.js
   Neural canvas · Typewriter · Scroll reveal
   Counter · Tilt · Magnetic · Cursor glow
   ============================================= */

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .svc-card, .proj-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.background = 'var(--violet)';
    cursorRing.style.width = '56px';
    cursorRing.style.height = '56px';
    cursorRing.style.borderColor = 'rgba(124,58,237,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursor.style.background = 'var(--cyan)';
    cursorRing.style.width = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.borderColor = 'rgba(0,212,255,0.5)';
  });
});

// ===== NEURAL NETWORK CANVAS =====
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
let nodes = [], W, H, animId;

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function createNodes(count = 60) {
  nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2
    });
  }
}

let mx = -999, my = -999;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function drawNeural() {
  ctx.clearRect(0, 0, W, H);

  // Draw connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[j].x - nodes[i].x;
      const dy = nodes[j].y - nodes[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const alpha = (1 - dist / 140) * 0.15;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
    // Mouse connection
    const mdx = mx - nodes[i].x;
    const mdy = my - nodes[i].y;
    const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
    if (mDist < 180) {
      const alpha = (1 - mDist / 180) * 0.4;
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(mx, my);
      ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }

  // Draw nodes
  nodes.forEach(n => {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,212,255,${n.opacity})`;
    ctx.fill();

    // Move
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;
  });

  animId = requestAnimationFrame(drawNeural);
}

resizeCanvas();
createNodes();
drawNeural();
window.addEventListener('resize', () => { resizeCanvas(); createNodes(); });

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== THEME TOGGLE =====
const html = document.getElementById('html-root');
const themeBtn = document.getElementById('theme-toggle');

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  // Redraw canvas with correct colors
  const isDark = theme === 'dark';
  document.documentElement.style.setProperty('--canvas-color', isDark ? '0,212,255' : '0,153,204');
}

// Init: saved > system
const saved = localStorage.getItem('theme');
applyTheme(saved || getSystemTheme());

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme') || getSystemTheme();
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Listen to system changes
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'light' : 'dark');
});

// ===== HAMBURGER =====
document.getElementById('hamburger').addEventListener('click', () => {
  const nl = document.querySelector('.nav-links');
  const isOpen = nl.style.display === 'flex';
  nl.style.display = isOpen ? 'none' : 'flex';
  nl.style.flexDirection = 'column';
  nl.style.position = 'absolute';
  nl.style.top = '70px';
  nl.style.right = '20px';
  nl.style.background = 'rgba(8,12,16,0.98)';
  nl.style.border = '1px solid rgba(0,212,255,0.15)';
  nl.style.borderRadius = '12px';
  nl.style.padding = '20px 28px';
  nl.style.gap = '18px';
  nl.style.zIndex = '999';
});

// ===== TYPEWRITER =====
const phrases = [
  'Building AI Systems that Think 🤖',
  'Automating Everything with Python ⚡',
  'OpenAI · Claude · Gemini API Expert 🧠',
  'Turning Ideas into Intelligent Apps 🚀',
  'AI Agents & RAG Pipelines 🔥',
];
let pi = 0, ci = 0, deleting = false, delay = 90;
const typedEl = document.getElementById('typed');

function typeLoop() {
  const current = phrases[pi];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++ci);
    if (ci === current.length) { deleting = true; delay = 2200; }
    else delay = 75;
  } else {
    typedEl.textContent = current.slice(0, --ci);
    delay = 35;
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
  }
  setTimeout(typeLoop, delay);
}
setTimeout(typeLoop, 800);

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Stagger children
      e.target.querySelectorAll && e.target.querySelectorAll('[data-stagger]').forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.1}s`;
      });
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCount(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!step.start) step.start = timestamp;
    const progress = Math.min((timestamp - step.start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.dataset.target);
      animateCount(e.target, target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ===== 3D CARD TILT =====
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -10;
    const rotY = ((x - cx) / cx) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    card.style.boxShadow = `${-rotY * 2}px ${rotX * 2}px 40px rgba(124,58,237,0.3)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    card.style.boxShadow = '';
    card.style.transition = 'transform 0.6s ease, box-shadow 0.6s ease';
    setTimeout(() => { card.style.transition = ''; }, 600);
  });
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
    el.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
    setTimeout(() => { el.style.transition = ''; }, 500);
  });
});

// ===== CONTACT FORM =====
function handleForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = '#28c840';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.style.background = '';
    btn.disabled = false;
    document.getElementById('contact-form').reset();
  }, 3000);
}

// ===== SMOOTH SCROLL FOR NAV =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
    // Close mobile menu if open
    const nl = document.querySelector('.nav-links');
    if (nl && window.innerWidth < 900) nl.style.display = 'none';
  });
});

// ===== STAGGER REVEAL FOR GRIDS =====
document.querySelectorAll('.services-grid, .projects-grid').forEach(grid => {
  const cards = grid.querySelectorAll('.svc-card, .proj-card');
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, i * 120);
      });
      obs.disconnect();
    }
  }, { threshold: 0.1 });
  obs.observe(grid);
});

// ===== HERO PARALLAX =====
window.addEventListener('scroll', () => {
  const heroInner = document.querySelector('.hero-inner');
  const heroGlow = document.querySelector('.hero-glow');
  if (heroInner && window.scrollY < window.innerHeight) {
    heroInner.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    heroInner.style.opacity = 1 - (window.scrollY / window.innerHeight) * 1.5;
    if (heroGlow) heroGlow.style.transform = `translate(-50%,-50%) scale(${1 + window.scrollY * 0.0005})`;
  }
});

// ===== FLOATING CODE PARTICLES =====
const codeSnippets = ['const ai =','import openai','def train():','await llm.run','model.predict','<neural />','{ mind: true }','=> intelligence','python -m ai','llm.chat([...])'];
function spawnParticle() {
  const el = document.createElement('span');
  el.className = 'code-float';
  el.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.animationDuration = (6 + Math.random() * 6) + 's';
  el.style.animationDelay = Math.random() * 2 + 's';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 12000);
}
setInterval(spawnParticle, 3000);
spawnParticle();

console.log('%c🤖 Shivam Thakur | AI Developer', 'color:#00d4ff;font-size:16px;font-weight:bold;font-family:monospace');
console.log('%chttps://github.com/Shiva07IN', 'color:#7c3aed;font-family:monospace');
