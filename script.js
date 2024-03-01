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

let isPlaying = true;
let currentScore = 0;
let activePlayer = 0;
const winScore = 10;
const totalScores = [0, 0];


const switchActivePlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerElement0.classList.toggle('player--active');
    playerElement1.classList.toggle('player--active');
};


const rollDice = function () {
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
        switchActivePlayer();
    }
};

const holdScore = function () {
    // 1. Add current score to active player total score
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];

    /* 2. If total score of active player >= winScore variable, active player won, 
    if not switch active player*/     
    if (totalScores[activePlayer] >= winScore){
        isPlaying = false;
        diceElement.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    }
    else{
        switchActivePlayer();
    }
};


document.addEventListener('click', function () {
    if (!isPlaying){
        btnRoll.removeEventListener('click', rollDice);
        btnHold.removeEventListener('click', holdScore);
    }
    else{
        btnRoll.addEventListener('click', rollDice);
        btnHold.addEventListener('click', holdScore);
    };
});

