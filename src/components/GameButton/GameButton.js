import './GameButton.css';

export const createGameButton = (gameName, loadGame) => {
  const gameButton = document.createElement('button');
  gameButton.classList.add('gameButton');
  gameButton.textContent = gameName;
  gameButton.setAttribute('data-text', gameName); // Añadir el data attribute

  // Crear el elemento de audio
  const audio = document.createElement('audio');
  audio.id = 'hover-sound';
  audio.src = 'assets/glitch.mp3';
  audio.preload = 'auto';

  // Añadir el evento de mouseenter para reproducir el sonido
  gameButton.addEventListener('mouseenter', () => {
    audio.currentTime = 0; // Reinicia el sonido
    audio.play();
  });
  
  // Añadir el evento de mouseleave para detener el sonido
  gameButton.addEventListener('mouseleave', () => {
    audio.pause();
    audio.currentTime = 0; // Reinicia el sonido
  });

  gameButton.addEventListener('click', loadGame);

  // Añadir el botón y el audio al contenedor
  const container = document.createElement('div');
  container.appendChild(gameButton);
  container.appendChild(audio);

  return container;
};
