/* =============================================
   BOTTOM NAV — active section highlight
   ============================================= */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';

  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50;

  if (atBottom) {
    current = sections[sections.length - 1].getAttribute('id');
  } else {
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* =============================================
   SCROLL FADE-IN — Intersection Observer
   ============================================= */
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));

/* =============================================
   COPYRIGHT YEAR — keep it current automatically
   ============================================= */
const footerCopy = document.getElementById('footer-copy');
if (footerCopy) {
  footerCopy.textContent = `© ${new Date().getFullYear()} Edamana Akash. Built with curiosity.`;
}

/* =============================================
   CONTACT FORM — async submit with status feedback
   ============================================= */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('form-submit-btn');
    const status = document.getElementById('form-status');

    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.className = 'form-status';
    status.textContent = '';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        status.classList.add('success');
        status.textContent = 'Message sent. I\'ll get back to you soon.';
        contactForm.reset();
      } else {
        throw new Error('Server error');
      }
    } catch {
      status.classList.add('error');
      status.textContent = 'Something went wrong. Email me directly at akashedamana@gmail.com';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });
}

/* =============================================
   PROJECT CARD IMAGES — hide fallback when image loads
   ============================================= */
document.querySelectorAll('.card-img').forEach(cardImg => {
  const bgStyle = cardImg.style.backgroundImage;
  if (!bgStyle || bgStyle === 'none' || bgStyle === '') return;

  // Extract URL from backgroundImage style
  const urlMatch = bgStyle.match(/url\(["']?(.+?)["']?\)/);
  if (!urlMatch) return;

  const imgUrl = urlMatch[1];
  const testImg = new Image();

  testImg.onload = () => {
    // Image loaded — hide fallback text
    const fallback = cardImg.querySelector('.card-img-fallback');
    if (fallback) fallback.style.display = 'none';
  };

  testImg.onerror = () => {
    // Image failed — clear background, show fallback
    cardImg.style.backgroundImage = 'none';
    const fallback = cardImg.querySelector('.card-img-fallback');
    if (fallback) fallback.style.opacity = '0.2';
  };

  testImg.src = imgUrl;
});

/* =============================================
   SCROLL PROGRESS BAR
   ============================================= */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  if (!progressBar) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (Math.min(window.scrollY / max, 1) * 100) + '%';
}, { passive: true });

/* =============================================
   TYPEWRITER — cycles through multiple phrases
   ============================================= */
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const phrases = [
    'Engineer & Maker',
    'Digital Fabricator',
    'Always Building',
  ];

  heroTitle.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'type-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  heroTitle.appendChild(cursor);

  const textNode = document.createTextNode('');
  heroTitle.insertBefore(textNode, cursor);

  let current = '';
  let phraseIndex = 0;
  let isTyping = true;
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  function tick() {
    const target = phrases[phraseIndex];
    if (isTyping) {
      if (current.length < target.length) {
        current += target[current.length];
        textNode.nodeValue = current;
        setTimeout(tick, rand(75, 105));
      } else {
        setTimeout(() => { isTyping = false; tick(); }, rand(2000, 2600));
      }
    } else {
      if (current.length > 0) {
        current = current.slice(0, -1);
        textNode.nodeValue = current;
        setTimeout(tick, rand(42, 58));
      } else {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(() => { isTyping = true; tick(); }, rand(380, 480));
      }
    }
  }

  tick();
}

/* =============================================
   NAME EXPAND — letter-by-letter on hover
   ============================================= */
