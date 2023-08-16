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
var leaderboardEl = document.querySelector('#leaderboard');
var LeaderboardDiv = document.querySelector('#leaderboardDiv')

var localScores = JSON.parse(localStorage.getItem("userScores")) || [];

var MCQuestionBank = [
    { q: "what is the name of rileys favoriate sanrio character?", a1: "huh", a2: "crumi", a3: "kuromi", a4: "calamity", aCorrect: "kuromi" },
    { q: "who is hello kittys boyfriend", a1: "daniel", a2: "huh", a3: "charles", a4: "pompompurin", aCorrect: "daniel" },
    { q: "when is kuromis birthday", a1: "huh", a2: "october 31", a3: "december 25", a4: "october 17", aCorrect: "october 31" },
]

var SAQuestionBank = [
    { q: "never give up never what", aCorrect: "never back down" },
    { q: "is pompompurin skinny or fat", aCorrect: "fat" }
]

//click start button to start quiz
startButtonEl.addEventListener("click", startQuiz)

function startQuiz() {
    startButtonEl.setAttribute("class", "hide");
    initialsEl.innerHTML = "";
    leaderboardEl.innerHTML= "";
    LeaderboardDiv.setAttribute("class", "hide");
    countdownTimer = 120;
    setTime();
    MCQuestionNumber = 0;
    SAQuestionNumber = 0;
    score = 0;
    nextMCQuestion();
}

function setTime() {
    var timerInterval = setInterval(function () {
        timeEl.textContent = countdownTimer + " seconds left.";
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
    ulEl.removeAttribute("class")
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
        setTimeout(nextMCQuestion, 1000);
    }
}



//wrong answer subtracts time from clock

//end of quiz (all questions answered OR timer hit 0)
var endQuiz = function () {
    startButtonEl.removeAttribute("class");
    startButtonEl.textContent = "Click to play again!";

    promptEl.textContent = "Quiz Finished!";
    resultEl.textContent = "Your score is" + score + "! Type your name below to save your score!";
    var getInitials = document.createElement("input")
    getInitials.setAttribute("type", "text");

    initialsEl.appendChild(getInitials);

    getInitials.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            userInitials = getInitials.value;
            console.log(userInitials);

            var userInfo = { player:userInitials, score: score}
            localScores.push(userInfo);
            localStorage.setItem("userScores", JSON.stringify(localScores));
            renderLeaderboard();
        }
    });
}

var renderLeaderboard = function() {
    LeaderboardDiv.removeAttribute("class")
    for (var i = 0; i <localScores.length; i++) {

        var liEl = document.createElement("li");
        liEl.textContent = "player " + localScores[i].player + " got a score of " + localScores[i].score +"!";
        leaderboardEl.append(liEl);
    }
}


//type my initials and save score
//clear scores