import questions from "./questions.js";


let currentQuestionIndex;
let userScore;
let currentQuizQuestions;

const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const startQuiz = () => {
  currentQuestionIndex = 0;
  userScore = 0;
  currentQuizQuestions = shuffleArray(questions);
  quizContainer.removeChild(quizContainer.lastChild);
  renderQuestion(questions[currentQuestionIndex]);
};


const startButton = document.createElement("button");
startButton.textContent = "Начать";
startButton.id = "start-button";

startButton.addEventListener("click", startQuiz);
quizContainer.appendChild(startButton);

function renderQuestion(question) {
  const questionContainer = document.createElement("div");
  questionContainer.classList.add("question-container");
  questionContainer.textContent = `
		${currentQuestionIndex + 1}. ${question.question}
	`;

  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("options-container");

  question.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.textContent = option;

    optionElement.addEventListener(
      "click",
      handleAnswer(
        index,
        questionContainer,
        question.correctIndex,
        question.explanation
      )
    );

    optionsContainer.appendChild(optionElement);
  });

  questionContainer.appendChild(optionsContainer);
  quizContainer.appendChild(questionContainer);
}

const showResult = () => {
  resultContainer.textContent = `Вы ответили правильно на ${userScore} из ${questions.length} вопросов.`;
}

const handleAnswer = (
  selectedIndex,
  questionContainer,
  correctIndex,
  explanation
) => () => {
  const optionsContainer = questionContainer.querySelector(".options-container");
  const options = optionsContainer.querySelectorAll(".option");

	if (selectedIndex === correctIndex) {
		userScore++;
	}
  // Отмечаем ответы красным или зеленым цветом
  options.forEach((option, index) => {
    let timeout = 1000;
    if (index === correctIndex) {
      option.classList.add("correct");
      timeout = 3000;
    } else {
      option.classList.add("incorrect");
    }
    setTimeout(() => {
      option.animate(
        { transform: "translateX(1000%)", opacity: 0 },
        { duration: 5000, fill: "forwards", easing: "ease" }
      );
    }, timeout);
  });

  optionsContainer.style.pointerEvents = "none"; // клик

  const explanationNode = document.createElement("div");
  explanationNode.innerHTML = explanation;

  questionContainer.appendChild(explanationNode);

  // Отмет вопрос
  questionContainer.classList.add(
    selectedIndex === correctIndex ? "correct" : "incorrect"
  );


  const resultMark = document.createElement("div");
  resultMark.classList.add(
    "result-mark",
    selectedIndex === correctIndex ? "correct" : "incorrect"
  );
  resultMark.textContent = selectedIndex === correctIndex ? "✓" : "✗";
  questionContainer.insertBefore(resultMark, questionContainer.firstChild);

  setTimeout(() => {

    const options = document.querySelectorAll(".option");

//    optionsContainer.style.overflow = "hidden";
    options.forEach((option, index) => {
      if (index !== correctIndex) {
        option.style.height = "0";
      }
    });

    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        while (quizContainer.firstChild) {
          quizContainer.removeChild(quizContainer.lastChild);
        }
        renderQuestion(questions[currentQuestionIndex]);
      } else {
        showResult();
      }
    }, 500);
  }, 4000);
}
