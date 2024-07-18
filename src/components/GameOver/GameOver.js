import "./GameOver.css";

export const createGameOverMessage = () => {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('game-over-message');
  messageDiv.textContent = "Game Over. You lose!";

  const audio = new Audio('/assets/gameOver.mp3');
  audio.play();

  return messageDiv;
};
