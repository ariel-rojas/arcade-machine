
class Mapa {
    // Parametros: cantidad de filas (int) y columnas (int) del mapa 
    constructor(filas, columnas) {
      this.filas = filas;
      this.columnas = columnas;
    }
    crearMapa(tag){
    // Parametro: tag HTML donde crea el mapa
    // devuelve a su vez un array de arrays con las filas
        let matriz = [];
        for(let i = 0; i< this.filas; i++){
            const fila = [];
            for(let j=0; j< this.columnas; j++){
                const cuadrado = document.createElement('div');
                tag.appendChild(cuadrado);
                fila.push(cuadrado)
            }
            matriz.push(fila)
        }
        return matriz
    }
  }


// creo la nave como un objeto que se puede mover a los laterales y disparar, y una funcion que interaccione con el html
class Nave {
    // Parametros: posicion 'x' e 'y' en el mapa
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    crearNave(grid){
        grid[this.x][this.y].classList.add('nave')
    }
    // la nave se puede mover en el eje y
    moverNave(dir, grid){
        grid[this.x][this.y].classList.remove('nave');
        this.y += dir;
        grid[this.x][this.y].classList.add('nave');
        }
  }
// creo a los aliens invasores
  class Alien {
    // Parametros: posicion 'x' e 'y' en el mapa
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    crearAlien(grid){
        grid[this.x][this.y].classList.add('alien')
    }
    moverAlien(grid){
        if(this.y< grid.length){
            grid[this.x][this.y].classList.remove('alien')
            grid[this.x][this.y+1].classList.add('alien')
                }
        else{
            grid[this.x][this.y].classList.remove('alien')
            grid[this.x+1][this.y].classList.add('alien')
        }
    }
  }


// creo el mapa
const grid = document.querySelector('.grid');
const mapa = new Mapa(16, 16);
matriz =mapa.crearMapa(grid);
const marcador = document.querySelector('.marcador');
let puntaje = 0;

// el record se guarda en el localStorage
let puntajeRecord = localStorage.getItem("record") || 0;  //asignación condicional
let record = document.getElementById("record");
record.innerHTML = "Record máximo: " + puntajeRecord;

localStorage.setItem("record",puntajeRecord)
// creo la  nave
const nave = new Nave(15,7);
nave.crearNave(matriz)


// creo los aliens

// las listas me dicen valor inicial y final en 'x' e 'y' de las posiciones de los alines
let aliensYIn = 6;
let aliensYFin = 16;
let aliensXIn = 0;
let aliensXFin = 3;

for(let i=aliensXIn; i<aliensXFin;i++){
    for(let j=aliensYIn; j<aliensYFin; j++){
        const alien = new Alien(i,j);
        alien.crearAlien(matriz)
    }
}
// hago que se muevan
let moverDerecha = false;

