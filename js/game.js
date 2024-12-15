const level = localStorage.getItem("result") || "medium";
//
const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answersList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const questionNumber = document.getElementById("question-number");
let CORRECT_BONUS = 10;
const BASE_URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

let formattedData = null;
let questionIndex = 0;
let correctedAnswer = null;
let isAccepted = true;
let score = 0;

const formatData = (questionData) => {
  console.log(questionData);
  const result = questionData.map((item) => {
    const questionObject = { question: item.question };
    const answers = [...item.incorrect_answers];
    const correctedAnswerIndex = Math.floor(Math.random() * 4);
    answers.splice(correctedAnswerIndex, 0, item.correct_answer);
    questionObject.answers = answers;
    questionObject.correctedAnswerIndex = correctedAnswerIndex;
    return questionObject;
  });
  return result;
};
const fetchData = async () => {
  const response = await fetch(BASE_URL);
  const json = await response.json();
  formattedData = json;
  formattedData = formatData(json.results);

  start();
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  const { question, answers, correctedAnswerIndex } =
    formattedData[questionIndex];
  correctedAnswer = correctedAnswerIndex;
  console.log(correctedAnswer);
  questionNumber.innerText = questionIndex + 1;
  questionText.innerText = question;
  answersList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};
const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;
  const correctAnswer = correctedAnswer === index ? true : false;
  if (correctAnswer) {
    event.target.classList.add("correct");
    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answersList[correctedAnswer].classList.add("correct");
  }
};
const nextHandler = () => {
  questionIndex++;
  if (questionIndex < formattedData.length) {
    showQuestion();
    removeClasses();
    isAccepted = true;
  } else {
    finishHandler();
  }
};

const removeClasses = () => {
  answersList.forEach((button) => (button.className = "answer-text"));
};

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("/end.html");
};

window.addEventListener("load", fetchData);
answersList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index));
});
nextButton.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);
