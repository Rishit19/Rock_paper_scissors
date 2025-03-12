/**
 * Simple Rock Paper Scissors game implementation
 * The user plays against a computer that makes random choices
 */

// Game options
const OPTIONS = ['rock', 'paper', 'scissors'];

// Rules for who wins (key beats value)
const RULES = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
};

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
 * @param {string} computerSelection - Computer's choice
 * @returns {string} - Result message
 */
function playRound(playerSelection, computerSelection) {
  // Normalize player input to lowercase
  playerSelection = playerSelection.toLowerCase();
  
  // Validate player selection
  if (!OPTIONS.includes(playerSelection)) {
    return "Invalid choice! Please choose rock, paper, or scissors.";
  }
  
  // Check for tie
  if (playerSelection === computerSelection) {
    return `Tie! Both chose ${playerSelection}.`;
  }
  
  // Check who wins
  if (RULES[playerSelection] === computerSelection) {
    return `You win! ${playerSelection} beats ${computerSelection}.`;
  } else {
    return `You lose! ${computerSelection} beats ${playerSelection}.`;
  }
}

/**
 * Play a full game of Rock Paper Scissors
 * @param {number} rounds - Number of rounds to play
 */
function game(rounds = 5) {
  let playerScore = 0;
  let computerScore = 0;
  
  for (let i = 0; i < rounds; i++) {
    // Get player's choice (in a real implementation, you might use DOM or prompt)
    const playerChoice = prompt(`Round ${i + 1}/${rounds}: Enter rock, paper, or scissors:`);
    
    // Exit if player cancels
    if (playerChoice === null) {
      console.log("Game canceled.");
      return;
    }
    
    const computerChoice = getComputerChoice();
    const result = playRound(playerChoice, computerChoice);
    
    console.log(result);
    
    // Update scores
    if (result.includes("win")) {
      playerScore++;
    } else if (result.includes("lose")) {
      computerScore++;
    }
  }
  
  // Determine the overall winner
  console.log("\n--- FINAL SCORE ---");
  console.log(`You: ${playerScore} | Computer: ${computerScore}`);
  
  if (playerScore > computerScore) {
    console.log("Congratulations! You won the game!");
  } else if (playerScore < computerScore) {
    console.log("Sorry, you lost the game!");
  } else {
    console.log("The game ended in a tie!");
  }
}

// Function to play a single round (alternative to the multi-round game)
function playSingleRound() {
  const playerChoice = prompt("Enter rock, paper, or scissors:");
  
  if (playerChoice === null) {
    return "Game canceled.";
  }
  
  const computerChoice = getComputerChoice();
  return playRound(playerChoice, computerChoice);
}

// Example usage:
// 1. To play a 5-round game:
// game(5);

// 2. To play a single round:
// console.log(playSingleRound());