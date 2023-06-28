import Notiflix from 'notiflix';

const formEl = document.querySelector('form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, reject });
      }
    }, delay);
  });
}

formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  let { delay, step, amount } = event.target.elements;
  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);
  if (amount <= 0 || delay <= 0 || step <= 0) {
    return Notiflix.Notify.failure(`Please input correct values`);
  }
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  formEl.reset();
}
