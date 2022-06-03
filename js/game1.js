
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
    moverNave(dir, grid){
        grid[this.x][this.y].classList.remove('nave');
        this.y += dir;
        grid[this.x][this.y].classList.add('nave');
        }
    disparar(){
        let proyectil = new Proyectil(this.x - 1,this.y)
        return proyectil
    }
  }

class Proyectil {
    // se mueve en linea recta hasta impactar sobre un alien 
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    crearProyectil(grid){
        grid[this.x][this.y].classList.add('proyectil')
    }
    moverProyectil(x, y, grid){
        grid[proyectil.x][proyectil.y].classList.remove('proyectil');
        proyectil.x -= 1;
        grid[proyectil.x][proyectil.y].classList.add('proyectil');
        console.log(contador)
        }
}

// creo el mapa
const grid = document.querySelector('.grid');
const mapa = new Mapa(16, 16);
matriz =mapa.crearMapa(grid);


// creo la  nave
const nave = new Nave(15,7);
nave.crearNave(matriz)

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  } // no me funciona :(

function teclas(e){
    // muevo nave con flechitas izquierda y derecha
    // disparo con flechita arriba
    switch(e.key){
        case 'ArrowLeft':
            if (nave.y > 0){nave.moverNave(-1, matriz); break;}
            else{break;}
        case 'ArrowRight':
            if (nave.y < mapa.columnas - 1){nave.moverNave(1, matriz); break;} 
            else{break;}    
        case 'ArrowUp':
            contador += 1;
            proyectiles = localStorage.setItem('proyectiles',contador)
            proyectil = nave.disparar();
            setInterval(proyectil.moverProyectil,300, proyectil.x, proyectil.y, matriz)
            
            

    }
}
let contador = 0;
document.addEventListener('keydown', teclas)
let contadorguardado = localStorage.getItem('proyectiles')