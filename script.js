const startButton = document.getElementById('start');
const game = document.getElementById('game');
const timeHeader = document.getElementById('time-header');
const resultHeader = document.getElementById('result-header');
const timeDisplay = document.getElementById('time');
const resultDisplay = document.getElementById('result');
const gameTimeInput = document.getElementById('game-time');

let score = 0;
let isGameStarted = false;
let timeRemaining = parseFloat(gameTimeInput.value);

gameTimeInput.addEventListener('input', setGameTime);

function setGameTime() {
    timeDisplay.textContent = Number(gameTimeInput.value).toFixed(1);
    timeRemaining = parseFloat(gameTimeInput.value);
    show(timeHeader);
    hide(resultHeader);
}

function startGame() {
    score = 0;
    setGameTime();
    gameTimeInput.setAttribute('disabled', 'true');
    isGameStarted = true;
    game.style.backgroundColor = '#fff';
    startButton.classList.add('hide');

    const interval = setInterval(function () {
        timeRemaining -= 0.1;
        timeDisplay.textContent = timeRemaining.toFixed(1);

        if (timeRemaining <= 0) {
            clearInterval(interval);
            endGame();
        }
    }, 100);

    renderBox();
}

function endGame() {
    isGameStarted = false;
    gameTimeInput.removeAttribute('disabled');
    startButton.classList.remove('hide');
    game.innerHTML = '';
    game.style.backgroundColor = '#ccc';
    show(resultHeader);
    hide(timeHeader);
    resultDisplay.textContent = score.toString();
}

function handleBoxClick() {
    if (!isGameStarted) {
        return;
    }

    score++;
    renderBox();
}

function renderBox() {
    game.innerHTML = ''; // Очищаем игровую зону

    const box = document.createElement('div');
    const boxSize = getRandom(30, 100);
    const gameSize = game.getBoundingClientRect();
    const maxTop = gameSize.height - boxSize;
    const maxLeft = gameSize.width - boxSize;

    let randomColor;
    do {
        randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        console.log(randomColor)
    } while (randomColor === '#ffffff'); // Исключаем белый цвет

    box.style.height = box.style.width = `${boxSize}px`;
    box.style.position = 'absolute';
    box.style.backgroundColor = randomColor;
    box.style.top = `${getRandom(0, maxTop)}px`;
    box.style.left = `${getRandom(0, maxLeft)}px`;
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    game.insertAdjacentElement('afterbegin', box);
    box.addEventListener('click', handleBoxClick);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function show(el) {
    el.classList.remove('hide');
}

function hide(el) {
    el.classList.add('hide');
}
