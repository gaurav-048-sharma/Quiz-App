const questions = [
    {
        question : "Which is the largest animal in the world",
        answers: [
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
            {text: "Lion", correct: false}
        ]
    },
    {
        question : "Which is the smallest country in the world",
        answers: [
            {text: "Monaco", correct: false},
            {text: "Nauru", correct: false},
            {text: "Tuvalu", correct: false}
            {text: "Vatican City", correct: true},
        ]
    },
    {
        question : "Which is the largest planet in our solar system",
        answers: [
            {text: "Saturn", correct: false},
            {text: "Uranus", correct: false},
            {text: "Jupiter", correct: true},
            {text: "Neptune", correct: false}
        ]
    },
    {
        question : "Which is the largest mammal in the world",
        answers: [
            {text: "Fin whale", correct: false},
            {text: "Humpback whale", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Sperm whale", correct: false}
        ]
    },
    {

    }
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex =0;
    score= 0;
    nextBtn.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState() {
    nextBtn.style.display = "none";
    while(answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    } 
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `
        you scored ${score} out of ${questions.length}!
    `;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});
startQuiz();