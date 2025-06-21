const welcomeDiv = document.getElementById("welcome");
const gameDiv = document.getElementById("game");
const scoreDiv = document.getElementById("score");
const endDiv = document.getElementById("end");
const scoreContainer = document.getElementById("score-container");
const easyButton = document.getElementById("easy");
const mediumButton = document.getElementById("medium");
const checkButton = document.getElementById("check");
const nextButton = document.getElementById("next");
const againButton = document.getElementById("again");
const gridContainer = document.getElementById("grid-container");
const wrongSound = new Audio('media/sounds/buzzer.wav');
const correctSound = new Audio('media/sounds/correct.wav');
const gameOverSound = new Audio('media/sounds/gameover.wav');
const units = ["TTh", "Th", "H", "T", "O"];
let level;

let counter = 1;

function startGame() {
    welcomeDiv.style.display = "none";
    gameDiv.style.display = "block";
    scoreDiv.style.display = "block";
    gridContainer.innerHTML = "";

    num1 = generateNumber();
    num2 = generateNumber();
    num3 = generateNumber();

    for (let i = 1; i <= level; i++) {
        for (let j = 1; j <= 5; j++) {
            const tile = document.createElement("div");
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("inputmode", "numeric");
            input.setAttribute("maxlength", 1);
            tile.classList.add("tile");
            if (i == 1) {
                tile.textContent = units[j - 1];
                tile.classList.add("bold");
                tile.classList.add("unit");
                gridContainer.appendChild(tile);
            } else if (i == 2) {
                input.id = "c" + units[j - 1]
                gridContainer.appendChild(tile);
                if (j == 2 || j == 3 || j == 4) {
                    tile.appendChild(input);
                }  
            } else if (i == 3) {
                tile.classList.add("sum");
                if (j != 1) {tile.textContent = num1[j - 2];}
                tile.id = i - 2 + units[j - 1]
                gridContainer.appendChild(tile);
            } else if (i == 4) {
                tile.classList.add("sum");
                if (j == 1) { tile.textContent = "+"; }
                else { tile.textContent = num2[j - 2] }
                tile.id = i - 2 + units[j - 1]
                gridContainer.appendChild(tile);
            }

            if (level == 5) {
                if (i == 5) {
                    input.id = "a" + units[j - 1]
                    tile.classList.add("answer")
                    gridContainer.appendChild(tile);
                    tile.appendChild(input);
                }
            } else {
                if (i == 5) {
                    tile.classList.add("sum");
                    if (j == 1) { tile.textContent = "+"; }
                    else { tile.textContent = num3[j - 2] }
                    tile.id = i - 2 + units[j - 1]
                    gridContainer.appendChild(tile);
                } else if ( i == 6 ) {
                    input.id = "a" + units[j - 1]
                    tile.classList.add("answer")
                    gridContainer.appendChild(tile);
                    tile.appendChild(input);
                } 
            }
        }
    }
}

function generateNumber() {
    return (Math.floor((Math.random() * 8999) + 1000)).toString().split('').map(Number);
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
    oAns = document.getElementById("aO").value;
    tAns = document.getElementById("aT").value;
    hAns = document.getElementById("aH").value;
    thAns = document.getElementById("aTh").value;
    tthAns = document.getElementById("aTTh").value;

    let expectedAnswer = Number(num1.join('')) + Number(num2.join(''));
    if (level == 6) { expectedAnswer = expectedAnswer + Number(num3.join(''));}
    let actualAnswer = Number([tthAns, thAns, hAns, tAns, oAns].join(''))

    // console.log("=======> " + expectedAnswer + "=======>" + actualAnswer)
    if (expectedAnswer == actualAnswer) { updateScore(true) }
    else { updateScore(false) }
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
    level = 5;
    startTimer();
    startGame();
});

mediumButton.addEventListener("click", () => {
    loadScoreBoard();
    level = 6;
    startTimer();
    startGame();
});

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
