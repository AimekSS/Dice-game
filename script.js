"use strict";

// Element selector
const playerEl0 = document.querySelector(".player--0");
const playerEl1 = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const currentEl0 = document.getElementById("current--0");
const currentEl1 = document.getElementById("current--1");

let scores, currentScore, activePlayer, isTheGamePlaying;

// Start
function Init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isTheGamePlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add("hidden");
  playerEl0.classList.add("player--active");
  playerEl0.classList.remove("player--winner");
  playerEl1.classList.remove("player--winner");
}

Init();

function SwitchPlayer() {
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle("player--active");
  playerEl1.classList.toggle("player--active");
}

// Game functionality
btnNew.addEventListener("click", Init);

btnRoll.addEventListener("click", function () {
  if (isTheGamePlaying) {
    // Generate randowm number for a dice
    const randomDiceRoll = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${randomDiceRoll}.png`;
    // Conditions checks
    if (randomDiceRoll !== 1) {
      currentScore += randomDiceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      SwitchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (isTheGamePlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      diceEl.classList.add("hidden");
      isTheGamePlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      SwitchPlayer();
    }
  }
});
