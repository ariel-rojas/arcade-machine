const grid = document.querySelector('.grid')
let width=3
let squares = []
function createBoard(){
    for(let i=0; i< width*width; i++){
        const square = document.createElement('div')
        square.setAttribute('id',i)
        square.innerHTML = 0
        grid.appendChild(square)
        squares.push(square)
    }
}
createBoard()
console.log(squares)

