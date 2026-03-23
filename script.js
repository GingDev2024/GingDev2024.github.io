/* ============================================================
   script.js — Guiller Santos Portfolio
   ============================================================ */

// ── Cursor glow ──
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

// ── Mobile nav toggle ──
const menuBtn = document.getElementById('menuBtn');
const nav     = document.getElementById('nav');

menuBtn.addEventListener('click', () => nav.classList.toggle('open'));

document.addEventListener('click', e => {
  if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nav.classList.remove('open');
    }
  });
});

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObserver.observe(el));

// ── Animated skill bars ──
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillSection = document.getElementById('skillBars');
if (skillSection) skillObserver.observe(skillSection.closest('.card'));

// ── Number counter animation ──
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.count-num').forEach(el => {
        const target   = parseInt(el.dataset.target);
        const duration = 1200;
        let start      = null;

        const step = timestamp => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          el.textContent = Math.floor(progress * target);
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target;
        };

        requestAnimationFrame(step);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsRow = document.getElementById('statsRow');
if (statsRow) counterObserver.observe(statsRow);

// ── Copy email to clipboard ──
const copyBtn = document.getElementById('copyEmail');
if (copyBtn) {
  copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText('guillersantos111@gmail.com');
    const icon       = this.querySelector('i');
    icon.className   = 'fas fa-check';
    this.style.color = 'var(--green)';
    setTimeout(() => {
      icon.className   = 'fas fa-copy';
      this.style.color = '';
    }, 2000);
  });
}