function moverAliens(grid){
    // si se mueven a la izquierda y no llegaron al extremo
    if(!moverDerecha && aliensYIn >0){
        for(let i=aliensXIn; i<aliensXFin;i++){
            for(let j=aliensYIn; j<aliensYFin; j++){
                if(grid[i][j].classList.contains('alien')){
                    grid[i][j].classList.remove('alien');
                    grid[i][j-1].classList.add('alien');
                }
            }
        }
        aliensYIn -=1;
        aliensYFin-= 1;
    }
    // cuando venian moviendose a la izquierda y llegaron al extremo los bajo
    else if(!moverDerecha && aliensYIn ==0){
        for(let i=aliensXFin-1; i>=aliensXIn;i--){
            for(let j=aliensYFin-1; j>=aliensYIn; j--){
                if(grid[i][j].classList.contains('alien')){
                    grid[i][j].classList.remove('alien');
                    grid[i+1][j].classList.add('alien');
                }
            }
        }
        aliensXIn +=1;
        aliensXFin+= 1;
        if(aliensXFin == 16){
            Swal.fire({
                title: "Perdiste!", 
                text: "Los invasores lograron ingresar", 
                type: "success",
                confirmButtonText: "<div class = 'button'> Volver a jugar </div>"
              }).then((result) => {
                // Reload the Page
                location.reload();
              });
        }
        moverDerecha= true;
    }
    // si se mueven a la derecha y no llegan al extremo
    else if(moverDerecha && aliensYFin<grid[0].length){
        for(let i=aliensXFin-1; i>=aliensXIn;i--){
            for(let j=aliensYFin-1; j>=aliensYIn; j--){
                if(grid[i][j].classList.contains('alien')){
                    grid[i][j].classList.remove('alien');
                    grid[i][j+1].classList.add('alien');
                }
            }
        }
        aliensYIn +=1;
        aliensYFin+= 1;
    }
    // cuando venian moviendose a la derecha y llegaron al extremo los bajo
    else if(moverDerecha && aliensYFin==grid[0].length){
        for(let i=aliensXFin-1; i>=aliensXIn;i--){
            for(let j=aliensYIn; j<aliensYFin; j++){
                if(grid[i][j].classList.contains('alien')){
                    grid[i][j].classList.remove('alien');
                    grid[i+1][j].classList.add('alien');
                }
            }
        }
        aliensXIn +=1;
        aliensXFin+= 1;
        if(aliensXFin == 16){
            Swal.fire({
                title: "Perdiste!", 
                text: "Los invasores lograron ingresar", 
                type: "success",
                confirmButtonText: "<div class = 'button'> Volver a jugar </div>"
              }).then((result) => {
                // Reload the Page
                location.reload();
              });
        }
        moverDerecha= false;
    }
}

invadersId = setInterval(moverAliens,200, matriz)




function mover(e){
    // muevo nave con flechitas izquierda y derecha
    switch(e.key){
        case 'ArrowLeft':
            if (nave.y > 0){nave.moverNave(-1, matriz); break;}
            else{break;}
        case 'ArrowRight':
            if (nave.y < mapa.columnas - 1){nave.moverNave(1, matriz); break;} 
            else{break;}
    }
}
document.addEventListener('keydown', mover)

// ahora defino la funcion para disparar y que el laser se mueva
function disparar(e){
    let laserId;
    let laserX = nave.x;
    let laserY = nave.y ;

    function moverLaser(grid){
        if(grid[laserX][laserY].classList.contains('alien')){
            grid[laserX][laserY].classList.remove('laser');
            grid[laserX][laserY].classList.remove('alien');
            grid[laserX][laserY].classList.add('explosion');
            let source = document.getElementsByTagName('html')[0].innerHTML;
            puntaje += 10 * (grid.length - laserX);
            grid[laserX][laserY].innerHTML = 10 * (grid.length - laserX);
            setTimeout(() => grid[laserX][laserY].classList.remove('explosion'),150);
            setTimeout(() => grid[laserX][laserY].innerHTML = "",150);
            marcador.innerHTML = "Puntaje: " + puntaje;
            clearInterval(laserId);
            if(!source.includes("alien", 1)){
             Swal.fire({
                title: "Has ganado!", 
                text: "Has conseguido "+puntaje+" puntos.", 
                type: "success",
                confirmButtonText: "<div class = 'button'> Volver a jugar </div>"
              }).then((result) => {
                // Reload the Page
                location.reload();
              });
              if(puntaje>puntajeRecord){
                puntajeRecord = puntaje;
                record.innerHTML = "Record máximo: " + puntajeRecord;
                localStorage.setItem("record",puntajeRecord)
              }
            }
        }
        else if(laserX>0){
            grid[laserX][laserY].classList.remove('laser');
            laserX -= 1;
            grid[laserX][laserY].classList.add('laser');
        }
        else{grid[laserX][laserY].classList.remove('laser')}
    }
    switch(e.key){
        case 'ArrowUp':
            laserId = setInterval(moverLaser,100, matriz)
    }
}
document.addEventListener('keyup', disparar)
