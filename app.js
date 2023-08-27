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
    let start = () => {
        players.push(createPlayer(document.getElementById('player1-name').value, 'X'));
        players.push(createPlayer(document.getElementById('player2-name').value, 'O'));

        currentPlayerIndex = 0;
        gameOver = false;


        Gameboard.render();
    }

    let handleClick = (e) => {
        let index = parseInt(e.target.id);

        if (Gameboard.getBoard()[index] !== "")
            return;

        GameController.update(index, players[currentPlayerIndex].marker);
        currentPlayerIndex === 0 ? currentPlayerIndex = 1 : currentPlayerIndex = 0;
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
    }

    return {
        start,
        handleClick,
        update,
        reset
    }
})()

start.addEventListener('click', () => {
    GameController.start();
})

reset.addEventListener('click', () => {
    GameController.reset();
})