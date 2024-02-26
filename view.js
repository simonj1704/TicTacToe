"use strict";

window.addEventListener("load", start);

//***************Controller */
function start(){
    console.log("JS is working")
    makeBoardClickable()
}

let currentPlayer = 1;

function selectCell(row, col){
    if(currentPlayer === 1){
        writeToCell(row, col, 1);
        currentPlayer = 2;
    } else {
        writeToCell(row, col, 2);
        currentPlayer = 1;
    }
    console.table(model)
    showBoard();
    if(checkForWin()){
        console.log("Winner!")
        showWinner();
    }
}

function checkForWin(){
    
    if(model[0][0] === model[0][1] && model[0][0] === model[0][2] && model[0][0] !== 0){
        return true;
    } else if(model[1][0] === model[1][1] && model[1][0] === model[1][2] && model[1][0] !== 0){
        return true;
    } else if(model[2][0] === model[2][1] && model[2][0] === model[2][2] && model[2][0] !== 0){
        return true;
    } else if(model[0][0] === model[1][0] && model[0][0] === model[2][0] && model[0][0] !== 0){
        return true;
    } else if(model[0][1] === model[1][1] && model[0][1] === model[2][1] && model[0][1] !== 0){
        return true;
    } else if(model[0][2] === model[1][2] && model[0][2] === model[2][2] && model[0][2] !== 0){
        return true;
    } else if(model[0][0] === model[1][1] && model[0][0] === model[2][2] && model[0][0] !== 0){
        return true;
    } else if(model[0][2] === model[1][1] && model[0][2] === model[2][0] && model[0][2] !== 0){
        return true;
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

function showWinner(){
    
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


