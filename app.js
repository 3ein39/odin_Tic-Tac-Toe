let start = document.getElementById('start');
let reset = document.getElementById('reset');

// The 2 Players game variant

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

        if (players[currentPlayerIndex].name === "AI")
            index = AI.bestMove(Gameboard.getBoard(), players[currentPlayerIndex].marker);


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
        if (players[currentPlayerIndex].name === "AI")
            status.innerText = `AI's turn, click anywhere to let him defeat you XD`;
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

    // getter for players array
    let getPlayers = () => {
        return players;
    }

    // getter for current player index
    let getPlayerIndex = () => {
        return currentPlayerIndex;
    }

    return {
        start,
        handleClick,
        update,
        reset,
        checkWin,
        getPlayers,
        getPlayerIndex,
    }
})()
let AI = (() => {
    let bestMove = (board, marker) => {
        let bestScore = -Infinity;
        let bestMoveIndex = -1;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = marker;
                let score = minimax(board, 0, false);
                board[i] = ""; // Reset the board state

                if (score > bestScore) {
                    bestScore = score;
                    bestMoveIndex = i;
                }
            }
        }

        return bestMoveIndex;
    };

    let minimax = (board, depth, isMaximizing) => {
        // Base cases
        let scores = {
            X: -10,
            O: 10,
            tie: 0,
        };

        // same as in GameController.checkWin()
        // but returns score instead of boolean
        let checkWin = () => {
            let win = false;
            // check rows
            // board is 1D array of 9 cells
            for (let i = 0; i < 9; i += 3) {
                if (board[i] === 'X' && board[i+1] === 'X' && board[i+2] === 'X') {
                    win = 'X';
                }
                if (board[i] === 'O' && board[i+1] === 'O' && board[i+2] === 'O') {
                    win = 'O';
                }
            }
            // check columns
            for (let i = 0; i < 3; i++) {
                if (board[i] === 'X' && board[i+3] === 'X' && board[i+6] === 'X') {
                    win = 'X';
                }
                if (board[i] === 'O' && board[i+3] === 'O' && board[i+6] === 'O') {
                    win = 'O';
                }
            }
            // check diagonals
            if (board[0] === 'X' && board[4] === 'X' && board[8] === 'X') {
                win = 'X';
            }
            if (board[2] === 'X' && board[4] === 'X' && board[6] === 'X') {
                win = 'X';
            }
            if (board[0] === 'O' && board[4] === 'O' && board[8] === 'O') {
                win = 'O';
            }
            if (board[2] === 'O' && board[4] === 'O' && board[6] === 'O') {
                win = 'O';
            }
            // check for tie
            if (board.every(cell => cell !== "")) {
                win = "tie";
            }
            return win;
        }

        let result = checkWin();
        if (result === "X") return scores.X;
        if (result === "O") return scores.O;
        if (result === "tie") return scores.tie;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = 'O';
                    let score = minimax(board, depth + 1, false);
                    board[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = 'X';
                    let score = minimax(board, depth + 1, true);
                    board[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    return {
        bestMove,
    };
})();

start.addEventListener('click', () => {
    GameController.start();
})

reset.addEventListener('click', () => {
    GameController.reset();
})