(function () {
  const heroName  = document.querySelector('.hero-name');
  const nameExpand = document.querySelector('.name-expand');
  if (!heroName || !nameExpand) return;

  const expandText = 'damana';
  let expandCurrent = '';
  let expandTimer   = null;
  let typeCursor    = null;

  nameExpand.textContent = ''; // clear static HTML content

  function showCursor() {
    if (typeCursor) return;
    typeCursor = document.createElement('span');
    typeCursor.className = 'name-type-cursor';
    typeCursor.setAttribute('aria-hidden', 'true');
    nameExpand.after(typeCursor);
  }

  function hideCursor() {
    if (typeCursor) { typeCursor.remove(); typeCursor = null; }
  }

  function typeIn() {
    if (expandCurrent.length < expandText.length) {
      expandCurrent += expandText[expandCurrent.length];
      nameExpand.textContent = expandCurrent;
      nameExpand.style.maxWidth = '300px';
      nameExpand.style.opacity  = '1';
      expandTimer = setTimeout(typeIn, 48);
    } else {
      heroName.classList.add('name-full');
    }
  }

  function typeOut() {
    heroName.classList.remove('name-full');
    hideCursor();
    if (expandCurrent.length > 0) {
      expandCurrent = expandCurrent.slice(0, -1);
      nameExpand.textContent = expandCurrent;
      if (expandCurrent.length === 0) {
        nameExpand.style.maxWidth = '0';
        nameExpand.style.opacity  = '0';
      }
      expandTimer = setTimeout(typeOut, 32);
    }
  }

  heroName.addEventListener('mouseenter', () => {
    clearTimeout(expandTimer);
    showCursor();
    typeIn();
  });

  heroName.addEventListener('mouseleave', () => {
    clearTimeout(expandTimer);
    typeOut();
  });
}());

/* =============================================
   FAB ACADEMY — counting numbers
   ============================================= */
function animateCount(el, target, suffix, duration) {
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const fabStats = document.querySelector('.fab-stats');
if (fabStats) {
  let counted = false;
  const countObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      document.querySelectorAll('.fab-stat-num').forEach(el => {
        const raw = el.textContent.trim();
        const suffix = raw.replace(/[0-9]/g, '');
        const target = parseInt(raw, 10);
        animateCount(el, target, suffix, 1400);
      });
      countObs.disconnect();
    }
  }, { threshold: 0.6 });
  countObs.observe(fabStats);
}

/* =============================================
   STAGGERED CHILDREN REVEAL
   ============================================= */
document.querySelectorAll('[data-stagger]').forEach(container => {
  const staggerObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        [...entry.target.children].forEach((child, i) => {
          setTimeout(() => child.classList.add('stagger-visible'), i * 90);
        });
        staggerObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
  staggerObs.observe(container);
});

/* =============================================
   TIMELINE LINE DRAW
   ============================================= */
const timeline = document.querySelector('.timeline');
if (timeline) {
  const lineObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      timeline.classList.add('draw-line');
      lineObs.disconnect();
    }
  }, { threshold: 0.1 });
  lineObs.observe(timeline);
}

/* =============================================
   MAGNETIC BUTTONS
   ============================================= */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.25;
    const y = (e.clientY - r.top  - r.height / 2) * 0.3;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* =============================================
   ROCKET ANIMATION — removed
   ============================================= */
