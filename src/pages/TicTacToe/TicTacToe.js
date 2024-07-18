import "./TicTacToe.css";
import { printBg } from '../../components/WhiteNoiseBg/WhiteNoiseBg.js';
import { createGameTitle } from "../../components/GameTitle/GameTitle";
import { createRestartButton } from "../../components/Restart/Restart";
import { createBackButton } from "../../components/BackMenu/BackMenu";
import { createGameOverMessage } from "../../components/GameOver/GameOver";
import { createYouWinMessage } from "../../components/YouWin/YouWin";
import { createTiedMessage } from "../../components/Tied/Tied";

export const loadTicTacToe = () => {
  document.body.innerHTML = ""; // Limpiar el contenido actual
  document.body.className = 'tic-tac-toe'; // Aplicar la clase específica

  const container = document.createElement('div');
  container.classList.add('ttt-container');
  document.body.appendChild(container);

  // Añadir el fondo a la clase .tic-tac-toe
  printBg(".tic-tac-toe");

  //! GAME TITLE
  container.appendChild(createGameTitle("Tic Tac Toe"));

  const playerP = document.createElement('p');
  playerP.classList.add('playerP-ttt');
  playerP.textContent = "You are Player: X"
  container.appendChild(playerP);

  const gameBoard = document.createElement('div');
  gameBoard.classList.add('game-board');
  container.appendChild(gameBoard);

  const cells = Array.from({ length: 9 }, (_, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    gameBoard.appendChild(cell);
    return cell;
  });

  //! BOTONES
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('buttonsDiv-ttt');
  container.appendChild(buttonsDiv);

  buttonsDiv.appendChild(createBackButton());
  buttonsDiv.appendChild(createRestartButton(loadTicTacToe));

  let currentPlayer = 'X';
  let gameState = ['', '', '', '', '', '', '', '', ''];
  let isGameActive = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (gameState[index] !== '' || !isGameActive || currentPlayer !== 'X') {
      return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
      document.body.appendChild(createYouWinMessage());
      isGameActive = false;
      return;
    }

    if (!gameState.includes('')) {
      document.body.appendChild(createTiedMessage());
      isGameActive = false;
      return;
    }

    currentPlayer = 'O';
    setTimeout(computerMove, 500); // Agrega un retraso de 500ms antes del movimiento del computador
  }

  function computerMove() {
    const bestMove = findBestMove();
    if (bestMove !== -1) {
      gameState[bestMove] = 'O';
      cells[bestMove].textContent = 'O';

      if (checkWinner()) {
        document.body.appendChild(createGameOverMessage());
        isGameActive = false;
        return;
      }

      if (!gameState.includes('')) {
        const tiedMessage = createTiedMessage();
        document.body.appendChild(tiedMessage);
        isGameActive = false;
        return;
      }

      currentPlayer = 'X';
    }
  }

  function findBestMove() {
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i] === '') {
        gameState[i] = 'O';
        if (checkWinner()) {
          gameState[i] = '';
          return i;
        }
        gameState[i] = '';
      }
    }
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i] === '') {
        gameState[i] = 'X';
        if (checkWinner()) {
          gameState[i] = '';
          return i;
        }
        gameState[i] = '';
      }
    }
    const emptyCells = gameState.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  function checkWinner() {
    return winningConditions.some(condition => {
      const [a, b, c] = condition;
      return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
  }

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
};
