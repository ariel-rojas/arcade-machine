
// agarro los links en un array
let linkJuegos = document.getElementsByClassName("gameLink");

// funcion que visualiza en que juego estoy posicionado
function preseleccion(links, n){
    for(let m=0;m<links.length; m++){
        if(n==m){
            links[m].style.color="#AA2EE6";
        }
        else{
            links[m].style.color="white";
        }
    }

}
function ingresar(links,n){
    links[n].click();
}
// me desplazo con las flechitas arriba y abajo
let i = 0
preseleccion(linkJuegos,i)
window.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'ArrowUp':
            if(i>0){
                i -= 1;break;
            }
            else{
                break;
            }
        case 'ArrowDown':
            if(i<1){
                i+=1;break;
            }
            else{
                break;
            }
        case 'Enter' :
            e.preventDefault();
            ingresar(linkJuegos,i)
    }
    preseleccion(linkJuegos,i)
})







