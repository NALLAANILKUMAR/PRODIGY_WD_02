// script.js
let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startTimer() {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    running = true;
    startPauseBtn.textContent = 'Pause';
}

function pauseTimer() {
    clearInterval(tInterval);
    savedTime = difference;
    running = false;
    startPauseBtn.textContent = 'Start';
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    savedTime = 0;
    display.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    laps = [];
    renderLaps();
}

function lapTimer() {
    if (running) {
        laps.push(display.textContent);
        renderLaps();
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = savedTime ? updatedTime - startTime + savedTime : updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
    return (number < 10 ? '0' : '') + number;
}

function renderLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}

startPauseBtn.addEventListener('click', () => {
    if (!running) {
        startTimer();
    } else {
        pauseTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);
