// get the status display
const statusDisplay = document.querySelector(".game--status");

// game state variables
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

// messages
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => "Game ended in a draw";
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn!`;

// display the current player's turn
statusDisplay.innerText = currentPlayerTurn();

// winning conditions for the game
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

// function for handling cell played
function handleCellPlayed(clickedCell, i) {
  // update the game state and cell display
  gameState[i] = currentPlayer;
  clickedCell.innerText = currentPlayer;
}

// function for switching players
function handlePlayerChange() {
  // ternary operator to switch players
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerText = currentPlayerTurn();
}

// function for checking game result
function handleResultValidation() {
  let roundWon = false;

  // check each winning condition
  for (let i = 0; i < winningConditions.length; i++) {
    const winningCondition = winningConditions[i]; // [0, 1, 2] on first iteration
    let a = gameState[winningCondition[0]];
    let b = gameState[winningCondition[1]];
    let c = gameState[winningCondition[2]];

    // if one cell is empty, this winning condition has not been met
    if (a === "" || b === "" || c === "") {
      continue;
    }

    // if all three cells are the same, we have a winner!
    if (a == b && b == c) {
      roundWon = true;
      break;
    }
  }

  // display winning message and end the game if there is a winner
  if (roundWon) {
    statusDisplay.innerText = winningMessage();
    gameActive = false;
    return;
  }

  // if all cells are filled and there is no winner, it's a draw
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerText = drawMessage();
    gameActive = false;
    return;
  }

  // switch players if the game is not over
  handlePlayerChange();
}

// function for handling cell click
function handleCellClick(e) {
  const clickedCell = e.target;
  const index = parseInt(clickedCell.dataset.index);

  // ignore the click if the cell has been played or the game is not active
  if (gameState[index] !== "" || !gameActive) {
    return;
  }

  // handle the played cell and validate the result
  handleCellPlayed(clickedCell, index);
  handleResultValidation();
}

// function for restarting the game
function handleRestartGame() {
  // reset game state
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerText = currentPlayerTurn();

  // clear cell content
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerText = ""));
}

// add event listeners to cells and restart button
document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

document.querySelector(".game--restart").addEventListener("click", handleRestartGame);
