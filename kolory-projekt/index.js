// index.js
const chalk = require('chalk').default;

for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
        console.log(chalk.magenta(i));  // fioletowy
    } else if (i % 3 === 0) {
        console.log(chalk.red(i));      // czerwony
    } else if (i % 5 === 0) {
        console.log(chalk.blue(i));     // niebieski
    } else {
        console.log(i);                 // domyślny kolor
    }
}