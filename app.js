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
            cell.addEventListener('click', () => {
                alert(`cell ${i} clicked`);
            })
        }
    }

    return {
        // not implemented yet
        render,
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

    return {
        start,
    }
})()

start.addEventListener('click', () => {
    GameController.start();
})