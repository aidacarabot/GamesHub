import "./Tied.css";

export const createTiedMessage = () => {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('tied-message');
  messageDiv.textContent = "It's a tie!";

  // Crear elemento de audio
  const audio = new Audio('assets/Tied.mp3');
  audio.play();

  return messageDiv;
};
