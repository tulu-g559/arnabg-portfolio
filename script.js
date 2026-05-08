/* ─── FORM SUBMISSION LOGIC (Google Forms) ─── */
let submitted = false;

function showSuccess() {
  if (submitted) {
    const btn = document.getElementById('submit-btn');
    const success = document.getElementById('success-msg');
    const form = document.getElementById('google-form');

    if (btn && success && form) {
      btn.style.display = 'none';
      success.style.display = 'block';

      // Reset the form fields after 5 seconds to allow new messages
      setTimeout(() => {
        form.reset();
        btn.style.display = 'inline-flex';
        success.style.display = 'none';
        submitted = false;
      }, 5000);
    }
  }
}

/* ─── THEME TOGGLE ─── */
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
let dark = true;

function applyTheme(isDark) {
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeBtn.textContent = isDark ? '☀' : '☾';
  
  // Update star colors based on theme
  if (typeof ctx !== 'undefined' && ctx) {
    ctx.fillStyle = isDark ? '#FFFFFF' : '#000000';
  }
}

themeBtn.addEventListener('click', () => {
  dark = !dark; 
  applyTheme(dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
});

if (localStorage.getItem('theme')) { 
  dark = localStorage.getItem('theme') === 'dark'; 
  applyTheme(dark); 
}

/* ─── TYPING EFFECT ─── */
const roles = ['AI Engineer', 'Full-Stack Developer', 'Agentic AI Builder', 'Open Source Contributor'];
let ri = 0, ci = 0, deleting = false;
const el = document.getElementById('typingText');

function type() {
  const cur = roles[ri];
  if (!deleting && ci < cur.length) { 
    el.textContent = cur.slice(0, ++ci); 
    setTimeout(type, 60); 
  }
  else if (!deleting && ci === cur.length) { 
    setTimeout(() => { deleting = true; type(); }, 2000); 
  }
  else if (deleting && ci > 0) { 
    el.textContent = cur.slice(0, --ci); 
    setTimeout(type, 30); 
  }
  else { 
    deleting = false; 
    ri = (ri + 1) % roles.length; 
    setTimeout(type, 300); 
  }
}
if (el) type();

/* ─── CUSTOM CURSOR & HOVER EFFECTS ─── */
const cursor = document.getElementById('cursor');
const hoverElements = document.querySelectorAll('[data-hover], a, button');

document.addEventListener('mousemove', (e) => {
  if (cursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});

hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursor?.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor?.classList.remove('hovered'));
});

/* ─── MAGNETIC BUTTONS ─── */
const magneticBtns = document.querySelectorAll('.btn-magnetic');
magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = `translate3d(0, 0, 0)`;
  });
});

/* ─── 3D TILT CARDS ─── */
const tiltCards = document.querySelectorAll('[data-tilt]');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return; 
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

/* ─── SCROLL REVEAL ANIMATIONS ─── */
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      const children = e.target.querySelectorAll('.reveal-text');
      children.forEach((child, idx) => {
        setTimeout(() => child.classList.add('visible'), idx * 100);
      });
      observer.unobserve(e.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up, .reveal-text').forEach(el => observer.observe(el));

/* ─── NAVBAR HIDE ON SCROLL & ACTIVE STATES ─── */
let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const st = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    navbar?.classList.add('hidden');
  } else {
    navbar?.classList.remove('hidden');
  }
  lastScrollY = window.scrollY;

  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
  navLinks.forEach(a => { a.classList.toggle('active', a.getAttribute('href') === '#' + cur); });
  
  if (st) st.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });

/* ─── PARALLAX STARFIELD ─── */
const canvas = document.getElementById('space-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    const hero = document.getElementById('hero');
    if (hero) {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }
  }
  window.addEventListener('resize', resize);
  resize();

  for(let i=0; i<150; i++) {
    stars.push({
      x: Math.random() * canvas.width, 
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.1
    });
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = dark ? '#FFFFFF' : '#000000';
    ctx.beginPath();
    const scrollOffset = window.scrollY * 0.5;

    stars.forEach(star => {
      let yPos = star.y - (scrollOffset * star.speed);
      if(yPos < 0) yPos = (yPos % canvas.height) + canvas.height;
      ctx.moveTo(star.x, yPos);
      ctx.arc(star.x, yPos, star.radius, 0, Math.PI * 2, true);
      star.y -= star.speed * 0.5;
      if(star.y < 0) star.y = canvas.height;
    });
    ctx.fill();
    requestAnimationFrame(drawStars);
  }
  drawStars();
}

/* ─── MOBILE HAMBURGER MENU ─── */

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  // Close menu after clicking nav item
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });

}