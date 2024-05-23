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
const th1 = document.getElementById("1Th");
const h1 = document.getElementById("1H");
const t1 = document.getElementById("1T");
const o1 = document.getElementById("1O");
const th2 = document.getElementById("2Th");
const h2 = document.getElementById("2H");
const t2 = document.getElementById("2T");
const o2 = document.getElementById("2O");
const cth = document.getElementById("cTh");
const ch = document.getElementById("cH");
const ct = document.getElementById("cT");
const co = document.getElementById("cO");

const gridContainer = document.getElementById("grid-container");
const wrongSound = new Audio('media/sounds/buzzer.wav');
const correctSound = new Audio('media/sounds/correct.wav');
const gameOverSound = new Audio('media/sounds/gameover.wav');
const units = ["Th", "H", "T", "O"];
let type;
let toggleFlag = true;
let counter = 1;

function startGame() {
    welcomeDiv.style.display = "none";
    gameDiv.style.display = "block";
    scoreDiv.style.display = "block";

    document.getElementById("aO").value = "";
    document.getElementById("aT").value = "";
    document.getElementById("aH").value = "";
    document.getElementById("aTh").value = "";
    

    if (type == "simple") {
        nums = generateNumbersWithSmallerPlaceValues();
        num1 = nums[0];
        num2 = nums[1];
        console.log("=======>  " + num1 + " ===========> " + num2);
    } else {
        num1 = generateNumber();
        num2 = generateNumber();
        if (num1 < num2) {temp=num2; num2=num1; num1=temp;}
        th1.classList.remove("crossed");
        h1.classList.remove("crossed");
        t1.classList.remove("crossed");
        o1.classList.remove("crossed");
    }

    th1.textContent = num1[0];
    h1.textContent = num1[1];
    t1.textContent = num1[2];
    o1.textContent = num1[3];
    th2.textContent = num2[0];
    h2.textContent = num2[1];
    t2.textContent = num2[2];
    o2.textContent = num2[3];
    cth.value = "";
    ch.value = "";
    ct.value = "";
    co.value = "";
    
    if (type == "borrow" && toggleFlag) {
        th1.addEventListener("click", (e) => {
            toggleClass(th1, "crossed")
        })
        h1.addEventListener("click", () => {
            toggleClass(h1, "crossed")
        })
        t1.addEventListener("click", () => {
            toggleClass(t1, "crossed")
        })
        o1.addEventListener("click", () => {
            toggleClass(o1, "crossed")
        })
        toggleFlag = false;
    }
}


function generateNumber() {
    return (Math.floor((Math.random() * 8999) + 1000)).toString().split('').map(Number);
}

function generateNumbersWithSmallerPlaceValues() {
    // Generate the 2 random 4-digit numbers
    let firstNumber = generateNumber();
    let secondNumber = generateNumber();

    console.log("=======>  " + String(firstNumber) + " ===========> " + String(secondNumber));

    for (let i=0; i<4; i++) {
        if (firstNumber[i] < secondNumber[i]) {
            let x = firstNumber[i];
            firstNumber[i] = secondNumber[i];
            secondNumber[i] = x;
        }
    }

    console.log("=======>  " + firstNumber + " ===========> " + secondNumber);

    return [firstNumber, secondNumber];
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

    let expectedAnswer = Number(num1.join('')) - Number(num2.join(''));
    let actualAnswer = Number([thAns, hAns, tAns, oAns].join(''))

    console.log("=======> " + expectedAnswer + "=======>" + actualAnswer)
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
    startGame();
});

mediumButton.addEventListener("click", () => {
    loadScoreBoard();
    type = "borrow";
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

function toggleClass(element, tClass) {
    var classes =  element.className.split(' ');
    if (classes.indexOf(tClass) !== -1) {
        element.classList.remove("crossed")
    } else {
        element.classList.add("crossed")
    }
}
