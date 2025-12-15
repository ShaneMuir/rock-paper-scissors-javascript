export const CHOICES = ["rock", "paper", "scissors"];

export function getComputerChoice() {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

export function getRoundOutcome(player, computer) {
    if (player === computer) return { outcome: "draw", message: `Draw! You both chose ${player}.` };

    const win =
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper");

    return win
        ? { outcome: "win", message: `You win! ${player} beats ${computer}.` }
        : { outcome: "lose", message: `You lose! ${computer} beats ${player}.` };
}