import "./style.css";
import { printBg } from './src/components/WhiteNoiseBg/WhiteNoiseBg.js';
import { printMainTitle } from "./src/components/MainTitle/MainTitle.js";
import { createGameButton } from "./src/components/GameButton/GameButton.js";
import { loadTicTacToe } from "./src/pages/TicTacToe/TicTacToe.js";
import { loadRockPaperScissors } from "./src/pages/RockPaperScissors/RockPaperScissors.js";
import { loadMemoryGame } from "./src/pages/MemoryGame/MemoryGame.js";

// Establecer la clase para el body
document.body.className = "home-menu";

// Agregar el fondo al body con la clase home-menu
printBg(".home-menu");

printMainTitle();

const gamesDiv = () => {
  const gamesDiv = document.createElement('div');
  gamesDiv.classList.add('gamesDiv');
  document.body.appendChild(gamesDiv);

  gamesDiv.appendChild(createGameButton("TIC TAC TOE", loadTicTacToe));
  gamesDiv.appendChild(createGameButton("ROCK PAPER SCISSORS", loadRockPaperScissors));
  gamesDiv.appendChild(createGameButton("MEMORY GAME", loadMemoryGame));
};

gamesDiv();

