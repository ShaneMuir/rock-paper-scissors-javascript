import { getComputerChoice, getRoundOutcome, CHOICES } from "./game.js";
import { setResult, updateScore, highlightChoices, clearChoiceHighlights } from "./ui.js";
import { loadStats, saveStats } from "./storage.js";
import { sfx } from "./sounds.js";

const buttons = document.querySelectorAll('[data-choice]');
const resultText = document.getElementById('round-result');
const scoreText = document.getElementById('score');
const resetBtn = document.getElementById('reset');

const WIN_SCORE = 5;

let playerScore = 0;
let computerScore = 0;

let stats = loadStats();

function endGame() {
    buttons.forEach(btn => (btn.disabled = true));
    resetBtn.classList.remove('hidden');

    const outcome = playerScore > computerScore ? "win" : "lose";
    setResult(resultText, {
        outcome,
        message: outcome === "win" ? "🎉 You won the game!" : "💀 Computer wins the game!",
    });

    stats.games += 1;
    if (outcome === "win") stats.player += 1;
    else stats.computer += 1;
    saveStats(stats);
}

function checkWinner() {
    if (playerScore === WIN_SCORE || computerScore === WIN_SCORE) endGame();
}

function play(playerChoice) {
    if (playerScore === WIN_SCORE || computerScore === WIN_SCORE) return;

    sfx.click();

    const computerChoice = getComputerChoice();
    const round = getRoundOutcome(playerChoice, computerChoice);

    if (round.outcome === "win") { playerScore++; sfx.win(); }
    if (round.outcome === "lose") { computerScore++; sfx.lose(); }
    if (round.outcome === "draw") { sfx.draw(); }

    setResult(resultText, round);
    updateScore(scoreText, playerScore, computerScore);
    highlightChoices(buttons, playerChoice, round.outcome);

    checkWinner();
}

buttons.forEach(button => {
    button.addEventListener('click', () => play(button.dataset.choice));
});

resetBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;

    updateScore(scoreText, playerScore, computerScore);
    setResult(resultText, { outcome: "draw", message: "Make your move!" });

    clearChoiceHighlights(buttons);
    resetBtn.classList.add('hidden');
    buttons.forEach(btn => (btn.disabled = false));
});

// Keyboard controls: R / P / S
document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key === "r") play("rock");
    if (key === "p") play("paper");
    if (key === "s") play("scissors");
});

// Optional: show historic stats in console (or add to UI)
console.log("RPS lifetime stats:", stats);