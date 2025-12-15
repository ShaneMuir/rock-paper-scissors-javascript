// Uses Web Audio (no files needed)
let ctx;

function beep(freq = 440, duration = 0.08, type = "sine", volume = 0.04) {
    try {
        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.value = volume;

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch {
        // audio blocked or unsupported
    }
}

export const sfx = {
    win() { beep(740, 0.09); beep(880, 0.11); },
    lose() { beep(220, 0.12, "square"); beep(160, 0.12, "square"); },
    draw() { beep(440, 0.10, "triangle"); },
    click() { beep(520, 0.04, "sine", 0.03); },
};