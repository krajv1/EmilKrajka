const footballTeam = {
    team: "FC Legends",
    year: 2024,
    headCoach: "John Doe",
    players: [
        { name: "Lionel Messi", position: "forward", isCaptain: false },
        { name: "Cristiano Ronaldo", position: "forward", isCaptain: true },
        { name: "Paul Pogba", position: "midfielder", isCaptain: false },
        { name: "Virgil van Dijk", position: "defender", isCaptain: false },
        { name: "Manuel Neuer", position: "goalkeeper", isCaptain: false }
    ]
};
const teamElement = document.getElementById("team");
const yearElement = document.getElementById("year");
const headCoachElement = document.getElementById("head-coach");
const playerCardsContainer = document.getElementById("player-cards");
const positionSelect = document.getElementById("position-select");

teamElement.textContent = footballTeam.team;
yearElement.textContent = footballTeam.year;
headCoachElement.textContent = footballTeam.headCoach;

function displayPlayers(position) {
    playerCardsContainer.innerHTML = ""; // Clear previous results

    const filteredPlayers = position === "all" 
        ? footballTeam.players 
        : footballTeam.players.filter(player => player.position === position);

    filteredPlayers.forEach(player => {
        const playerCard = document.createElement("div");
        playerCard.classList.add("player-card");

        const playerName = document.createElement("h2");
        playerName.textContent = player.isCaptain ? `(Captain) ${player.name}` : player.name;

        const playerPosition = document.createElement("p");
        playerPosition.textContent = `Position: ${player.position}`;

        playerCard.appendChild(playerName);
        playerCard.appendChild(playerPosition);
        playerCardsContainer.appendChild(playerCard);
    });
}

displayPlayers("all");

positionSelect.addEventListener("change", (event) => {
    displayPlayers(event.target.value);
});