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
                cuadrado.className = "manzana";
                tag.appendChild(cuadrado);
                fila.push(cuadrado)
            }
            matriz.push(fila)
        }
        return matriz
    }
  }
// creo el mapa con las manzanas
const grid = document.querySelector('.grid');
const mapa = new Mapa(5, 5);
matriz =mapa.crearMapa(grid);