document.getElementById('year').textContent = new Date().getFullYear();

for (const panel of document.querySelectorAll('.panel')) {
  panel.classList.add('panel-hidden');
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.2 });

for (const el of document.querySelectorAll('.reveal')) revealObserver.observe(el);

const panelObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('panel-show');
    entry.target.classList.remove('panel-hidden');
  });
}, { threshold: 0.25 });

for (const panel of document.querySelectorAll('.panel')) panelObserver.observe(panel);

window.addEventListener('scroll', () => {
  const y = window.scrollY * 0.04;
  for (const card of document.querySelectorAll('.float-card')) {
    const rect = card.getBoundingClientRect();
    const offset = (window.innerHeight - rect.top) * 0.006;
    card.style.transform = `translateY(${Math.max(-8, Math.min(8, offset - y * 0.04))}px)`;
  }
}, { passive: true });
