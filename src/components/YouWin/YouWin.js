import "./YouWin.css";

export const createYouWinMessage = () => {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('you-win-message');
  messageDiv.textContent = "Congrats! You Win!";

  // Crear elemento de audio
  const audio = new Audio('assets/Win.mp3');
  audio.play();

  return messageDiv;
};
