import { questions } from "./questions.js";

let currentQuestionIndex = 0;
let score = 0;
let audioContext;
let audioBuffer;

async function loadAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const response = await fetch("../Medie/korn-twist-audiotrimmer.mp3");
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  } catch (error) {
    console.error("Error loading audio:", error);
  }
}

function playAudio() {
  if (!audioBuffer) return;
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start(0);
}

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
  playAudio(); // Play sound using Web Audio API
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
