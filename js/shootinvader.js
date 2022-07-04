let total = 20;
let turnoUsuario = true;
let invasoresIds = Array.from(Array(20).keys())
const marcador = document.querySelector('.marcador');
const turnoDe = document.querySelector('.turnoDe')
const elegidos = document.querySelector('#invasoresElegidos')
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
                cuadrado.className = "invasor"
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
// creo el mapa con las invasores
const grid = document.querySelector('.grid');
const mapa = new Mapa(4, 5);
matriz =mapa.crearMapa(grid);

// el adversario realiza los disparos de forma asincronica
function disparoAsincronico(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      random = Math.floor(Math.random()*invasoresIds.length);
      invasorElegido =  document.getElementById(invasoresIds[random]);
      invasorElegido.className = "invasorDisparado";
      invasoresIds = invasoresIds.filter(number => number != invasoresIds[random]);
      
      total -=1;
      marcador.innerText = "Invasores vivos: "+ total;
      if(total ==0){
        Swal.fire({
          title: "Has perdido!", 
          text: "Tu adversario eliminó al último invasor.", 
          type: "success",
          confirmButtonText: "<div class = 'button'> Volver a jugar </div>"
        }).then((result) => {
          // Recarga la página
          location.reload();
        });
      }
      resolve();
    }, seconds * 1000);
  });
}
async function disparo(seconds) {
  await disparoAsincronico(seconds);
}

let n = 0
document.addEventListener('click', (e) => {
  if(e.target.id == "instrucciones"){
    Swal.fire(
      '¿Cómo se juega?',
      'Cada jugador puede disparar a 1,2 o 3 invasores en su turno. \n \n Gana el que dispare al último invasor.',
      'question'
      
    )
  }
  if(e.target.className == "invasor" && n<3){
    invasorElegido = document.getElementById(e.target.id);
    invasorElegido.className = "invasorDisparado";
    invasoresIds = invasoresIds.filter(number => number != e.target.id);
    total -=1;
    marcador.innerText = "Invasores vivos: "+ total;
    n+=1;
  }
  else if(e.target.className == "invasor" && n==3){
    elegidos.innerText= "Ya disparaste a 3 invasores, finaliza el turno"
  }
  else if(e.target.id == "turnos" && n==0){
    elegidos.innerText= "Todavía no disparaste"
  }
  else if(e.target.id == "turnos"){
    // turnoDe.innerText = "Es turno de tu adversario";
    let m = 4 - n;
    for(let i = 1; i<=m;i++){
      disparo(i*0.5);
      elegidos.innerText= "Tu adversario disparó a "+m+" invasores"
    }
    n=0;
  }
})



