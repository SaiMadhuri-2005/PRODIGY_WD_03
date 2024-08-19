const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('.cell');
const turnElement = document.getElementById('turn');
const winnerElement = document.getElementById('winner');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(index) {
    if (gameState[index] === '' && gameActive) {
        gameState[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    winningConditions.forEach(condition => {
        if (gameState[condition[0]] !== '' &&
            gameState[condition[0]] === gameState[condition[1]] &&
            gameState[condition[1]] === gameState[condition[2]]) {
            gameActive = false;
            winnerElement.textContent = `Player ${gameState[condition[0]]} wins!`;
        }
    });

    if (!gameActive && !winnerElement.textContent) {
        winnerElement.textContent = "It's a draw!";
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    turnElement.textContent = `Player ${currentPlayer}'s turn`;
    winnerElement.textContent = '';
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);