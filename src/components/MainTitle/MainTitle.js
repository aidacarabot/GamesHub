import './MainTitle.css';


export const printMainTitle = () => {
  const h1 = document.createElement('h1');
  h1.textContent = "CHOOSE YOUR GAME!";
  h1.classList.add('mainTitle');
  document.body.appendChild(h1);
};
