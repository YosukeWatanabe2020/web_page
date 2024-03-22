let isRunning = false;
let timerInterval;
const pomodoroTime = 25 * 60; // 25 minutes
const breakTime = 5 * 60; // 5 minutes
let timeLeft = pomodoroTime;
const beepAudio = new Audio('sonar-ping-95840.mp3'); // Using the user's beep sound file

const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

startButton.addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
  } else {
    stopTimer();
  }
});

resetButton.addEventListener('click', resetTimer);

function startTimer() {
  isRunning = true;
  startButton.textContent = 'pause';
  
  timerInterval = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeLeft === 0) {
      beepAudio.play(); // Play beep sound
      if (timerElement.textContent.startsWith('25')) {
        timeLeft = breakTime; // Start break
      } else {
        timeLeft = pomodoroTime; // Start new pomodoro
      }
    }
  }, 1000);
}

function stopTimer() {
  isRunning = false;
  startButton.textContent = 'start';
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  timeLeft = pomodoroTime;
  timerElement.textContent = '25:00';
}
