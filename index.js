/**
 * Rock Paper Scissors game implementation
 */

// Game options and rules
const OPTIONS = ['rock', 'paper', 'scissors'];
const RULES = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
};

// Game state
let playerScore = 0;
let computerScore = 0;
const WINNING_SCORE = 5;

// DOM elements references
let resultDiv;
let scoreDiv;
let gameOverDiv;
let buttons;

/**
 * Get computer's random choice
 * @returns {string} - 'rock', 'paper', or 'scissors'
 */
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * OPTIONS.length);
  return OPTIONS[randomIndex];
}

/**
 * Determine the winner of a round
 * @param {string} playerSelection - Player's choice
 * @returns {string} - Result message
 */
function playRound(playerSelection) {
  const computerSelection = getComputerChoice();
  
  // Check for tie
  if (playerSelection === computerSelection) {
    displayResult(`Tie! Both chose ${playerSelection}.`);
    return;
  }
  
  // Check who wins
  if (RULES[playerSelection] === computerSelection) {
    playerScore++;
    displayResult(`You win! ${playerSelection} beats ${computerSelection}.`);
  } else {
    computerScore++;
    displayResult(`You lose! ${computerSelection} beats ${playerSelection}.`);
  }
  
  // Update score display
  updateScore();
  
  // Check if game over
  if (playerScore >= WINNING_SCORE || computerScore >= WINNING_SCORE) {
    endGame();
  }
}

/**
 * Display the round result in the UI
 * @param {string} message - Result message to display
 */
function displayResult(message) {
  resultDiv.textContent = message;
}

/**
 * Update the score display in the UI
 */
function updateScore() {
  scoreDiv.textContent = `Score: You ${playerScore} - ${computerScore} Computer`;
}

/**
 * End the game and display the final result
 */
function endGame() {
  const winner = playerScore >= WINNING_SCORE ? 'You win the game!' : 'Computer wins the game!';
  gameOverDiv.textContent = `Game Over! ${winner}`;
  
  // Disable the game buttons
  disableButtons();
  
  // Add reset button
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Play Again';
  resetButton.id = 'reset-button';
  resetButton.addEventListener('click', resetGame);
  gameOverDiv.appendChild(resetButton);
}

/**
 * Disable all game buttons
 */
function disableButtons() {
  buttons.forEach(button => {
    button.disabled = true;
  });
}

/**
 * Enable all game buttons
 */
function enableButtons() {
  buttons.forEach(button => {
    button.disabled = false;
  });
}

/**
 * Reset the game to initial state
 */
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  updateScore();
  displayResult('Choose rock, paper, or scissors to start a new game!');
  gameOverDiv.textContent = '';
  enableButtons();
}

/**
 * Initialize the game UI and event listeners
 */
function initGame() {
  // Get DOM elements
  resultDiv = document.getElementById('result');
  scoreDiv = document.getElementById('score');
  gameOverDiv = document.getElementById('game-over');
  
  // Get all choice buttons and add event listeners
  buttons = Array.from(document.querySelectorAll('.buttons-container button'));
  buttons.forEach(button => {
    button.addEventListener('click', () => playRound(button.id));
  });
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initGame);