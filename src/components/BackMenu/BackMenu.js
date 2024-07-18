import "./BackMenu.css";

export const createBackButton = () => {
  const backButton = document.createElement('button');
  backButton.classList.add('button-uiverse');
  backButton.setAttribute('data-text', "RETURN HOME");

  const actualText = document.createElement('span');
  actualText.classList.add('actual-text');
  actualText.innerHTML = "&nbsp;RETURN HOME&nbsp;";

  const hoverText = document.createElement('span');
  hoverText.classList.add('hover-text');
  hoverText.setAttribute('aria-hidden', 'true');
  hoverText.innerHTML = "&nbsp;RETURN HOME&nbsp;";

  backButton.appendChild(actualText);
  backButton.appendChild(hoverText);

  backButton.addEventListener('click', () => {
    location.reload(); // Recargar la página para volver al inicio
  });
  return backButton;
};
