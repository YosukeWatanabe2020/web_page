
let isRunning = false;
let intervalID;
let endTime; // タイマーの終了時刻を記録

const pomodoroTime = 25 * 60 * 1000; // 25 minutes in milliseconds
const beepAudio = new Audio('sonar-ping-95840.mp3');

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
  
  const now = Date.now();
  endTime = now + pomodoroTime; // 終了時刻を設定
  intervalID = setInterval(updateTimer, 1000); // Update every second
}

function updateTimer() {
  const now = Date.now();
  const timeLeft = endTime - now;
  
  if (timeLeft <= 0) {
    clearInterval(intervalID);
    beepAudio.play();
    resetTimer();
    // ... handle end of timer
  } else {
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}

function stopTimer() {
  isRunning = false;
  startButton.textContent = 'start';
  clearInterval(intervalID);
}

function resetTimer() {
  stopTimer();
  timerElement.textContent = '25:00';
}