(function initRocket() { return;
  const hero = document.getElementById('hero');
  if (!hero || window.innerWidth < 500) return;

  const RW = 50, RH = 100;   // rocket dimensions
  const TRAIL_GAP    = 18;   // px between exhaust particles
  const LAUNCH_SPEED = 2.2;  // px per rAF frame (launch)
  const rnd = (lo, hi) => Math.random() * (hi - lo) + lo;

  /* ---- lane container ---- */
  const lane = document.createElement('div');
  Object.assign(lane.style, {
    position: 'absolute', top: '0', right: '32px', bottom: '0',
    width: '60px', overflow: 'hidden', pointerEvents: 'none', zIndex: '5',
  });
  hero.appendChild(lane);

  /* ---- rocket SVG (nose at top, engines at bottom) ---- */
  const rocketEl = document.createElement('div');
  Object.assign(rocketEl.style, {
    position: 'absolute', width: RW + 'px', left: '5px',
    opacity: '0', willChange: 'top, opacity',
  });
  rocketEl.innerHTML = `
    <svg width="${RW}" height="${RH}" viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- nose cone -->
      <path d="M25 2 L9 32 L41 32 Z" fill="#39ff14"/>
      <!-- body -->
      <rect x="9" y="31" width="32" height="46" rx="3" fill="#39ff14" opacity="0.88"/>
      <!-- porthole -->
      <circle cx="25" cy="50" r="8"   fill="#0a0a0a" opacity="0.7"/>
      <circle cx="25" cy="50" r="5.5" fill="#111"    opacity="0.55"/>
      <circle cx="22" cy="47" r="2.5" fill="#39ff14" opacity="0.28"/>
      <!-- body stripe -->
      <line x1="9" y1="65" x2="41" y2="65" stroke="#0a0a0a" stroke-width="1.5" opacity="0.22"/>
      <!-- left fin -->
      <path d="M9 70 L0 90 L9 90 Z"   fill="#39ff14" opacity="0.75"/>
      <!-- right fin -->
      <path d="M41 70 L50 90 L41 90 Z" fill="#39ff14" opacity="0.75"/>
      <!-- nozzle -->
      <rect x="15" y="77" width="20" height="14" rx="4" fill="#111" stroke="#39ff14" stroke-width="1.2"/>
      <!-- nozzle glow -->
      <rect x="19" y="81" width="12" height="7" rx="2" fill="#39ff14" opacity="0.22"/>
    </svg>`;
  lane.appendChild(rocketEl);

  /* ---- flame SVG (sits below nozzle) ---- */
  const flameEl = document.createElement('div');
  Object.assign(flameEl.style, {
    position: 'absolute', width: RW + 'px', left: '5px',
    opacity: '0', willChange: 'top, opacity',
  });
  flameEl.innerHTML = `
    <svg width="${RW}" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="25" cy="10" rx="11" ry="17" fill="#ff5500" opacity="0.85"/>
      <ellipse cx="25" cy="15" rx="7"  ry="12" fill="#ff9900" opacity="0.9"/>
      <ellipse cx="25" cy="18" rx="4"  ry="8"  fill="#ffdd00" opacity="0.95"/>
      <ellipse cx="25" cy="19" rx="2"  ry="5"  fill="#ffffff"  opacity="0.7"/>
      <ellipse cx="14" cy="8"  rx="4"  ry="8"  fill="#ff4400" opacity="0.45"/>
      <ellipse cx="36" cy="8"  rx="4"  ry="8"  fill="#ff4400" opacity="0.45"/>
    </svg>`;
  lane.appendChild(flameEl);

  /* ---- helpers ---- */
  function posFlame(rocketTop) {
    flameEl.style.top = (rocketTop + RH - 8) + 'px';
  }

  function showFlame(on) {
    flameEl.style.opacity = on ? '1' : '0';
  }

  // Flickering via rapid opacity jitter
  let flickerTimer = null;
  function startFlicker() {
    flickerTimer = setInterval(() => {
      flameEl.style.opacity = (0.75 + Math.random() * 0.25).toFixed(2);
    }, 80);
  }
  function stopFlicker() {
    clearInterval(flickerTimer);
    flickerTimer = null;
    showFlame(false);
  }

  // Exhaust particle
  function dropParticle(y) {
    const p = document.createElement('div');
    const size = 4 + Math.random() * 4;
    Object.assign(p.style, {
      position: 'absolute',
      left: (RW / 2 - size / 2 + 5) + 'px',
      top:  y + 'px',
      width:  size + 'px',
      height: size + 'px',
      borderRadius: '50%',
      background: `rgba(${Math.random() > 0.5 ? '255,140,0' : '57,255,20'},0.5)`,
      opacity: '0.5',
      transition: `opacity ${1 + Math.random()}s ease, transform ${1 + Math.random()}s ease`,
      transform: 'scale(1)',
    });
    lane.appendChild(p);
    requestAnimationFrame(() => {
      p.style.opacity   = '0';
      p.style.transform = `scale(${2 + Math.random() * 2})`;
    });
    setTimeout(() => p.remove(), 2200);
  }

  // Landing ring pulse
  function landingRing(y) {
    const ring = document.createElement('div');
    Object.assign(ring.style, {
      position: 'absolute', left: '0', top: y + 'px',
      width: '60px', height: '12px', borderRadius: '50%',
      border: '2px solid rgba(57,255,20,0.7)',
      opacity: '0.7', transform: 'scale(0.2)',
      transition: 'transform 0.7s ease-out, opacity 0.9s ease',
    });
    lane.appendChild(ring);
    requestAnimationFrame(() => { ring.style.transform = 'scale(1)'; ring.style.opacity = '0'; });
    setTimeout(() => ring.remove(), 1000);
  }

  /* ---- launch: blasts upward, trails exhaust ---- */
  function launch() {
    return new Promise(resolve => {
      const h = hero.offsetHeight;
      const startY = h - RH - 8;
      let pos = startY, lastParticle = pos;

      rocketEl.style.top     = pos + 'px';
      rocketEl.style.opacity = '1';
      posFlame(pos);
      startFlicker();

      function frame() {
        pos -= LAUNCH_SPEED;
        rocketEl.style.top = pos + 'px';
        posFlame(pos);

        if (lastParticle - pos >= TRAIL_GAP) {
          dropParticle(pos + RH + 2);
          lastParticle = pos;
        }

        if (pos + RH > 0) {
          requestAnimationFrame(frame);
        } else {
          stopFlicker();
          rocketEl.style.transition = 'opacity 0.3s ease';
          rocketEl.style.opacity    = '0';
          setTimeout(() => { rocketEl.style.transition = ''; resolve(); }, 350);
        }
      }
      requestAnimationFrame(frame);
    });
  }

  /* ---- land: eased descent, retrograde burn, gentle touchdown ---- */
  function land() {
    return new Promise(resolve => {
      const h      = hero.offsetHeight;
      const landY  = h - RH - 8;       // same pad as launch
      const startY = -RH;
      const dist   = landY - startY;
      let progress = 0;

      rocketEl.style.top     = startY + 'px';
      rocketEl.style.opacity = '1';
      posFlame(startY);
      startFlicker();

      function frame() {
        progress = Math.min(progress + 0.006, 1);
        // ease-out cubic → fast entry, slow controlled landing
        const eased = 1 - Math.pow(1 - progress, 3);
        const pos   = startY + eased * dist;

        rocketEl.style.top = pos + 'px';
        posFlame(pos);

        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          stopFlicker();
          // Touchdown
          rocketEl.style.top = landY + 'px';
          landingRing(landY + RH - 6);

          // Engines off after brief pause, then fade rocket
          setTimeout(() => {
            rocketEl.style.transition = 'opacity 0.6s ease';
            rocketEl.style.opacity    = '0';
            setTimeout(() => { rocketEl.style.transition = ''; resolve(); }, 650);
          }, 900);
        }
      }
      requestAnimationFrame(frame);
    });
  }

  /* ---- loop ---- */
  async function run() {
    await launch();
    await new Promise(r => setTimeout(r, rnd(2500, 5000))); // time in "space"
    await land();
    setTimeout(run, rnd(8000, 18000));
  }

  setTimeout(run, rnd(2000, 5000));
})();

