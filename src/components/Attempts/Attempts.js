import "./Attempts.css";

export const createAttempts = (initialValue) => {
  const attemptsDiv = document.createElement('div');
  attemptsDiv.classList.add('attempts');
  attemptsDiv.innerHTML = `Attempts: <span id="attempts-value">${initialValue}</span>`;
  return attemptsDiv;
};

export const updateAttempts = (value) => {
  const attemptsElement = document.getElementById('attempts-value');
  const currentAttempts = parseInt(attemptsElement.textContent);
  attemptsElement.textContent = currentAttempts + value;
};



