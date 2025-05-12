const questions = [
  {
    category: "Science",
    question: "What is the chemical symbol for water?",
    choices: ["O2", "H2O", "CO2"],
    answer: "H2O"
  },
  {
    category: "Geography",
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris"],
    answer: "Paris"
  },
  {
    category: "History",
    question: "Who was the first President of the United States?",
    choices: ["George Washington", "Abraham Lincoln", "Thomas Jefferson"],
    answer: "George Washington"
  },
  {
    category: "Math",
    question: "What is 5 + 3?",
    choices: ["5", "8", "10"],
    answer: "8"
  },
  {
    category: "Sports",
    question: "Which country won the 2018 FIFA World Cup?",
    choices: ["Brazil", "France", "Germany"],
    answer: "France"
  }
];
function getRandomQuestion(questions) {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}
function getRandomComputerChoice(choices) {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}
function getResults(question, computerChoice) {
  if (computerChoice === question.answer) {
    return "The computer's choice is correct!";
  } else {
    return `The computer's choice is wrong. The correct answer is: ${question.answer}`;
  }
}
const question = getRandomQuestion(questions);
const computerChoice = getRandomComputerChoice(question.choices);
const result = getResults(question, computerChoice);

console.log(`Question: ${question.question}`);
console.log(`Choices: ${question.choices.join(", ")}`);
console.log(`Computer's choice: ${computerChoice}`);
console.log(result);
