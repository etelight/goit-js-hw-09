const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
let timerChangeId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

stopBtnEl.disabled = true;

startBtnEl.addEventListener('click', e => {
  e.preventDefault();
  stopBtnEl.disabled = false;
  startBtnEl.disabled = true;
  timerChangeId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtnEl.addEventListener('click', e => {
  e.preventDefault();
  stopBtnEl.disabled = true;
  startBtnEl.disabled = false;
  clearInterval(timerChangeId);
});