/* =============================================
   CUSTOM CURSOR — crosshair + pixel trail
   ============================================= */
(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const cur = document.getElementById('cursor');
  if (!cur) return;

  let mx = -200, my = -200, lastPx = -999, lastPy = -999;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';

    if (Math.hypot(mx - lastPx, my - lastPy) >= 14) {
      spawnPixel(mx, my);
      lastPx = mx;
      lastPy = my;
    }
  });

  function spawnPixel(x, y) {
    const p = document.createElement('div');
    const size = Math.random() > 0.4 ? 4 : 3;
    p.className = 'c-pixel';
    p.style.left    = (x + (Math.random() - 0.5) * 4) + 'px';
    p.style.top     = (y + (Math.random() - 0.5) * 4) + 'px';
    p.style.width   = size + 'px';
    p.style.height  = size + 'px';
    p.style.opacity = '0.9';
    document.body.appendChild(p);
    p.getBoundingClientRect(); // force reflow so CSS transition fires
    p.style.opacity   = '0';
    p.style.transform = 'translate(-50%, -50%) scale(0.15)';
    setTimeout(() => p.remove(), 550);
  }

  /* Click — 8-pixel burst ring */
  document.addEventListener('mousedown', () => {
    const ring = [[-7,-7],[0,-9],[7,-7],[9,0],[7,7],[0,9],[-7,7],[-9,0]];
    ring.forEach(([dx, dy]) => spawnPixel(mx + dx, my + dy));
  });

  /* Hover detection — arms open outward */
  const HOVER = 'a, button, [role="button"], .btn, .pill, input, textarea, select';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(HOVER)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(HOVER) && !e.relatedTarget?.closest(HOVER)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  /* Hide when pointer leaves window */
  document.addEventListener('mouseleave', e => {
    if (!e.relatedTarget) cur.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => { cur.style.opacity = ''; });
})();
