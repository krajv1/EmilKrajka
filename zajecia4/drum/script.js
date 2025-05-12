const display = document.getElementById("display");
const drumPads = document.querySelectorAll(".drum-pad");

drumPads.forEach(pad => {
    pad.addEventListener("click", () => playSound(pad));
});

document.addEventListener("keydown", event => {
    const keyPressed = event.key.toUpperCase();
    const pad = document.querySelector(`.drum-pad > audio[id="${keyPressed}"]`)?.parentElement;
    if (pad) playSound(pad);
});

function playSound(pad) {
    const audio = pad.querySelector("audio");
    audio.currentTime = 0;
    audio.play();
    display.textContent = pad.id;
}
