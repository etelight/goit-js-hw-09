import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');

const timerContainerEl = document.querySelector('.timer');
console.log(timerContainerEl);
const timerFieldEls = document.querySelectorAll('.field');
console.log(timerFieldEls);
const timerValueEls = document.querySelectorAll('.value');
const timerLabelEls = document.querySelectorAll('.label');

timerContainerEl.style.display = 'flex';
timerFieldEls.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
  field.style.margin = '10px';
});
timerValueEls.forEach(value => {
  value.style.fontSize = '35px';
});
timerLabelEls.forEach(label => {
  label.style.textTransform = 'uppercase';
});

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      Notiflix.Notify.success('Press the "start" button');
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        startBtn.disabled = true;
        const countdownInterval = setInterval(updateCountdown, 1000);
      });
    }
  },
};

function updateCountdown() {
  const selectedDate = flatpickr.parseDate(datetimePicker.value);
  const currentDate = new Date();

  const timeDifference = selectedDate.getTime() - currentDate.getTime();

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    Notiflix.Notify.success('The selected date has arrived!');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  daysDisplay.textContent = padZeroes(days);
  hoursDisplay.textContent = padZeroes(hours);
  minutesDisplay.textContent = padZeroes(minutes);
  secondsDisplay.textContent = padZeroes(seconds);
}

function padZeroes(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr('#datetime-picker', { ...options });
