let start = document.getElementById('start');
let reset = document.getElementById('reset');

// Gameboard module
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    let render = () => {
        for (let i = 0; i < board.length; i++) {
            let cell = document.getElementById(`${i}`);
            cell.innerText = board[i];
        }
    }


    return {
        // not implemented yet
        render,
    }
})();
start.addEventListener('click', () => {
    // Game.start();
})