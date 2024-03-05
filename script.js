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

let totalScores, winScore, currentScore, activePlayer, isPlaying;


const initGame = function () {
    totalScores = [0, 0];
    winScore = 100;
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;
       
    scoreElement0.textContent = 0;
    scoreElement1.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    
    playerElement0.classList.remove('player--winner');
    playerElement1.classList.remove('player--winner');
    playerElement0.classList.remove('player--active');
    playerElement1.classList.remove('player--active');
    playerElement0.classList.add('player--active');
    diceElement.classList.add('hidden');

    btnNew.addEventListener('click', initGame);
    btnRoll.addEventListener('click', rollDice);
    btnHold.addEventListener('click', holdScore);
    document.addEventListener('click', checkWinner);
};

const switchActivePlayer = () => {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerElement0.classList.toggle('player--active');
    playerElement1.classList.toggle('player--active');
};

const rollDice = () => {
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

const holdScore = () => {
    // 1. Add current score to active player total score
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];

    //2. If total score of active player >= winScore variable, active player won, if not switch active player 
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

const checkWinner = () => {
    if (!isPlaying) {
        btnRoll.removeEventListener('click', rollDice);
        btnHold.removeEventListener('click', holdScore);
    }
};

//Start game
document.addEventListener('DOMContentLoaded', () => {
    initGame();
});

