import './WhiteNoiseBg.css';

export const printBg = (selector) => {
  const backgroundElement = document.querySelector(selector);
  if (backgroundElement) {
    const divBg = document.createElement('div');
    divBg.classList.add('bg');
    backgroundElement.appendChild(divBg);
  }
};
