// JS/Quiz.js
import { questions } from "./questions.js";
import { playKornAudio, loadAudio } from "./KornAudio.js";

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question").textContent = question.question;
  const optionBtns = document.querySelectorAll(".option-btn");
  optionBtns.forEach((btn, index) => {
    btn.textContent = question.options[index];
  });
}

function selectOption(index) {
  const question = questions[currentQuestionIndex];
  if (index === question.correct) {
    score++;
  }
  playKornAudio(); // Play sound using Web Audio API
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("question-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";
  document.getElementById("score").textContent =
    `You scored ${score} out of ${questions.length}`;
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadAudio(); // Load audio buffer on page load

  document.querySelectorAll(".option-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectOption(parseInt(btn.dataset.index));
    });
  });

  document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result-container").style.display = "none";
    document.getElementById("question-container").style.display = "block";
    loadQuestion();
  });

  // Initial load
  loadQuestion();
});
