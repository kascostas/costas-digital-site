const slides = [...document.querySelectorAll('.slide')];
const dotsWrap = document.getElementById('dots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const year = document.getElementById('year');

let idx = 0;
let timer;

function renderDots() {
  dotsWrap.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `dot ${i === idx ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => {
      idx = i;
      renderSlides();
      restartAuto();
    });
    dotsWrap.appendChild(dot);
  });
}

function renderSlides() {
  slides.forEach((s, i) => s.classList.toggle('active', i === idx));
  [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === idx));
}

function next() {
  idx = (idx + 1) % slides.length;
  renderSlides();
}

function prev() {
  idx = (idx - 1 + slides.length) % slides.length;
  renderSlides();
}

function autoPlay() {
  timer = setInterval(next, 5200);
}

function restartAuto() {
  clearInterval(timer);
  autoPlay();
}

prevBtn.addEventListener('click', () => {
  prev();
  restartAuto();
});

nextBtn.addEventListener('click', () => {
  next();
  restartAuto();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) clearInterval(timer);
  else restartAuto();
});

year.textContent = new Date().getFullYear();
renderDots();
renderSlides();
autoPlay();
