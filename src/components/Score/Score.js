import "./Score.css";

export const createScore = () => {
  const scoreDiv = document.createElement('div');
  scoreDiv.classList.add('score');
  scoreDiv.innerHTML = 'Score: <span id="score-value">0</span>';
  return scoreDiv;
};

export const updateScore = (value) => {
  const scoreElement = document.getElementById('score-value');
  const currentScore = parseInt(scoreElement.textContent);
  scoreElement.textContent = currentScore + value;
};


