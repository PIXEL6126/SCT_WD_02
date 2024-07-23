// script.js
let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('lapsList');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 1);
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    display.innerHTML = "00:00:00";
    lapsList.innerHTML = "";
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function lap() {
    if (running) {
        const lapTime = formatTime(difference);
        const li = document.createElement('li');
        li.innerText = lapTime;
        lapsList.appendChild(li);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = formatTime(difference);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
}
