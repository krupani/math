// common.js

let startTime;
let endTime;
let timerInterval;

function startTimer() {
    startTime = new Date();
    updateTimerDisplay();
    timerInterval = setInterval(updateTimerDisplay, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    endTime = new Date();
    const duration = (endTime - startTime) / 1000; // Duration in seconds
    document.getElementById('timer').textContent = formatTime(duration);
}

function updateTimerDisplay() {
    const currentTime = new Date();
    const duration = (currentTime - startTime) / 1000; // Duration in seconds
    document.getElementById('timer').textContent = formatTime(duration);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}