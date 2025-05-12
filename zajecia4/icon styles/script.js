document.addEventListener("DOMContentLoaded", () => {
    const favoriteButtons = document.querySelectorAll(".favorite-icon");

    favoriteButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("filled");
            button.innerHTML = button.classList.contains("filled") ? "&#10084;" : "&#9825;";
        });
    });
});
