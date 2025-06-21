// common.js

let startTime;
let endTime;
let timerInterval;
let outOfFocusCount = 0;

function startTimer() {
    window.addEventListener('focus', handleFocus);
    startTime = new Date();
    updateTimerDisplay();
    updateFocusDisplay(outOfFocusCount)
    timerInterval = setInterval(updateTimerDisplay, 1000);
}

function stopTimer() {
    window.removeEventListener('focus', handleFocus);
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

function updateFocusDisplay(focusLostCounter) {
    document.getElementById('focus-lost').textContent = `Focus Lost: ${focusLostCounter}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function handleFocus() {
    outOfFocusCount++;
    updateFocusDisplay(outOfFocusCount)
}