// =============================================
//   CHANDHANA PORTFOLIO — script.js (v2)
//   Minimal, purposeful interactions
// =============================================

// === Scroll-triggered fade-ups ===
function initFadeUps() {
  // Tag elements that should animate in
  const targets = [
    '.hero-top', '.hero-headline-wrap', '.hero-footer-row',
    '.bento-card', '.project-item', '.proj-divider',
    '.about-heading', '.about-body', '.about-skills-wrap',
    '.tl-item', '.tl-divider', '.contact-big', '.contact-sub', '.contact-links'
  ];
  targets.forEach((sel, gi) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('fade-up');
      // stagger bento cards
      if (sel === '.bento-card') {
        el.classList.add(`d${Math.min(i % 4 + 1, 4)}`);
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Hero visible immediately
  setTimeout(() => {
    document.querySelectorAll('.hero .fade-up').forEach(el => el.classList.add('in'));
  }, 80);
}

// === Number count-up for bento stats ===
function initCounters() {
  const numberEls = document.querySelectorAll('.bento-number[data-count]');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.innerHTML.match(/<span>(.*?)<\/span>/)?.[1] || '';
      const prefix = el.classList.contains('rupee') ? '₹' : '';
      let start = 0;
      const duration = 1400;
      const step = target / (duration / 16);

      const run = () => {
        start = Math.min(start + step, target);
        // Build inner html preserving span
        el.innerHTML = `${Math.floor(start)}<span>${suffix}</span>`;
        if (start < target) requestAnimationFrame(run);
      };
      requestAnimationFrame(run);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  numberEls.forEach(el => counterObserver.observe(el));
}

// === Sticky nav shrink ===
function initNav() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }, { passive: true });
}

// === Project hover — subtle line grow ===
function initProjectHovers() {
  document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.cursor = 'default';
    });
  });
}

// === Ticker pause on hover ===
function initTicker() {
  const track = document.querySelector('.ticker-track');
  if (!track) return;
  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}

// === Smooth scroll for nav links ===
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// === Inline avatar tilt ===
function initAvatarTilt() {
  const avatarWrap = document.querySelector('.img-inline');
  if (!avatarWrap) return;
  document.addEventListener('mousemove', (e) => {
    const rect = avatarWrap.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / window.innerWidth;
    const dy = (e.clientY - centerY) / window.innerHeight;
    avatarWrap.style.transform = `rotate(${dx * 6}deg) scale(1.02)`;
  });
}

// === Init ===
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFadeUps();
  initCounters();
  initTicker();
  initProjectHovers();
  initSmoothScroll();
  initAvatarTilt();
});
