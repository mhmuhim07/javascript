document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];
  let currentText = "";
  let score = 0;
  let currentIndex = -1;
  startBtn.addEventListener("click", () => {
    startBtn.classList.add("hidden");
    displayQ();
  });

  function displayQ() {
    questionContainer.classList.remove("hidden");
    ++currentIndex;
    if (currentIndex < questions.length) {
      renderQ(questions[currentIndex]);
    } else {
      resultContainer.classList.remove("hidden");
      questionContainer.classList.add("hidden");
      renderResult();
    }
  }

  function renderQ(Q) {
    choicesList.innerHTML = "";
    for (let i = 0; i < 4; i++) {
      let li = document.createElement("li");
      li.innerHTML = `${Q.choices[i]}`;
      choicesList.appendChild(li);
    }
    nextBtn.classList.remove("hidden");
  }
  choicesList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      currentText = e.target.innerText;
      console.log(currentText);
    }
  });
  nextBtn.addEventListener("click", () => {
    if (currentText) {
      if (currentText === questions[currentIndex].answer) score++;
      nextBtn.classList.add("hidden");
      displayQ();
    }
  });
  function renderResult() {
    scoreDisplay.innerText = score;
  }
  restartBtn.addEventListener("click", () => {
    currentText = "";
    score = 0;
    currentIndex = -1;
    resultContainer.classList.add("hidden");
    questionContainer.classList.add("hidden");
    startBtn.classList.remove("hidden");
  });
});
