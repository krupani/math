const welcomeDiv = document.getElementById("welcome");
const gameDiv = document.getElementById("game");
const scoreDiv = document.getElementById("score");
const endDiv = document.getElementById("end");
const scoreContainer = document.getElementById("score-container");
const easyButton = document.getElementById("easy");
// const mediumButton = document.getElementById("medium");
const checkButton = document.getElementById("check");
const nextButton = document.getElementById("next");
const againButton = document.getElementById("again");

const divisorO = document.getElementById("divisor");
const dH = document.getElementById("dH");
const dT = document.getElementById("dT");
const dO = document.getElementById("dO");

var divisorSet = [2, 3, 4, 5, 6, 7, 8, 9];
divisorSet.push(generateNumber(3, 9));
divisorSet.push(generateNumber(3, 9));
divisorSet = shuffle(divisorSet);


const gridContainer = document.getElementById("grid-container");
const wrongSound = new Audio('media/sounds/buzzer.wav');
const correctSound = new Audio('media/sounds/correct.wav');
const gameOverSound = new Audio('media/sounds/gameover.wav');

const units = ["H", "T", "O"];
let type;
let toggleFlag = true;
let counter = 1;
let divisor;
let dividend;

function startGame() {
    welcomeDiv.style.display = "none";
    gameDiv.style.display = "block";
    scoreDiv.style.display = "block";

    divisor = divisorSet[counter - 1]
    dividend = generateNumber(100, 999);

    clearInputs()
    divisorO.textContent = divisor;
    dH.textContent = dividend[0];
    dT.textContent = dividend[1];
    dO.textContent = dividend[2];
}

function clearInputs() {
    inputs = document.getElementsByTagName("input");
    for (var i=0; i<inputs.length; i++) {
        inputs[i].value = "";
    }
}

function generateNumber(min, max) {
    return (Math.floor((Math.random() * (max - min)) + min)).toString().split('').map(Number);
}

function loadScoreBoard() {
    for (let i = 1; i <= 10; i++) {
        const ball = document.createElement("div");
        ball.id = "score" + i
        ball.classList.add("tile");
        ball.classList.add("ball");
        scoreContainer.appendChild(ball);
    }
}

function checkAnswer() {
    checkButton.classList.add("hide");
    nextButton.classList.remove("hide");
    qoAns = document.getElementById("qO").value;
    qtAns = document.getElementById("qT").value;
    qhAns = document.getElementById("qH").value;
    roAns = document.getElementById("rO").value;
    rtAns = document.getElementById("rT").value;
    rhAns = document.getElementById("rH").value;

    let expectedQuotient = Math.floor(Number(dividend.join('')) / divisor);
    let expectedRemainder = Number(dividend.join('')) % divisor;
    let actualQuotient = Number([qhAns, qtAns, qoAns].join(''));
    let actualRemainder = Number([rhAns, rtAns, roAns].join(''));

    if ((expectedQuotient == actualQuotient) && (expectedRemainder == actualRemainder)) {
        updateScore(true);
    } else {
        updateScore(false);
    }
}

function updateScore(flag) {
    var scoreBall = document.getElementById("score" + counter);
    if (flag) {
        correctSound.play();
        scoreBall.innerHTML = '<img src="./media/images/correct.png"></img>'
        checkButton.classList.remove("hide");
        nextButton.classList.add("hide");
        startGame();
    } else {
        wrongSound.play();
        scoreBall.innerHTML = '<img src="./media/images/wrong.png"></img>'
    }
    if (counter == 10) {
        stopTimer();
        gameOverSound.play();
        welcomeDiv.style.display = "none";
        gameDiv.style.display = "none";
        scoreDiv.style.display = "block";
        endDiv.style.display = "block"
    } else {
        counter++;
    }
}

easyButton.addEventListener("click", () => {
    loadScoreBoard();
    type = "simple";
    startTimer();
    startGame();
});

// mediumButton.addEventListener("click", () => {
//     loadScoreBoard();
//     type = "borrow";
//     startGame();
// });

checkButton.addEventListener("click", () => {
    checkAnswer();
});

againButton.addEventListener('click', function () {
    location.reload();
});

nextButton.addEventListener('click', function () {
    checkButton.classList.remove("hide");
    nextButton.classList.add("hide");
    startGame();
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}