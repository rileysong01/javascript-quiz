var startButtonEl = document.querySelector("#startButton");
var MCAnswersEl = document.querySelector("#MCAnswers")
var promptEl = document.querySelector("#prompt")
var ulEl = document.querySelector("ul")
var resultEl = document.querySelector("#result")
var liEl1;
var liEl2;
var liEl3;
var liEl4;
var scoreEl = document.querySelector("#score")
var score = 0;
var MCQuestionNumber;
var SAQuestionNumber;
var userAnswer;
var formEl = document.querySelector("#input");
var countdownTimer;
var timeEl = document.querySelector('#time');
var initialsEl = document.querySelector('#initials')
var userInitials;

var MCQuestionBank = [
    { q: "1+1?", a1: "8", a2: "4", a3: "9", a4: "2", aCorrect: "2" },
    { q: "2+2?", a1: "100", a2: "4", a3: "200", a4: "cat", aCorrect: "apple" },
    { q: "3+3?", a1: "6", a2: "100", a3: "200", a4: "hehe", aCorrect: "6" },
]

var SAQuestionBank = [
    { q: "yesssss", aCorrect: "yes" },
    { q: "nooooo", aCorrect: "no" }
]

//click start button to start quiz
startButtonEl.addEventListener("click", startQuiz)

function startQuiz() {
    startButtonEl.style.display = "none";
    countdownTimer = 200;
    setTime();
    MCQuestionNumber = 0;
    SAQuestionNumber = 0;
    score = 0;
    nextMCQuestion();
}

function setTime() {
    var timerInterval = setInterval(function () {
        countdownTimer--;
        timeEl.textContent = countdownTimer + " seconds left.";

        //not working
        if (countdownTimer === 0) {
            clearInterval(timerInterval);
    
        }
    }, 1000);
}

//displays next MC question
function nextMCQuestion() {
    clearQuestion();
    if (MCQuestionNumber < MCQuestionBank.length) {
        MCQuestionSetUp(MCQuestionNumber);
        MCQuestionNumber++;
    } else {
        nextSAQuestion();
        console.log(score);
    }
}

//displays next SA question
function nextSAQuestion() {
    clearQuestion();
    if (SAQuestionNumber < SAQuestionBank.length) {
        SAQuestionSetUp(SAQuestionNumber);
        SAQuestionNumber++;
    } else {
        countdownTimer = 0;
    }
}

function clearQuestion() {
    promptEl.textContent = "";
    ulEl.innerHTML = "";
    resultEl.textContent = ""
    formEl.innerHTML = "";
}
//timer 

var SAQuestionSetUp = function (SAQuestionNumber) {
    promptEl.textContent = SAQuestionBank[SAQuestionNumber].q;
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    formEl.appendChild(inputEl)

    inputEl.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            userAnswer = (inputEl.value).toString();
            if (userAnswer === SAQuestionBank[SAQuestionNumber].aCorrect) {
                resultEl.textContent = "Correct!";
                score++;
            } else {
                resultEl.textContent = "Incorrect";
                countdownTimer -= 10
            }
            setTimeout(nextSAQuestion, 1000);
        }
    });

}

var MCQuestionSetUp = function (MCQuestionNumber) {
    promptEl.textContent = MCQuestionBank[MCQuestionNumber].q;
    var liEl1 = document.createElement("li");
    var liEl2 = document.createElement("li");
    var liEl3 = document.createElement("li");
    var liEl4 = document.createElement("li");

    liEl1.textContent = MCQuestionBank[MCQuestionNumber].a1;
    liEl2.textContent = MCQuestionBank[MCQuestionNumber].a2;
    liEl3.textContent = MCQuestionBank[MCQuestionNumber].a3;
    liEl4.textContent = MCQuestionBank[MCQuestionNumber].a4;

    ulEl.appendChild(liEl1);
    ulEl.appendChild(liEl2);
    ulEl.appendChild(liEl3);
    ulEl.appendChild(liEl4);

    liEl1.addEventListener("click", checkAnswer);
    liEl2.addEventListener("click", checkAnswer);
    liEl3.addEventListener("click", checkAnswer);
    liEl4.addEventListener("click", checkAnswer);

    function checkAnswer(event) {
        var clickedElement = event.target;
        var selectedAnswer = clickedElement.textContent;

        if (selectedAnswer === MCQuestionBank[MCQuestionNumber].aCorrect) {
            resultEl.textContent = "Correct!";
            score++;
        } else {
            resultEl.textContent = "Incorrect";
            countdownTimer -= 10
        }
        setTimeout(nextMCQuestion, 1000);
    }
}



//wrong answer subtracts time from clock

//end of quiz (all questions answered OR timer hit 0)
var endQuiz = function () {
    promptEl.textContent = "Quiz Finished!";
    resultEl.textContent = "your score" + score;
    var getInitials = document.createElement("input")
    getInitials.setAttribute("type", "text");

    initialsEl.appendChild(getInitials);

    getInitials.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            userInitials = (getInitials.value).toString();
        }
    });

    console.log(userInitials);
}



//type my initials and save score
//clear scores