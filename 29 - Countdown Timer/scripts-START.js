let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const pasueButton = document.querySelector('.pause');

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds); // run it once here. Ot start the timer immediately. Prevents from starting a sec late
  displayEndTime(then); // only needs ran once, so we put it in the timer function

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check  if we should stop it
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    //  display it!
    displayTimeLeft(secondsLeft); // then run it here every sec
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function handleClick() {
  console.log(this);
}

buttons.forEach((button) => button.addEventListener('click', startTimer));
pasueButton.addEventListener('click', handleClick);
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60); // timer is in seconds. so divide by 60
  this.reset();
});
