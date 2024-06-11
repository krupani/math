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
const buttonsCollection = document.getElementById("buttons_collection");
const undoButton = document.getElementById("undo");
const clearButton = document.getElementById("clear");

const gridContainer = document.getElementById("grid-container");
const wordElement = document.getElementById("word");
const sentenceElement = document.getElementById("sentence");
const typeNumber = document.getElementById("type");
const wrongSound = new Audio('media/sounds/buzzer.wav');
const correctSound = new Audio('media/sounds/correct.wav');
const gameOverSound = new Audio('media/sounds/gameover.wav');

const numO = document.getElementById("numO");
const numT = document.getElementById("numT");
const numH = document.getElementById("numH");
const numTh = document.getElementById("numTh");
const numTTh = document.getElementById("numTTh");


let type;
let num;
let counter = 1;
let word;

function startGame() {
    welcomeDiv.style.display = "none";
    gameDiv.style.display = "block";
    scoreDiv.style.display = "block";
    let rawNum = generateNumber();
    num = Number(rawNum.join(''));
    word = translate(num);
    if (type == "word2num") {
        buttonsCollection.classList.add("hide");
        rawNum = ["","","","",""]
        wordElement.innerHTML = word;
        console.log("========> " + num + "  ===>  " + word)
    } else {
        wordElement.classList.add("hide");
        sentenceElement.classList.remove("hide");
        buttonsCollection.classList.remove("hide");
        typeNumber.textContent = "";
    }
    numO.innerHTML = '<input type="text" inputmode="numeric" maxlength=1 id="aO" value='+rawNum[4]+'>'
    numT.innerHTML = '<input type="text" inputmode="numeric" maxlength=1 id="aT" value='+rawNum[3]+'>'
    numH.innerHTML = '<input type="text" inputmode="numeric" maxlength=1 id="aH" value='+rawNum[2]+'>'
    numTh.innerHTML = '<input type="text" inputmode="numeric" maxlength=1 id="aTh" value='+rawNum[1]+'>'
    numTTh.innerHTML = '<input type="text" inputmode="numeric" maxlength=1 id="aTTh" value='+rawNum[0]+'>'
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
    let actualAnswer;
    let expectedAnswer;

    if (type == "word2num") {
        oAns = document.getElementById("aO").value;
        tAns = document.getElementById("aT").value;
        hAns = document.getElementById("aH").value;
        thAns = document.getElementById("aTh").value;
        tthAns = document.getElementById("aTTh").value;

        actualAnswer = Number([tthAns, thAns, hAns, tAns, oAns].join(''));
        expectedAnswer = num;
    } else {
         actualAnswer = typeNumber.textContent;
         expectedAnswer = word;
         console.log("======> actual ==> " + actualAnswer + "  expected ==> " + expectedAnswer)
    }

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

function generateNumber() {
    return (Math.floor((Math.random() * 89999) + 10000)).toString().split('').map(Number);
}

// function translate(n) {
// const single_digit = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
// const double_digit = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
// const below_hundred = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//     let word = "";
//     if (n < 10) {
//         word = single_digit[n] + ' ';
//     } else if (n < 20) {
//         word = double_digit[n - 10] + ' ';
//     } else if (n < 100) {
//         let rem = translate(n % 10);
//         word = below_hundred[(n - n % 10) / 10 - 2] + ' ' + rem;
//     } else if (n < 1000) {
//         word = single_digit[Math.trunc(n / 100)] + ' Hundred ' + translate(n % 100);
//     } else if (n < 100000) {
//         word = translate(parseInt(n / 1000)).trim() + ' Thousand ' + translate(n % 1000);
//     }
//     return word;
// }

function translate(n) {
    if (n === 0) return 'Zero';

    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    let words = '';

    // Handle thousands place
    const thousandPart = Math.floor(n / 1000);
    if (thousandPart > 0) {
        if (thousandPart >= 20) {
            words += tens[Math.floor(thousandPart / 10)] + ' ' + units[thousandPart % 10] + ' Thousand ';
        } else if (thousandPart > 10) {
            words += teens[thousandPart - 11] + ' Thousand ';
        } else {
            words += units[thousandPart] + ' Thousand ';
        }
    }

    // Handle hundreds place
    const hundredPart = Math.floor((n % 1000) / 100);
    if (hundredPart > 0) {
        words += units[hundredPart] + ' Hundred ';
    }

    // Handle tens and ones place
    const tensAndOnesPart = n % 100;
    if (tensAndOnesPart > 0) {
        if (tensAndOnesPart < 10) {
            words = words + " and " + units[tensAndOnesPart];
        } else if (tensAndOnesPart < 20 && tensAndOnesPart > 10) {
            words = words + " and " + teens[tensAndOnesPart - 11];
        } else {
            words = words + " and " + tens[Math.floor(tensAndOnesPart / 10)] + ' ' + units[tensAndOnesPart % 10];
        }
    }

    return words.replaceAll("  "," ");
}

let numButtons = document.getElementsByClassName("num");
for(let i=0; i<numButtons.length; i++) {
    numButtons[i].addEventListener("click", () => {
        let text = numButtons[i].textContent
        existingWords = typeNumber.textContent;
        console.log(existingWords.split(" ").length)
        if (existingWords.split(" ").length != 8) {
            typeNumber.innerHTML = (typeNumber.textContent + " " + text).trim();
        }
    });
}

undoButton.addEventListener("click", () => {
    let existingWords = typeNumber.textContent.split(" ");
    existingWords.pop();
    typeNumber.innerHTML = existingWords.join(" ").trim();
});

clearButton.addEventListener("click", () => {
    typeNumber.innerHTML = "";
});

easyButton.addEventListener("click", () => {
    loadScoreBoard();
    type = "word2num";
    startGame();
});

mediumButton.addEventListener("click", () => {
    loadScoreBoard();
    type = "num2word";
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