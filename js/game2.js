let total = 20;
let turnoUsuario = true;
let manzanasIds = Array.from(Array(20).keys())
const marcador = document.querySelector('.marcador');
const turnoDe = document.querySelector('.turnoDe')
const elegidas = document.querySelector('#manzanasElegidas')
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
        let n = 0;
        for(let i = 0; i< this.filas; i++){
            const fila = [];
            for(let j=0; j< this.columnas; j++){
                const cuadrado = document.createElement('button');
                cuadrado.className = "manzana"
                cuadrado.setAttribute("id", n);
                tag.appendChild(cuadrado);
                fila.push(cuadrado)
                n+=1;
            }
            matriz.push(fila)
        }
        return matriz
    }
  }
// creo el mapa con las manzanas
const grid = document.querySelector('.grid');
const mapa = new Mapa(4, 5);
matriz =mapa.crearMapa(grid);




let n = 0
document.addEventListener('click', (e) => {
  
  if(e.target.className == "manzana" && n<3){
    manzanaElegida = document.getElementById(e.target.id);
    manzanaElegida.className = "manzanaMordida";
    manzanasIds = manzanasIds.filter(number => number != e.target.id);
    total -=1;
    marcador.innerText = "Manzanas disponibles: "+ total;
    n+=1;
  }
  else if(e.target.className == "manzana" && n==3){
    console.log("Ya comiste 3, finaliza el turno")
  }
  else if(e.target.className == "turnos" && n==0){
    console.log("No comiste ninguna manzana")
  }
  else if(e.target.className == "turnos"){
    // turnoDe.innerText = "Es turno de tu adversario";
    let m = 4 - n;
    for(let i = 0; i<m;i++){
      random = Math.floor(Math.random()*manzanasIds.length);
      manzanaElegida =  document.getElementById(manzanasIds[random]);
      manzanaElegida.className = "manzanaMordida";
      manzanasIds = manzanasIds.filter(number => number != manzanasIds[random]);
      
      total -=1;
      marcador.innerText = "Manzanas disponibles: "+ total;
      elegidas.innerText= "Tu adversario se comió "+m+" manzanas"
    }
    n=0;
  }
})


