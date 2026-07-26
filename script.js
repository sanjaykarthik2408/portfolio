window.addEventListener('load', () => {
  window.setTimeout(() => document.querySelector('.loader').classList.add('done'), 1800);
});

const cursor = document.querySelector('.cursor');
window.addEventListener('pointermove', (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

const statement = document.querySelector('.statement-cycle');
window.setInterval(() => {
  statement.classList.add('is-changing');
  window.setTimeout(() => statement.classList.remove('is-changing'), 650);
}, 10000);

const progressBar = document.querySelector('.scroll-progress span');
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

const preview = document.querySelector('.photo-preview');
const previewImage = preview.querySelector('img');
const previewLabel = preview.querySelector('span');
const photoLetters = document.querySelectorAll('.photo-letter');

photoLetters.forEach((letter) => {
  letter.addEventListener('pointerenter', () => {
    previewImage.src = letter.dataset.image;
    previewLabel.textContent = letter.dataset.label;
    preview.classList.add('is-visible');
  });
  letter.addEventListener('pointerleave', () => preview.classList.remove('is-visible'));
});

const letters = [...document.querySelectorAll('.name-letter')];
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
let scrollFrame;
let restoreTimer;

letters.forEach((letter) => { letter.dataset.original = letter.textContent; });
window.addEventListener('scroll', () => {
  cancelAnimationFrame(scrollFrame);
  scrollFrame = requestAnimationFrame(() => {
    const progress = Math.min(window.scrollY / (window.innerHeight * 0.9), 1);
    letters.forEach((letter, index) => {
      const swing = Math.sin(window.scrollY / 52 + index * 1.8);
      letter.style.transform = `translate(${swing * progress * 34}px, ${progress * (26 + index * 5)}px) rotate(${swing * progress * 22}deg)`;
      letter.style.opacity = `${1 - progress * 0.92}`;
      letter.style.filter = `blur(${progress * 8}px)`;
      if (progress > 0.06) letter.textContent = characters[Math.floor(Math.random() * characters.length)];
    });
    clearTimeout(restoreTimer);
    restoreTimer = setTimeout(() => {
      letters.forEach((letter) => { letter.textContent = letter.dataset.original; });
    }, 140);
  });
}, { passive: true });
