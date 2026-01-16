const question = [
  {
    question: "Do we all",
    options: ["Answer a", "Answer b", "Answer c"],
    correct: 0,
  },
  {
    question: "learn defeat",
    options: ["Answer A", "Answer B", "Answer C"],
    correct: 1,
  },
  {
    question: "from the whores",
    options: ["Answer A", "Answer B", "Answer C"],
    correct: 2,
  },
  {
    question: "with bad feet?",
    options: ["Answer A", "Answer B", "Answer C"],
    correct: 0,
  },
  {
    question: "Beat the meat",
    options: ["Answer A", "Answer B", "Answer C"],
    correct: 1,
  },
  {
    question: "treat the feet",
    options: ["Answer A", "Answer B", "Answer C"],
    correct: 2,
  },
];

const userAnswers = new Array(question.length).fill(null);

const quizDiv = document.getElementById("quiz");

question.forEach((q, index) => {
  const questionHTML = `<div class="question">${q.question}</div>
    <div class="options">
      ${q.options
        .map(
          (option, i) =>
            `<div class="option" onclick="selectOption(${index}, ${i})">${option}</div>`
        )
        .join("")}
    </div>`;
  quizDiv.innerHTML += questionHTML;
});

function selectOption(questionIndex, optionIndex) {
  userAnswers[questionIndex] = optionIndex;
  const options = document.querySelectorAll(
    `.question:nth-child(${questionIndex * 2 + 2}) .option`
  );
  options.forEach((opt, i) => {
    opt.classList.toggle("selected", i === optionIndex);
  });
}

function checkAnswers() {
  let score = 0;
  questions.forEach((q, index) => {
    if (userAnswers[i] === q.correct) score++;
  });
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = "You scored " + score + " out of " + questions.length;
}
