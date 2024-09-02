// Create the Sudoku board with input fields
function createBoard() {
    const boardElement = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.id = `cell-${i}-${j}`;
            boardElement.appendChild(input);
        }
    }
}

// Get the Sudoku board as a 2D array
function getBoard() {
    let board = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            let value = document.getElementById(`cell-${i}-${j}`).value;
            row.push(value ? parseInt(value) : 0);
        }
        board.push(row);
    }
    return board;
}

// Set the solved Sudoku board
function setBoard(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(`cell-${i}-${j}`).value = board[i][j] !== 0 ? board[i][j] : '';
        }
    }
}

// Sudoku solving functions
function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    }
    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }
    return true;
}

function solveSudoku(board) {
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                row = i;
                col = j;
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty) {
            break;
        }
    }
    if (isEmpty) {
        return true;
    }
    for (let num = 1; num <= 9; num++) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) {
                return true;
            }
            board[row][col] = 0;
        }
    }
    return false;
}

// Event listener for the solve button
document.getElementById('solveButton').addEventListener('click', () => {
    let board = getBoard();
    if (solveSudoku(board)) {
        setBoard(board);
    } else {
        alert('No solution exists');
    }
});

// Initialize the Sudoku board
createBoard();
