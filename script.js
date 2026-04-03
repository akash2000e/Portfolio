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
