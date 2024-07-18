import "./Restart.css";

export const createRestartButton = (callback) => {
  const restartButton = document.createElement('button');
  restartButton.classList.add('button-uiverse');
  restartButton.setAttribute('data-text', "RESTART GAME");

  const actualText = document.createElement('span');
  actualText.classList.add('actual-text');
  actualText.innerHTML = "&nbsp;RESTART GAME&nbsp;";

  const hoverText = document.createElement('span');
  hoverText.classList.add('hover-text');
  hoverText.setAttribute('aria-hidden', 'true');
  hoverText.innerHTML = "&nbsp;RESTART GAME&nbsp;";

  restartButton.appendChild(actualText);
  restartButton.appendChild(hoverText);

  restartButton.addEventListener('click', callback);
  return restartButton;
};
