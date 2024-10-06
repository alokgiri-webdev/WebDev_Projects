'use strict';
//Implementing the Game logic

//Generating the Random Number
let secretNumber = Math.floor(Math.random() * 20) + 1;

//Setting the Score initial value
let score = 20;

//Setting the initial highscore
let highScore = 0;

//Creating functions
function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click', () => {
  const guess = +document.querySelector('.guess').value;
  console.log(guess, typeof guess);

  if (!guess) {
    displayMessage('⛔ No Number!');
  } else if (guess === secretNumber) {
    displayMessage('Hurray! Correct No. 😍');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        guess < secretNumber ? 'Guess is too low!' : 'Guess is too high!'
      );
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('You lose the game! 🤦‍♂️');
      document.querySelector('.score').textContent = 0;
    }
  }
});

//Implementing Again / Reset
document.querySelector('.again').addEventListener('click', () => {
  score = 20;
  document.querySelector('.score').textContent = score;
  secretNumber = Math.floor(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
