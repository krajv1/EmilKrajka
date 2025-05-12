const poll = new Map();

function addOption(option) {
    if (!option) {
        return `Option cannot be empty.`;
    }
    if (poll.has(option)) {
        return `Option "${option}" already exists.`;
    }
    poll.set(option, new Set());
    return `Option "${option}" added to the poll.`;
}

function vote(option, voterId) {
    if (!poll.has(option)) {
        return `Option "${option}" does not exist.`;
    }

    const voters = poll.get(option);

    if (voters.has(voterId)) {
        return `Voter ${voterId} has already voted for "${option}".`;
    }

    voters.add(voterId);
    return `Voter ${voterId} voted for "${option}".`;
}

function displayResults() {
    let results = `Poll Results:\n`;
    poll.forEach((voters, option) => {
        results += `${option}: ${voters.size} votes\n`;
    });
    return results.trim();
}


console.log(addOption("Turkey"));
console.log(addOption("Morocco"));
console.log(addOption("Malaysia"));

console.log(vote("Turkey", "traveler1"));
console.log(vote("Turkey", "traveler2"));
console.log(vote("Morocco", "traveler3"));
console.log(vote("Turkey", "traveler1")); 
console.log(vote("Nigeria", "traveler2"));

console.log(displayResults());
