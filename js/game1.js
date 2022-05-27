const grid = document.querySelector('.grid')
let columnas=7
let filas=2
let squares = []
function createBoard(){
    for(let i=0; i< columnas*filas; i++){
        const square = document.createElement('div')
        square.setAttribute('id',i)
        square.innerHTML = 0
        grid.appendChild(square)
        squares.push(square)
    }
}
createBoard()
console.log(squares)


// math is not defined at (revisar error)
let a = math.zeros(2, 2) 
alert(a)