/* ============================================================
   AXION - Main JavaScript
   ============================================================ */

// ----------------------------------------
// Header scroll effect
// ----------------------------------------
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }, { passive: true });
}

// ----------------------------------------
// Mobile menu
// ----------------------------------------
const menuBtn = document.querySelector('.menu-btn');
const navMobile = document.querySelector('.nav-mobile');
if (menuBtn && navMobile) {
  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.classList.toggle('open');
    navMobile.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  // Close on link click
  navMobile.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ----------------------------------------
// Active nav link
// ----------------------------------------
(function() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ----------------------------------------
// Scroll reveal
// ----------------------------------------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal, .reveal--left, .reveal--right').forEach(el => {
  revealObserver.observe(el);
});

// ----------------------------------------
// Counter animation
// ----------------------------------------
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ----------------------------------------
// Typing animation
// ----------------------------------------
function typeEffect(el) {
  if (!el) return;
  const words = JSON.parse(el.dataset.words || '[]');
  if (!words.length) return;

  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pausing = false;

  function tick() {
    const current = words[wordIdx];
    if (pausing) {
      pausing = false;
      setTimeout(tick, deleting ? 80 : 1800);
      return;
    }

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        pausing = true;
        deleting = true;
        setTimeout(tick, 80);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        pausing = true;
      }
    }
    setTimeout(tick, deleting ? 60 : 110);
  }
  tick();
}

const typingEl = document.querySelector('[data-words]');
typeEffect(typingEl);

// ----------------------------------------
// Form submission (mock)
// ----------------------------------------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'SENDING...';
    btn.disabled = true;

    setTimeout(() => {
      const successMsg = document.getElementById('formSuccess');
      if (successMsg) {
        contactForm.style.display = 'none';
        successMsg.style.display = 'block';
      } else {
        btn.textContent = 'SENT ✓';
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          contactForm.reset();
        }, 2000);
      }
    }, 1200);
  });
}

// ----------------------------------------
// Smooth hover glow on cards (optional extra)
// ----------------------------------------
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.setProperty('--mouse-x', x + '%');
    card.style.setProperty('--mouse-y', y + '%');
  });
});
