let isRunning = false;
let timerInterval;
let startTime;
let expectedEndTime;
const pomodoroTime = 25 * 60 * 1000; // 25 minutes in milliseconds
const breakTime = 5 * 60 * 1000; // 5 minutes in milliseconds
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
  
  startTime = new Date().getTime();
  expectedEndTime = startTime + pomodoroTime;
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = new Date().getTime();
  const timeLeft = expectedEndTime - currentTime;

  if (timeLeft < 0) {
    clearInterval(timerInterval);
    beepAudio.play();
    // Start break or new pomodoro
    if (timerElement.textContent.startsWith('25')) {
      startTime = new Date().getTime();
      expectedEndTime = startTime + breakTime;
    } else {
      startTime = new Date().getTime();
      expectedEndTime = startTime + pomodoroTime;
    }
    timerInterval = setInterval(updateTimer, 1000);
  } else {
    // Update timer display
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}

function stopTimer() {
  isRunning = false;
  startButton.textContent = 'start';
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  timerElement.textContent = '25:00';
}
