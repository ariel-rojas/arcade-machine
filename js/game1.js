const grid = document.querySelector('.grid');
let shooterIndex = 202;
let squares = [];
let width = 15;
let direction = 1;
let invadersId;


function createBoard(){
    for(let i=0; i<225; i++){
        const square = document.createElement('div')
        // square.setAttribute('id',i)
        // square.innerHTML = 0
        grid.appendChild(square)
        squares.push(square)
    }
}
function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }

const alienInvaders = range(0, 9).concat(range(15, 24), range(30, 39))

createBoard()
function draw(){
    for(let i=0; i<alienInvaders.length;i++){
        squares[alienInvaders[i]].classList.add('invader')
    }
}
function remove(){
    for(let i=0; i<alienInvaders.length;i++){
        squares[alienInvaders[i]].classList.remove('invader')
    }
}
draw()

squares[shooterIndex].classList.add('shooter')
// muevo shooters


function moveShooter(e){
    squares[shooterIndex].classList.remove('shooter');
    switch(e.key){
        case 'ArrowLeft':
            if (shooterIndex % width !== 0){shooterIndex -=1; break;}
            else{break;}
        case 'ArrowRight':
            if (shooterIndex % width < width - 1){shooterIndex +=1; break;} 
            else{break;}       

    }
    squares[shooterIndex].classList.add('shooter');
}
document.addEventListener('keydown', moveShooter)

// muevo aliens
function moveInvaders(){
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length] % width === width  - 1;
    remove()
    for(let i=0; i<alienInvaders.length;i++){
        alienInvaders[i] += direction;
    }
    draw();
}

invadersId = setInterval(moveInvaders,200)