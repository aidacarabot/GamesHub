import "./RockPaperScissors.css";
import { printBg } from '../../components/WhiteNoiseBg/WhiteNoiseBg.js';
import { createGameTitle } from "../../components/GameTitle/GameTitle";
import { createRestartButton } from "../../components/Restart/Restart";
import { createBackButton } from "../../components/BackMenu/BackMenu";
import { createGameOverMessage } from "../../components/GameOver/GameOver";
import { createYouWinMessage } from "../../components/YouWin/YouWin";
import { createTiedMessage } from "../../components/Tied/Tied";
import { createScore, updateScore } from "../../components/Score/Score";
import { createAttempts, updateAttempts } from "../../components/Attempts/Attempts";

// Functions to handle localStorage
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const loadFromLocalStorage = (key, defaultValue) => {
  return localStorage.getItem(key) !== null ? localStorage.getItem(key) : defaultValue;
};

const resetLocalStorage = () => {
  localStorage.setItem('score', 0);
  localStorage.setItem('attempts', 5);
};

export const loadRockPaperScissors = () => {
  document.body.innerHTML = ""; // Clear the current content
  document.body.className = 'rock-paper-scissors'; // Apply specific class

  // Add background to the .rock-paper-scissors class
  printBg(".rock-paper-scissors");

  const container = document.createElement('div');
  container.classList.add('rps-container');
  document.body.appendChild(container);

  //! GAME TITLE
  container.appendChild(createGameTitle("Rock Paper Scissors"));

  // Create and add scoresDiv
  const scoresDiv = document.createElement('div');
  scoresDiv.classList.add('scoresDiv');
  container.appendChild(scoresDiv);

  //! SCORE
  const scoreElement = createScore();
  scoresDiv.appendChild(scoreElement);

  //! ATTEMPTS
  const attemptsElement = createAttempts(5);
  scoresDiv.appendChild(attemptsElement);

  const gameBoard = document.createElement('div');
  gameBoard.classList.add('rps-game-board');
  container.appendChild(gameBoard);

  const options = ['👊', '✋', '✌️'];
  const optionNames = {
    '👊': 'Rock',
    '✋': 'Paper',
    '✌️': 'Scissors'
  };

  options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('rps-button');
    button.addEventListener('click', () => playRound(option));
    gameBoard.appendChild(button);
  });

  const result = document.createElement('div');
  result.classList.add('rps-result');
  container.appendChild(result);

  // Create and add buttonsDiv
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('buttonsDiv');
  container.appendChild(buttonsDiv);

  //! BUTTONS:
  buttonsDiv.appendChild(createBackButton());
  buttonsDiv.appendChild(createRestartButton(() => {
    resetLocalStorage();
    loadRockPaperScissors();
  }));

  let attempts = parseInt(loadFromLocalStorage('attempts', 5));
  let score = parseInt(loadFromLocalStorage('score', 0));
  
  // Update UI with loaded values
  document.getElementById('score-value').textContent = score;
  document.getElementById('attempts-value').textContent = attempts;

  function playRound(playerSelection) {
    if (attempts <= 0) return; // Stop the game if attempts are 0

    const computerSelection = options[Math.floor(Math.random() * options.length)];
    let resultText;

    if (playerSelection === computerSelection) {
      resultText = `It's a tie! You both chose ${optionNames[playerSelection]}`;
    } else if (
      (playerSelection === '👊' && computerSelection === '✌️') ||
      (playerSelection === '✋' && computerSelection === '👊') ||
      (playerSelection === '✌️' && computerSelection === '✋')
    ) {
      resultText = `You win! ${optionNames[playerSelection]} beats ${optionNames[computerSelection]}`;
      score++;
      updateScore(1);
    } else {
      resultText = `You lose! ${optionNames[computerSelection]} beats ${optionNames[playerSelection]}`;
      score--;
      updateScore(-1);
    }

    result.textContent = resultText;
    attempts--;
    updateAttempts(-1);

    // Save to localStorage
    saveToLocalStorage('score', score);
    saveToLocalStorage('attempts', attempts);

    if (attempts === 0) {
      disableGameBoard();
      setTimeout(checkFinalResult, 500);
    }
  }

  function disableGameBoard() {
    const buttons = document.querySelectorAll('.rps-button');
    buttons.forEach(button => button.removeEventListener('click', () => playRound(button.textContent)));
  }

  function checkFinalResult() {
    if (score > 0) {
      container.appendChild(createYouWinMessage());
    } else if (score < 0) {
      container.appendChild(createGameOverMessage());
    } else {
      container.appendChild(createTiedMessage());
    }
  }
};
