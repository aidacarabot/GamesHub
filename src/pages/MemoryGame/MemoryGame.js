import "./MemoryGame.css";
import { printBg } from '../../components/WhiteNoiseBg/WhiteNoiseBg.js';
import { createGameTitle } from "../../components/GameTitle/GameTitle";
import { createRestartButton } from "../../components/Restart/Restart";
import { createBackButton } from "../../components/BackMenu/BackMenu";
import { createGameOverMessage } from "../../components/GameOver/GameOver";
import { createYouWinMessage } from "../../components/YouWin/YouWin";
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
  localStorage.setItem('score-mg', 0);
  localStorage.setItem('attempts-mg', 8);
};

export const loadMemoryGame = () => {
  document.body.innerHTML = ""; // Limpiar el contenido actual
  document.body.className = 'memory-game'; // Aplicar la clase específica

  const container = document.createElement('div');
  container.classList.add('mg-container');
  document.body.appendChild(container);

  // Añadir el fondo a la clase .memory-game
  printBg(".memory-game");

  //! GAME TITLE
  container.appendChild(createGameTitle("Memory Game"));

  // Crear y agregar scoreDiv-mg
  const scoresDiv = document.createElement('div');
  scoresDiv.classList.add('scoreDiv-mg');
  container.appendChild(scoresDiv);

  //! SCORE
  const scoreElement = createScore();
  scoresDiv.appendChild(scoreElement);

  //! ATTEMPTS
  const attemptsElement = createAttempts(8);
  scoresDiv.appendChild(attemptsElement);

  const gameBoard = document.createElement('div');
  gameBoard.classList.add('mg-game-board');
  container.appendChild(gameBoard);

  // Crear y agregar buttonsDiv-mg
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('buttonsDiv-mg');
  container.appendChild(buttonsDiv);

  //! BOTONES:
  buttonsDiv.appendChild(createBackButton());
  buttonsDiv.appendChild(createRestartButton(() => {
    resetLocalStorage();
    loadMemoryGame();
  }));

  let attempts = parseInt(loadFromLocalStorage('attempts-mg', 8));
  let score = parseInt(loadFromLocalStorage('score-mg', 0));
  
  // Actualizar UI con los valores cargados
  document.getElementById('score-value').textContent = score;
  document.getElementById('attempts-value').textContent = attempts;

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', '/assets/back-2.jpeg');
      card.setAttribute('data-id', i);
      card.classList.add('mg-card');
      card.addEventListener('click', flipCard);
      gameBoard.appendChild(card);
    }
  }

  function flipCard() {
    const cardId = this.getAttribute('data-id');
    if (!cardsChosenId.includes(cardId) && cardsChosenId.length < 2) {
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute('src', cardArray[cardId].img);
      this.classList.add('flip');

      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 1000);
      }
    }
  }

  function checkForMatch() {
    const cards = document.querySelectorAll('.mg-card');
    const [optionOneId, optionTwoId] = cardsChosenId;

    if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
      cards[optionOneId].classList.add('matched');
      cards[optionTwoId].classList.add('matched');
      cardsWon.push(cardsChosen);
      updateScore(1);
      saveToLocalStorage('score-mg', ++score);
    } else {
      cards[optionOneId].setAttribute('src', '/assets/back-2.jpeg');
      cards[optionTwoId].setAttribute('src', '/assets/back-2.jpeg');
      cards[optionOneId].classList.remove('flip');
      cards[optionTwoId].classList.remove('flip');
      attempts--;
      updateAttempts(-1);
      saveToLocalStorage('attempts-mg', attempts);
    }

    cardsChosen = [];
    cardsChosenId = [];

    if (cardsWon.length === cardArray.length / 2) {
      container.appendChild(createYouWinMessage());
    }

    if (attempts === 0) {
      container.appendChild(createGameOverMessage());
      document.querySelectorAll('.mg-card').forEach(card => card.removeEventListener('click', flipCard));
    }
  }

  const cardArray = [
    { name: 'image1', img: '/assets/1.jpeg' },
    { name: 'image1', img: '/assets/1.jpeg' },
    { name: 'image2', img: '/assets/2.jpeg' },
    { name: 'image2', img: '/assets/2.jpeg' },
    { name: 'image3', img: '/assets/3.jpeg' },
    { name: 'image3', img: '/assets/3.jpeg' },
    { name: 'image4', img: '/assets/4.jpeg' },
    { name: 'image4', img: '/assets/4.jpeg' },
    { name: 'image5', img: '/assets/5.jpeg' },
    { name: 'image5', img: '/assets/5.jpeg' },
    { name: 'image6', img: '/assets/6.jpeg' },
    { name: 'image6', img: '/assets/6.jpeg' },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  createBoard();
};
