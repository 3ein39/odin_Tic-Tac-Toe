let start = document.getElementById('start');
let reset = document.getElementById('reset');

// Gameboard module
// IIFE to create private variables
const Gameboard = (() => {
    // private variables as not returned
    let board = ["", "", "", "", "", "", "", "", ""];

    let render = () => {
        for (let i = 0; i < board.length; i++) {
            let cell = document.getElementById(`${i}`);
            cell.innerText = board[i];
            cell.addEventListener('click', GameController.handleClick);
        }
    }

    // board getter
    let getBoard = () => {
        return board;
    }

    return {
        // not implemented yet
        render,
        getBoard,
    }
})();

// CreatePlayer factory
let createPlayer = (name, marker) => {
    return {name, marker};
}

// game controller module
let GameController = (() => {
    let players = [];
    let currentPlayerIndex ;
    let gameOver ;
    let status = document.getElementById('status');
    let start = () => {
        players.push(createPlayer(document.getElementById('player1-name').value, 'X'));
        players.push(createPlayer(document.getElementById('player2-name').value, 'O'));

        currentPlayerIndex = 0;
        gameOver = false;
        status.innerText = `${players[currentPlayerIndex].name}'s turn`;


        Gameboard.render();
    }

    let handleClick = (e) => {
        let index = parseInt(e.target.id);

        if (Gameboard.getBoard()[index] !== "")
            return;

        GameController.update(index, players[currentPlayerIndex].marker);

        if (GameController.checkWin()) {
            gameOver = true;
        }
        if (gameOver){
            status.innerText = `${players[currentPlayerIndex].name} wins!\n Click reset to play again, Game will reset in 2 Seconds`;
            window.setTimeout(GameController.reset, 2000);
            return;
        }
        // check for draw
        if (Gameboard.getBoard().every(cell => cell !== "")) {
            status.innerText = "It's a draw!\n Click reset to play again, Game will reset in 2 Seconds";
            window.setTimeout(GameController.reset, 2000);
            return;
        }
        
        currentPlayerIndex === 0 ? currentPlayerIndex = 1 : currentPlayerIndex = 0;
        status.innerText = `${players[currentPlayerIndex].name}'s turn`;
    }

    let checkWin = () => {
        let board = Gameboard.getBoard();
        let marker = players[currentPlayerIndex].marker;
        let win = false;
        // check rows
        // board is 1D array of 9 cells
        for (let i = 0; i < 9; i += 3) {
            if (board[i] === marker && board[i+1] === marker && board[i+2] === marker) {
                win = true;
            }
        }
        // check columns
        for (let i = 0; i < 3; i++) {
            if (board[i] === marker && board[i+3] === marker && board[i+6] === marker) {
                win = true;
            }
        }
        // check diagonals
        if (board[0] === marker && board[4] === marker && board[8] === marker) {
            win = true;
        }
        if (board[2] === marker && board[4] === marker && board[6] === marker) {
            win = true;
        }
        return win;
    }

    let update = (index, marker) => {
        Gameboard.getBoard()[index] = marker;
        Gameboard.render();
    }

    let reset = () => {
        Gameboard.getBoard().forEach((cell, index) => {
            Gameboard.getBoard()[index] = "";
        })
        Gameboard.render();
        players = []
        document.getElementById('player1-name').value = "";
        document.getElementById('player2-name').value = "";
        // remove event listeners
        let cells = document.querySelectorAll('.square');
        cells.forEach(cell => {
            cell.removeEventListener('click', GameController.handleClick);
        })
        status.innerText = "Enter player names and click start to begin";
    }

    return {
        start,
        handleClick,
        update,
        reset,
        checkWin,
    }
})()

start.addEventListener('click', () => {
    GameController.start();
})

reset.addEventListener('click', () => {
    GameController.reset();
})