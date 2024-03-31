const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let moves = 0;
let winner = null;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

function handleCellClick() {
    if (!this.textContent && !winner) {
        this.textContent = currentPlayer;
        moves++;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].style.backgroundColor = cells[b].style.backgroundColor = cells[c].style.backgroundColor = 'gold';
            winner = cells[a].textContent;
        }
    });
    if (winner) {
        status.textContent = `Player ${winner} wins!`;
        status.classList.add('blink');
    } else if (moves === 9) {
        status.textContent = 'It\'s a draw!';
    }
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#fff';
    });
    currentPlayer = 'X';
    moves = 0;
    winner = null;
    status.textContent = '';
    status.classList.remove('blink');
}
