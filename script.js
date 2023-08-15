const messageElement = document.getElementById('message');
const restartButton = document.getElementById('reset');


//GameBoard
const gameBoard = (() => {
    let board = new Array(9).fill('');

    const getBoard = () => board;
    const updateCell = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            return true;
        }
        return false;
    }

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    }

    return { getBoard, updateCell, resetBoard };
})();

//Player
const Player = (name, marker) => {
    return { name, marker };
}

const renderBoard = () => {
    const boardContainer = document.getElementById('game-board');
    boardContainer.textContent = '';

    gameBoard.getBoard().forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardContainer.appendChild(cellElement);
    })
}

//render
renderBoard();


let currentPlayer = Player('Player 1', 'X');


const handleCellClick = (index) => {
    console.log('Cell clicked:', index);

    if (gameBoard.updateCell(index, currentPlayer.marker)) {
        console.log('Cell updated:', index);

        renderBoard();
        if (checkWin(currentPlayer.marker)) {
            console.log('Player wins:', currentPlayer.name);
            restartButton.classList.remove('hidden');
            messageElement.classList.remove('hidden');
            return messageElement.textContent = currentPlayer.name + ' wins!';
        } else if (checkTie()) {
            console.log('Game tied.');
            restartButton.classList.remove('hidden');
            messageElement.classList.remove('hidden');
            return messageElement.textContent = 'Tie!';
        }

        if (currentPlayer.marker === 'X') {
            currentPlayer = Player('Player 2', 'O');
        } else {
            currentPlayer = Player('Player 1', 'X');
        }
        
        console.log('Current player:', currentPlayer.name);
    }

}


const checkWin = (marker) => {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    // Check if any of the winning combinations match the marker
    return winningCombos.some(([a, b, c]) => {
        const cells = gameBoard.getBoard();
        return cells[a] === marker && cells[b] === marker && cells[c] === marker;
    });
}

const checkTie = () => {
    const cells = gameBoard.getBoard();
    return cells.every(cell => cell !== '');
}


const resetGame = () => {
    gameBoard.resetBoard();
    currentPlayer = Player('Player 1', 'X');
    messageElement.classList.add('hidden');
    restartButton.classList.add('hidden');
    renderBoard();
}

restartButton.addEventListener('click', resetGame);