//Variables
const board = document.querySelector('#board-container');
let clearButton = document.querySelector('#clear-btn');
let gridSlider = document.querySelector('#grid-range');
let gridSwitch = document.querySelector('#grid-switch');
let gridOn = false;
let gridItems = '';
let mouseDown = false;

//Events
createGrid();
window.addEventListener('resize', resizeGrid);
gridSlider.addEventListener('click', createGrid);
clearButton.addEventListener('click', eraseGrid);
gridSwitch.addEventListener('click', toggleSwitch);
board.addEventListener('mousedown', () => mouseDown = true);
document.body.addEventListener('mouseup', () => mouseDown = false);

//Functions to create and resize
function createGrid(){
    gridSize = gridSlider.value;
    let boardWidth = board.offsetWidth;
    let divSize = Math.floor(boardWidth/gridSize);
    board.innerHTML = '';
    for(let i = 0; i < gridSize; i++){
        let row = document.createElement('div');
        row.setAttribute('class', 'row justify-content-center');
        board.appendChild(row);
        for(let j = 0; j < gridSize; j++){
            let newDiv = document.createElement('div');
            newDiv.style.width = divSize + 'px';
            newDiv.style.height = divSize + 'px';
            newDiv.classList.add('grid-item');
            if(gridOn){
                newDiv.classList.add('grid-lines');
            }
            row.appendChild(newDiv);
        }
    }
    gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => paintItem(item));
}

function resizeGrid(){
    gridSize = gridSlider.value;
    gridItems.forEach(function(item){
        let boardWidth = board.offsetWidth;
        let divSize = (Math.floor(boardWidth/gridSize) - 1);
        item.style.width = divSize + 'px';
        item.style.height = divSize + 'px';
        item.classList.add('grid-lines');
    });
}

function eraseGrid(){
    gridItems.forEach(function(item){
        item.style.backgroundColor = '#fff';
    });
}

function getColor(){
    let colorPalette = document.querySelector('#color-select').value;
    let colors = [];

    if(colorPalette === 'rainbow'){
        colors = ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee'];
    } else if(colorPalette === 'dark'){
        colors = ['#0c020f', '#15101a', '#1d1d25', '#252b30', '#2d383a', '#000', '#5c5c5c'];
    } else {
        colors = ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'];
    }

    let randomNumber = Math.floor(Math.random() * 7);
    return colors[randomNumber];
}

function paintItem(item){
    item.addEventListener('mouseover', function(){
        if(!mouseDown) return;
        item.style.backgroundColor = getColor();
    });
}

function toggleSwitch(){
    gridItems.forEach(function(item){
        item.classList.toggle('grid-lines');
        if (gridOn){
            gridOn = false;
        } else{
            gridOn = true;
        }
    });
}