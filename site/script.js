const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

const cursor = document.getElementById('cursor');
window.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

for (const el of document.querySelectorAll('.magnetic')) {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '40px';
    cursor.style.height = '40px';
    cursor.style.borderColor = 'rgba(82,214,255,.9)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '22px';
    cursor.style.height = '22px';
    cursor.style.borderColor = 'rgba(255,255,255,.55)';
    el.style.transform = 'translate(0,0)';
  });
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });
}

for (const card of document.querySelectorAll('.tilt')) {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * 8;
    const ry = (px - 0.5) * 8;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to('.hero-title', {
    y: 10,
    opacity: 1,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.fromTo('.hero-overlay',
    { scale: 0.96, opacity: 0.5 },
    { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
  );

  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      }
    });
  });

  gsap.to('.bg-glow', {
    y: 80,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2
    }
  });
}

const stats = document.querySelectorAll('[data-target]');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.target || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 48));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = String(current);
    }, 24);
    io.unobserve(el);
  });
}, { threshold: 0.55 });

stats.forEach((s) => io.observe(s));
