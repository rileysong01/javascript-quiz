var startButtonEl = document.querySelector("#startButton");
var MCAnswersEl = document.querySelector("#MCAnswers")
var promptEl = document.querySelector("#prompt")
var ulEl = document.querySelector("ul")
var liEl1;
var liEl2;
var liEl3;
var liEl4;

var MCQuestionBank = [
    { q: "1+1?", a1: "8", a2: "4", a3: "9", a4: "2", aCorrect: "2" },
    { q: "fruit?", a1: "?", a2: "apple", a3: "?", a4: "cat", aCorrect: "apple" },
    // {q: "pompompurin?", a: "fat"},
    // {q: "hello kitty?", a: "kitty"}
]

var countdownTimer;

//click start button to start quiz
startButtonEl.addEventListener("click", startQuiz)

function startQuiz() {
    startButtonEl.style.display = "none";
    countdownTimer = 200;

    MCQuestionSetUp(0);
    // MCQuestionSetUp(1);

}

//timer 

//questions (multiple choice, short answer)
//render MC options as li

var MCQuestionSetUp = function (questionNumber) {
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

    liEl1.addEventListener("click", function() {
        if (liEl1.textContent === MCQuestionBank[questionNumber].aCorrect) {
            console.log("yay")
        } else {
            console.log("nay")
        }
    })

    liEl2.addEventListener("click", function() {
        if (liEl2.textContent === MCQuestionBank[questionNumber].aCorrect) {
            console.log("yay")
        } else {
            console.log("nay")
        }
    })

    liEl3.addEventListener("click", function() {
        if (liEl3.textContent === MCQuestionBank[questionNumber].aCorrect) {
            console.log("yay")
        } else {
            console.log("nay")
        }
    })

    liEl4.addEventListener("click", function() {
        if (liEl4.textContent === MCQuestionBank[questionNumber].aCorrect) {
            console.log("yay")
        } else {
            console.log("nay")
        }
    })
}


// click MC answer


//wrong answer subtracts time from clock

//end of quiz (all questions answered OR timer hit 0)

//type my initials and save score
//clear scores?