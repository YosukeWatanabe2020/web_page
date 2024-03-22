let isRunning = false;
let frameRequest;
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
  
  startTime = Date.now();
  expectedEndTime = startTime + pomodoroTime;
  frameRequest = requestAnimationFrame(updateTimer);
}

function updateTimer() {
  const currentTime = Date.now();
  const timeLeft = expectedEndTime - currentTime;

  if (timeLeft <= 0) {
    cancelAnimationFrame(frameRequest);
    beepAudio.play();
    resetTimer();
    // ... handle end of timer
  } else {
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    frameRequest = requestAnimationFrame(updateTimer);
  }
}

function stopTimer() {
  isRunning = false;
  startButton.textContent = 'start';
  cancelAnimationFrame(frameRequest);
}

function resetTimer() {
  stopTimer();
  timerElement.textContent = '25:00';
  expectedEndTime = Date.now() + pomodoroTime;
}
