'use strict';

// Elements selection
const scoreElement0 = document.getElementById('score--0'); 
const scoreElement1 = document.getElementById('score--1'); 
const currentScore0 = document.getElementById('current--0'); 
const currentScore1 = document.getElementById('current--1'); 
const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerElement0 = document.querySelector('.player--0');
const playerElement1 = document.querySelector('.player--1');

//Game initial conditions
scoreElement0.textContent = '0';
scoreElement1.textContent = '0';
diceElement.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
const totalScores = [0, 0];



//Roll the dice
btnRoll.addEventListener('click', function () {
    //1. Generate a random number
    const diceNumber = Math.trunc(Math.random()*6) +1;
    //2. Display number on the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `images/dice${diceNumber}.png`
    //3. If the number is 1, switch to the next player
    if (diceNumber != 1){
        currentScore += diceNumber;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else{
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        activePlayer = activePlayer === 0 ? 1 : 0;
        playerElement0.classList.toggle('player--active');
        playerElement1.classList.toggle('player--active');
    }
});