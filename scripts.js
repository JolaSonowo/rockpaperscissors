// Variables to track scores
let userScore = 0;
let computerScore = 0;

// DOM elements
const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const resultEl = document.getElementById("result");
const choices = document.querySelectorAll(".choice");
const restartBtn = document.getElementById("restart-btn");

// Play round logic
function playRound(userChoice) {
    const computerChoice = getComputerChoice(); // Get computer choice
    displayChoices(userChoice, computerChoice); // Display choices with a delay

    // Determine the winner after 2 seconds
    setTimeout(() => {
        const winner = determineWinner(userChoice, computerChoice);
        showResult(userChoice, computerChoice, winner); // Show the result

        // Update the scores after another 2 seconds
        setTimeout(() => {
            updateScores(winner);
        }, 2000);
    }, 2000);
}

// Generate random computer choice
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3); // Random index between 0 and 2
    return choices[randomIndex];
}

// Display choices before determining the winner
function displayChoices(userChoice, computerChoice) {
    resultEl.textContent = `You chose ${userChoice}. Computer is choosing...`;
}

// Determine winner
function determineWinner(user, computer) {
    if (user === computer) {
        return "draw"; // Tie case
    } else if (
        (user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissors" && computer === "paper")
    ) {
        return "user"; // User wins
    } else {
        return "computer"; // Computer wins
    }
}

// Show the result of the round
function showResult(userChoice, computerChoice, winner) {
    if (winner === "draw") {
        resultEl.textContent = `It's a draw! Both chose ${userChoice}.`;
    } else if (winner === "user") {
        resultEl.textContent = `You win! ${userChoice} beats ${computerChoice}.`;
    } else {
        resultEl.textContent = `You lose! ${computerChoice} beats ${userChoice}.`;
    }
}

// Update scores
function updateScores(winner) {
    if (winner === "user") {
        userScore++;
        userScoreEl.textContent = userScore; // Update user score on screen
    } else if (winner === "computer") {
        computerScore++;
        computerScoreEl.textContent = computerScore; // Update computer score on screen
    }
}

// Reset the game
function resetGame() {
    userScore = 0;
    computerScore = 0;
    userScoreEl.textContent = 0;
    computerScoreEl.textContent = 0;
    resultEl.textContent = "Make your move!";
}

// Add click event listeners to each choice
choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const userChoice = choice.id; // Get the ID (rock, paper, or scissors)
        playRound(userChoice); // Play a round with the user's choice
    });
});

// Add click event listener to the restart button
restartBtn.addEventListener("click", resetGame);
