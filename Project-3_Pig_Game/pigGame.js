'use strict';

//Selecting Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//Setting the initial condition
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');
// let currentScore = 0;
// const scores = [0, 0];
// let activePlayer = 0;
// let playing = true;

//Switch Player Function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let currentScore, scores, activePlayer, playing;
// Initialization Function
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');

  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
};
init();
//Rolling Dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    //Generating random dice roll
    const diceNo = Math.floor(Math.random() * 6) + 1;

    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNo}.png`;

    //Check for rolled 1

    if (diceNo !== 1) {
      //Add dice to current score
      currentScore += diceNo;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch player
      document.getElementById(`score--${activePlayer}`).textContent = 0;
      scores[activePlayer] = 0;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 40) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    }
    //Switch to the next player
    switchPlayer();
  }
});

btnNew.addEventListener('click', () => {
  init();
});
