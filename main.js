document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menu toggle for mobile
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");
  if (menuToggle && navbar) {
    const setMenuState = (isOpen) => {
      navbar.classList.toggle("active", isOpen);
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = navbar.classList.contains("active");
      setMenuState(!isOpen);
    });

    navbar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuState(false));
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        setMenuState(false);
      }
    });
  }

  // Typing effect for the words (only if .typing-text span exists)
  const words = ["Introvert", "Developer", "Photographer", "Editor", "Learner"];
  let i = 0;
  let j = 0;
  let isDeleting = false;
  const span = document.querySelector(".typing-text span");

  function type() {
    if (!span) return;
    const current = words[i];
    if (isDeleting) {
      span.textContent = current.substring(0, j--);
      if (j < 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
        setTimeout(type, 400);
      } else {
        setTimeout(type, 60);
      }
    } else {
      span.textContent = current.substring(0, j++);
      if (j > current.length) {
        isDeleting = true;
        setTimeout(type, 1200);
      } else {
        setTimeout(type, 120);
      }
    }
  }
  type();

  // --- Game logic: Only run if on games page ---
  const guessBtn = document.getElementById("guess-btn");
  const resetBtn = document.getElementById("reset-btn");
  if (guessBtn && resetBtn) {
    let answer = Math.floor(Math.random() * 10) + 1;

    guessBtn.addEventListener("click", checkGuess);
    resetBtn.addEventListener("click", resetGame);

    function checkGuess() {
      const guessInput = document.getElementById("guess-input");
      const guess = Number(guessInput.value);
      const result = document.getElementById("game-result");
      if (
        guessInput.value.trim() === "" ||
        isNaN(guess) ||
        guess < 1 ||
        guess > 10
      ) {
        result.textContent = "Enter a number between 1 and 10!";
        result.style.color = "#ffd6e0";
        return;
      }
      if (guess === answer) {
        result.textContent = "🎉 Correct! You guessed it!";
        result.style.color = "#43d9ad";
      } else if (guess < answer) {
        result.textContent = "Too low! Try again.";
        result.style.color = "#eebbc3";
      } else {
        result.textContent = "Too high! Try again.";
        result.style.color = "#eebbc3";
      }
    }

    function resetGame() {
      answer = Math.floor(Math.random() * 10) + 1;
      document.getElementById("game-result").textContent = "";
      document.getElementById("guess-input").value = "";
    }
  }
});

// --- Rock, Paper, Scissors Game ---
const rpsMoves = ["Rock", "Paper", "Scissors"];
const rpsResult = document.getElementById("rps-result");
const rpsBtns = [
  document.getElementById("rps-rock"),
  document.getElementById("rps-paper"),
  document.getElementById("rps-scissors"),
];

if (rpsBtns.every((btn) => btn)) {
  rpsBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      const userMove = rpsMoves[idx];
      const computerMove = rpsMoves[Math.floor(Math.random() * 3)];
      let outcome = "";
      if (userMove === computerMove) {
        outcome = "It's a draw! 🤝";
      } else if (
        (userMove === "Rock" && computerMove === "Scissors") ||
        (userMove === "Paper" && computerMove === "Rock") ||
        (userMove === "Scissors" && computerMove === "Paper")
      ) {
        outcome = `You win! 🎉 ${userMove} beats ${computerMove}`;
      } else {
        outcome = `You lose! 😢 ${computerMove} beats ${userMove}`;
      }
      rpsResult.innerHTML = `You: ${userMove} | Computer: ${computerMove}<br>${outcome}`;
      rpsResult.style.color = "#ffd6e0";
    });
  });
}
