document.getElementById('year').textContent = new Date().getFullYear();

const themeSelect = document.getElementById('themeSelect');
const savedTheme = localStorage.getItem('themeMode') || 'auto';

function applyTheme(mode) {
  if (mode === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else if (mode === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

if (themeSelect) {
  themeSelect.value = savedTheme;
  applyTheme(savedTheme);
  themeSelect.addEventListener('change', () => {
    const mode = themeSelect.value;
    localStorage.setItem('themeMode', mode);
    applyTheme(mode);
  });
}

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

const floatCards = [...document.querySelectorAll('.float-card')];
let ticking = false;

function updateFloatCards() {
  const vh = window.innerHeight;
  for (const card of floatCards) {
    const rect = card.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const progress = (center - vh / 2) / (vh / 2);
    const drift = Math.max(-8, Math.min(8, -progress * 8));
    card.style.setProperty('--floatY', `${drift.toFixed(2)}px`);
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateFloatCards);
    ticking = true;
  }
}, { passive: true });

window.addEventListener('resize', updateFloatCards);
updateFloatCards();
