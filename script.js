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
var questionNumber = 0;

var MCQuestionBank = [
    { q: "1+1?", a1: "8", a2: "4", a3: "9", a4: "2", aCorrect: "2" },
    { q: "fruit?", a1: "?", a2: "apple", a3: "?", a4: "cat", aCorrect: "apple" },
    {q: "pompompurin?", a1: "fat", a2: "huh", a3: "skinny", a4: "hehe", aCorrect: "fat"},
    {q: "hello kitty's nickname?", a1:"HK", a2:"stinky", a3: "daniel", a4: "kitty", aCorrect: "kitty"},
    {q: "pompompurin?", a1: "fat", a2: "huh", a3: "skinny", a4: "hehe", aCorrect: "fat"},
    {q: "name of the imp with black ears?", a1:"crumi", a2:"calamity", a3: "kuromi", a4: "kuropi", aCorrect: "kuromi"}
]
var countdownTimer;

//click start button to start quiz
startButtonEl.addEventListener("click", startQuiz)

function startQuiz() {
    startButtonEl.style.display = "none";
    countdownTimer = 200;
    questionNumber = 0;
    score = 0;
    nextQuestion();
}

function nextQuestion() {
    clearQuestion();
    if (questionNumber < MCQuestionBank.length) {
        MCQuestionSetUp(questionNumber);
        questionNumber++;
    } else {
        console.log("move on to short answer!")
    }
}

function clearQuestion() {
    promptEl.textContent = "";
    ulEl.innerHTML = "";
    resultEl.textContent = ""
}
//timer 


var MCQuestionSetUp = function(questionNumber) {
    promptEl.textContent = MCQuestionBank[questionNumber].q;
    var liEl1 = document.createElement("li");
    var liEl2 = document.createElement("li");
    var liEl3 = document.createElement("li");
    var liEl4 = document.createElement("li");

    liEl1.textContent = MCQuestionBank[questionNumber].a1;
    liEl2.textContent = MCQuestionBank[questionNumber].a2;
    liEl3.textContent = MCQuestionBank[questionNumber].a3;
    liEl4.textContent = MCQuestionBank[questionNumber].a4;

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

        if (selectedAnswer === MCQuestionBank[questionNumber].aCorrect) {
            resultEl.textContent = "Correct!";
            score++;
        } else {
            resultEl.textContent = "Incorrect";
        }
        setTimeout(nextQuestion, 1000);
    }
}



//wrong answer subtracts time from clock

//end of quiz (all questions answered OR timer hit 0)

//type my initials and save score
//clear scores?