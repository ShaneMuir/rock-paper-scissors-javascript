export function setResult(el, { outcome, message }) {
    el.classList.remove("result--win", "result--lose", "result--draw", "anim-pop", "anim-shake");
    el.textContent = message;

    if (outcome === "win") el.classList.add("result--win", "anim-pop");
    if (outcome === "lose") el.classList.add("result--lose", "anim-shake");
    if (outcome === "draw") el.classList.add("result--draw", "anim-pop");
}

export function updateScore(el, player, computer) {
    el.textContent = `Player: ${player} | Computer: ${computer}`;
}

export function clearChoiceHighlights(buttons) {
    buttons.forEach(b => b.classList.remove("choice--win", "choice--lose", "choice--draw"));
}

export function highlightChoices(buttons, playerChoice, outcome) {
    clearChoiceHighlights(buttons);
    const btn = Array.from(buttons).find(b => b.dataset.choice === playerChoice);
    if (!btn) return;

    if (outcome === "win") btn.classList.add("choice--win");
    if (outcome === "lose") btn.classList.add("choice--lose");
    if (outcome === "draw") btn.classList.add("choice--draw");
}