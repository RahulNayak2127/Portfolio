/* tell CSS that JS is active (MUST be first line) */
document.documentElement.classList.add('js');

/* --------------------------------------------------
   Smooth scroll for nav links
-------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* --------------------------------------------------
   NAV shadow on scroll
-------------------------------------------------- */
const nav = document.querySelector('.glass-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) nav.classList.add('nav-shadow');
  else nav.classList.remove('nav-shadow');
});

/* --------------------------------------------------
   Typewriter effect
-------------------------------------------------- */
const typeEl = document.querySelector('.hero-typewriter');
const typeText =
  "Crafting clean interfaces and solving problems with logic & design.";
let ti = 0;

function typeWrite() {
  if (!typeEl) return;
  if (ti < typeText.length) {
    typeEl.textContent += typeText.charAt(ti);
    ti++;
    setTimeout(typeWrite, 22);
  }
}

window.addEventListener('load', () => {
  setTimeout(typeWrite, 350);
});

/* --------------------------------------------------
   REVEAL ON SCROLL (FIXED & SAFE)
-------------------------------------------------- */
const revealItems = document.querySelectorAll(
  '.section, .section-title, .glass-card, .skill-card, .project-card, .contact-box'
);

function revealOnScroll() {
  revealItems.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight - 80) {
      el.classList.add('reveal');
    }
  });
}

/* run after layout settles */
window.addEventListener('load', () => {
  setTimeout(revealOnScroll, 100);
});
window.addEventListener('scroll', revealOnScroll);

/* --------------------------------------------------
   Skill bar animation
-------------------------------------------------- */
const skills = document.querySelectorAll('.skill-fill');

function animateSkills() {
  skills.forEach(s => {
    const rect = s.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      const val = s.getAttribute('data-fill') || 70;
      s.style.width = val + '%';
    }
  });
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

/* --------------------------------------------------
   Hero parallax (subtle)
-------------------------------------------------- */
const heroContainer =
  document.querySelector('.hero-card') ||
  document.querySelector('.hero-content');

document.addEventListener('mousemove', e => {
  if (!heroContainer) return;
  const x = (e.clientX - window.innerWidth / 2) * 0.01;
  const y = (e.clientY - window.innerHeight / 2) * 0.01;
  heroContainer.style.transform = `translate(${x}px, ${y}px)`;
});

/* --------------------------------------------------
   Projects modal
-------------------------------------------------- */
const modal = document.getElementById('project-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalGithub = document.getElementById('modal-github');
const modalLive = document.getElementById('modal-live');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.dataset.img || 'assets/p1.jpg';
    const title = card.dataset.title || 'Project';
    const desc = card.dataset.desc || '';

    if (modalImg) modalImg.src = img;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalGithub) modalGithub.href = '#';
    if (modalLive) modalLive.href = '#';

    if (modal) modal.classList.add('show');
  });
});

/* close modal */
document.querySelectorAll('.modal-close, .modal').forEach(el => {
  el.addEventListener('click', e => {
    if (e.target === el || el.classList.contains('modal-close')) {
      modal.classList.remove('show');
    }
  });
});

/* ESC key closes modal */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal) modal.classList.remove('show');
});

/* --------------------------------------------------
   Contact: Email copy to clipboard
-------------------------------------------------- */
const emailBox = document.querySelector('.email-box');

if (emailBox) {
  emailBox.addEventListener('click', () => {
    navigator.clipboard.writeText(emailBox.dataset.copy);

    const toast = document.createElement('div');
    toast.textContent = 'Email copied!';
    toast.style.position = 'fixed';
    toast.style.bottom = '28px';
    toast.style.right = '28px';
    toast.style.padding = '10px 18px';
    toast.style.background = 'rgba(0,230,230,0.95)';
    toast.style.color = '#021';
    toast.style.fontWeight = '600';
    toast.style.borderRadius = '10px';
    toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    toast.style.zIndex = '9999';

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  });
}

