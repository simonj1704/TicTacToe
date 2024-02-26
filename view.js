"use strict";

window.addEventListener("load", start);

//***************Controller */
function start(){
    console.log("JS is working")
    showBoard();
    makeBoardClickable()
}

let currentPlayer = 1;

function selectCell(row, col){
    if(readFromCell(row, col) === 0){
    writeToCell(row, col, currentPlayer);
    showBoard();
    nextPlayer();
    if(checkForWin() !== false){
        console.log("Winner!")
        showWinner(checkForWin());
    }
    } else {
        console.log("Cell already taken")
    }
}

function nextPlayer(){
    if(currentPlayer === 1){
        currentPlayer = 2;
        setTimeout(computerTurn, 1000)
    } else {
        currentPlayer = 1;
        playerTurn();
    }
}

function playerTurn(){

}

function computerTurn(){
    const availableCells = getAvailableCells();
    if(availableCells.length === 0){
        console.log("No available cells")

        setTimeout(resetGame, 3000)
    } else {
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    selectCell(availableCells[randomIndex].row, availableCells[randomIndex].col);
}
}

function getAvailableCells(){
    const availableCells = [];
    for(let row = 0; row < model.length; row++){
        for(let col = 0; col < model[row].length; col++){
            if(readFromCell(row, col) === 0){
                availableCells.push({row, col});
            }
        }
    }
    return availableCells;

}

function checkForWin(){
    
    if(model[0][0] === model[0][1] && model[0][0] === model[0][2] && model[0][0] !== 0){
        return model[0][0];
    } else if(model[1][0] === model[1][1] && model[1][0] === model[1][2] && model[1][0] !== 0){
        return model[1][0];
    } else if(model[2][0] === model[2][1] && model[2][0] === model[2][2] && model[2][0] !== 0){
        return model[2][0];
    } else if(model[0][0] === model[1][0] && model[0][0] === model[2][0] && model[0][0] !== 0){
        return model[0][0];
    } else if(model[0][1] === model[1][1] && model[0][1] === model[2][1] && model[0][1] !== 0){
        return model[0][1];
    } else if(model[0][2] === model[1][2] && model[0][2] === model[2][2] && model[0][2] !== 0){
        return model[0][2];
    } else if(model[0][0] === model[1][1] && model[0][0] === model[2][2] && model[0][0] !== 0){
        return model[0][0];
    } else if(model[0][2] === model[1][1] && model[0][2] === model[2][0] && model[0][2] !== 0){
        return model[0][2];
    }

    return false;

}


///************** VIEW */
function makeBoardClickable(){
    document.querySelector("#board").addEventListener("click", boardClicked)
}

function boardClicked(event){
    const cell = event.target;
    if(cell.classList.contains("cell") === false){
        return
    }

    const row = cell.dataset.row;
    const col = cell.dataset.col;
    

    console.log(`Cell clicked: ${row}, ${col}`);
    selectCell(row, col);

}

function showBoard(){
    const board = document.querySelector("#board");

    for(let row = 0; row < model.length; row++){
        for(let col = 0; col < model[row].length; col++){
            const cell = board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            
            switch(readFromCell(row, col)){
                case 0:
                    cell.textContent = "";
                    break;
                case 1:
                    cell.textContent = "X";
                    break;
                case 2:
                    cell.textContent = "O";
                    break;
            
            }
        }
    }

}

function showWinner(player){
    const winner = document.querySelector("#winner");
    if(player === 1){
        winner.textContent = `Player X wins!`
    } else {
    winner.textContent = `Player O wins!`
}
document.querySelector("#board").removeEventListener("click", boardClicked)
setTimeout(resetGame, 3000)
}



//************** MODEL */
const model = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

function writeToCell(row, col, value){
    model[row][col] = value;
}

function readFromCell(row, col){
    return model[row][col];
}


function resetGame(){
    model[0][0] = 0;
    model[0][1] = 0;
    model[0][2] = 0;
    model[1][0] = 0;
    model[1][1] = 0;
    model[1][2] = 0;
    model[2][0] = 0;
    model[2][1] = 0;
    model[2][2] = 0;
    showBoard();
    document.querySelector("#winner").textContent = "";
    currentPlayer = 1;
    makeBoardClickable();
}