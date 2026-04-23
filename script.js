// ===========================
//  NEXWORK — COWORKING WEBSITE
//  JavaScript
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // ——— NAVBAR SCROLL ———
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ——— MOBILE MENU TOGGLE ———
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // ——— SCROLL REVEAL ———
  const revealEls = document.querySelectorAll(
    '.space-card, .am-card, .testi-card, .price-card, .loc-card, .about-card, .af-item'
  );

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (el.dataset.delay || (i % 4) * 80) + 'ms';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(el => observer.observe(el));

  // ——— PRICING TOGGLE ———
  const toggleSwitch = document.getElementById('toggleSwitch');
  const labels = document.querySelectorAll('.pt-label');
  const priceNums = document.querySelectorAll('.price-num');
  let isAnnual = false;

  toggleSwitch.addEventListener('click', () => {
    isAnnual = !isAnnual;
    toggleSwitch.classList.toggle('on', isAnnual);

    labels.forEach(label => {
      label.classList.toggle('active', label.dataset.type === (isAnnual ? 'annually' : 'monthly'));
    });

    priceNums.forEach(num => {
      const target = isAnnual
        ? parseInt(num.dataset.annual)
        : parseInt(num.dataset.monthly);
      animatePrice(num, target);
    });
  });

  labels.forEach(label => {
    label.addEventListener('click', () => {
      const isNowAnnual = label.dataset.type === 'annually';
      if (isNowAnnual !== isAnnual) {
        toggleSwitch.click();
      }
    });
  });

  function animatePrice(el, target) {
    const start = parseInt(el.textContent);
    const duration = 350;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * eased);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ——— CONTACT FORM ———
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    btn.textContent = 'Sending...';
    btn.style.opacity = '0.7';

    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.opacity = '1';
      formSuccess.classList.add('show');
      contactForm.reset();

      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 5000);
    }, 1200);
  });

  // ——— SMOOTH ACTIVE NAV HIGHLIGHT ———
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--brown)';
      }
    });
  });

  // ——— HERO PARALLAX ———
  const heroBlobs = document.querySelectorAll('.hero-blob');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBlobs.forEach((blob, i) => {
      const speed = i === 0 ? 0.15 : 0.1;
      blob.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

  // ——— BLOG PAGE NAVIGATION ———
  const mainContent = document.querySelector('body > :not(#blogPage):not(script)');
  const blogPage = document.getElementById('blogPage');

  // Function to show blog page
  window.showBlogPage = function() {
    // Hide main content
    document.querySelectorAll('body > section, body > footer').forEach(el => {
      if (el.id !== 'blogPage') {
        el.style.display = 'none';
      }
    });
    // Show blog page
    blogPage.style.display = 'block';
    window.scrollTo(0, 0);
  };

  // Function to show home page
  window.showHomePage = function() {
    // Show main content
    document.querySelectorAll('body > section, body > footer').forEach(el => {
      el.style.display = '';
    });
    // Hide blog page
    blogPage.style.display = 'none';
    window.scrollTo(0, 0);
  };

  // Add click handlers to blog links
  document.querySelectorAll('.nav-links a[href="blog.html"], .mobile-menu a[href="blog.html"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showBlogPage();
    });
  });

});
