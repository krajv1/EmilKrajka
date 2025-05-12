const textInput = document.getElementById("text-input");
const charCount = document.getElementById("char-count");

const maxChars = 50;

textInput.addEventListener("input", () => {
    let currentLength = textInput.value.length;

    if (currentLength > maxChars) {
        textInput.value = textInput.value.substring(0, maxChars);
        currentLength = maxChars;
    }

    charCount.textContent = `Character Count: ${currentLength}/${maxChars}`;

    charCount.classList.toggle("red", currentLength === maxChars);
});
