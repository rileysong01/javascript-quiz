//declare global variables
var startButtonEl = document.querySelector("#startButton");
var MCAnswersEl = document.querySelector("#MCAnswers")
var promptEl = document.querySelector("#prompt")
var descriptionEl = document.querySelector("#description")
var ulEl = document.querySelector("ul")
var resultEl = document.querySelector("#result")
var scoreEl = document.querySelector("#score")
var score;
var MCQuestionNumber;
var SAQuestionNumber;
var userAnswer;
var formEl = document.querySelector("#input");
var countdownTimer;
var timeEl = document.querySelector('#time');
var initialsEl = document.querySelector("#initials")
var userInitials;
var leaderboardEl = document.querySelector("#leaderboard");
var LeaderboardDiv = document.querySelector("#leaderboardDiv")
var localScores = JSON.parse(localStorage.getItem("userScores")) || [];

//question banks
var MCQuestionBank = [
    { q: "What will the following code output: console.log(2 + 2);?", a1: "4", a2: "2", a3: "22", a4: "2^2", aCorrect: "4" },
    { q: "What does the keyword 'this' refer to", a1: "all global variables", a2: "nothing", a3: "the current object or context", a4: "the previous function call", aCorrect: "the current object or context" },
    { q: "Which keyword do you use to declare a variable", a1: "var", a2: "variable", a3: "V", a4: "v", aCorrect: "var" },
]

var SAQuestionBank = [
    { q: "Which data structure allow you to store an ordered collection of values? (Click enter to sumit your answer!)", aCorrect: "array" },
    { q: "A boolean can be one of two possible values: 'true' or '_____'. (Click enter to sumit your answer!)", aCorrect: "false" },
    { q: "In what year was JavaScript created? (Click enter to sumit your answer!)", aCorrect: "1995" }
]

//to start the quiz
startButtonEl.addEventListener("click", startQuiz)

function startQuiz() {
    startButtonEl.setAttribute("class", "hide");
    timeEl.removeAttribute("class")
    descriptionEl.setAttribute("class", "hide");
    initialsEl.innerHTML = "";
    leaderboardEl.innerHTML = "";
    LeaderboardDiv.setAttribute("class", "hide");
    countdownTimer = 120;
    setTime();
    MCQuestionNumber = 0;
    SAQuestionNumber = 0;
    score = 0;
    nextMCQuestion();
}

function setTime() {
    timeEl.textContent = "Timer: " + countdownTimer + "s";
    countdownTimer--;

    var timerInterval = setInterval(function () {
        timeEl.textContent = "Timer: " + countdownTimer + "s";
        countdownTimer--;

        //timer after the final question?
        if (countdownTimer <= 0) {
            clearInterval(timerInterval);
            timeEl.textContent = "";
            clearQuestion();
            endQuiz();
        }
    }, 1000);
}

//MC question setups
function nextMCQuestion() {
    clearQuestion();
    if (MCQuestionNumber < MCQuestionBank.length) {
        MCQuestionSetUp(MCQuestionNumber);
        MCQuestionNumber++;
    } else {
        nextSAQuestion();
    }
}

var MCQuestionSetUp = function (MCQuestionNumber) {
    ulEl.removeAttribute("class")
    promptEl.textContent = MCQuestionBank[MCQuestionNumber].q;
    var liEl1 = document.createElement("li");
    liEl1.id = "listid1"
    var liEl2 = document.createElement("li");
    liEl2.id = "listid2"
    var liEl3 = document.createElement("li");
    liEl3.id = "listid3"
    var liEl4 = document.createElement("li");
    liEl4.id = "listid4"

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
        ulEl.setAttribute("class", "hide")
        var clickedElement = event.target;
        var selectedAnswer = clickedElement.textContent;

        if (selectedAnswer === MCQuestionBank[MCQuestionNumber].aCorrect) {
            resultEl.textContent = "Correct!";
            score++;
        } else {
            resultEl.textContent = "Incorrect";
            countdownTimer -= 10
        }
        setTimeout(nextMCQuestion, 500);
    }
}

//SA question setups
function nextSAQuestion() {
    clearQuestion();
    if (SAQuestionNumber < SAQuestionBank.length) {
        SAQuestionSetUp(SAQuestionNumber);
        SAQuestionNumber++;
    } else {
        countdownTimer = 0;
    }
}

var SAQuestionSetUp = function (SAQuestionNumber) {
    promptEl.textContent = SAQuestionBank[SAQuestionNumber].q;
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.id = 'inputElID';
    formEl.appendChild(inputEl)

    inputEl.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            userAnswer = ((inputEl.value).toLowerCase()).trim();
            if (userAnswer === SAQuestionBank[SAQuestionNumber].aCorrect) {
                resultEl.textContent = "Correct!";
                score++;
            } else {
                resultEl.textContent = "Incorrect";
                countdownTimer -= 10
            }
            setTimeout(nextSAQuestion, 500);
        }
    });

}


//clear variables between questions
function clearQuestion() {
    promptEl.textContent = "";
    ulEl.innerHTML = "";
    resultEl.textContent = ""
    formEl.innerHTML = "";
}
 

//finishing quiz
var endQuiz = function () {
    timeEl.setAttribute("class", "hide")

    startButtonEl.removeAttribute("class");
    startButtonEl.textContent = "Click to play again!";

    promptEl.textContent = "Quiz Finished!";
    resultEl.textContent = "You scored " + score + "/" + (MCQuestionBank.length + SAQuestionBank.length) + "! Type your name and hit the enter key to save your score!";
    var getInitials = document.createElement("input")
    getInitials.setAttribute("type", "text");
    getInitials.id = 'initialsInput';

    initialsEl.appendChild(getInitials);

    getInitials.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            userInitials = getInitials.value;
            console.log(userInitials);

            var userInfo = { player: userInitials, score: score }
            localScores.push(userInfo);
            localStorage.setItem("userScores", JSON.stringify(localScores));
            renderLeaderboard();
        }
    });
}

//leaderboard
var renderLeaderboard = function () {
    LeaderboardDiv.removeAttribute("class")
    for (var i = 0; i < localScores.length; i++) {

        var liEl = document.createElement("li");
        liEl.textContent = "player " + localScores[i].player + " got a score of " + localScores[i].score + "!";
        leaderboardEl.append(liEl);
    }
}
