import "./GameTitle.css";

export const createGameTitle = (gameName) => {
  const title = document.createElement('h1');
  title.classList.add('gameTitle');
  title.textContent = gameName;
  return title; // Asegúrate de retornar el elemento creado
};
