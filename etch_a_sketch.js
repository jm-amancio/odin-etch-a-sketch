let grid = document.querySelector('#grid');
let gridSize = 450;              // size of grid is 450px x 450px
let rowDiv = [], columnDiv = [];
let row = 16, column = 16;
let color = "black";

setGrid(16, 16);

//
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// adds event listener to each button
const grid_edit_buttons = document.getElementsByTagName('button');
for(let i=0; i<grid_edit_buttons.length; i++){
    grid_edit_buttons[i].addEventListener('click', (e) => {
        setColor(e.target.value);
    });
}

// prompt user for new grid size
document.getElementById('grid-size-edit').addEventListener('click', () => {
    let newSize = prompt("Enter new grid size (1 <= size <= 100):");
    if(newSize > 0 && newSize <= 100) {
        grid.innerHTML = "";
        setGrid(newSize, newSize);
    }
});

function setGrid(row, column){  
    for(let i=0; i<row; i++){
        rowDiv[i] = document.createElement('div');
        rowDiv[i].classList.add('grid-row');
        for(let j=0; j<column; j++){
            columnDiv[j] = document.createElement('div');
            columnDiv[j].classList.add('grid-column');
            columnDiv[j].style.minWidth = `${gridSize/row}px`;
            columnDiv[j].style.minHeight = `${gridSize/row}px`;
            rowDiv[i].appendChild(columnDiv[j]);
        }
        grid.appendChild(rowDiv[i]);
    }
    // adds event listener to each block; can be optimized
    for(let i=0; i<row; i++){
        for(let j=0; j<column; j++){
            rowDiv[i].children[j].addEventListener('mousedown', ()=> {
                if(color !== "black" && color !== "white") color = randomColor();
                rowDiv[i].children[j].style.backgroundColor = color;
            });
            rowDiv[i].children[j].addEventListener('mouseover', ()=> { 
                if (mouseDown) {
                    if(color !== "black" && color !== "white") color = randomColor();
                    rowDiv[i].children[j].style.backgroundColor = color;
                }
            });
        }
    }
}

function setColor(colorPreference){
    color = "black"; 
    if(colorPreference === "black") {
        color = "black";
    } else if (colorPreference === "rainbow") {
        color = "rainbow";
    } else if (colorPreference === "remove") {
        color = "white";
    } else if (colorPreference === "remove-all") {
        for(let i=0; i<row; i++){
            for(let j=0; j<column; j++){
                rowDiv[i].children[j].style.backgroundColor = "white";
            }
        }     
    }
}

function randomColor (){
    let red = Math.floor(Math.random()*255);
    let green = Math.floor(Math.random()*255);
    let blue = Math.floor(Math.random()*255);
    return `RGB(${red}, ${green}, ${blue})`;
}