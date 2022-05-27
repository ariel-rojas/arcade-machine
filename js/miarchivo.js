
// agarro los links en un array
let linkJuegos = document.getElementsByClassName("juego");

// funcion que visualiza en que juego estoy posicionado
function preseleccion(links, n){
    for(let m=0;m<links.length; m++){
        if(n==m){
            links[m].style.color="orange";
            links[m].style.backgroundColor = "white";
        }
        else{
            links[m].style.color="white";
            links[m].style.backgroundColor = "transparent";
        }
    }

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
            if(i<2){
                i+=1;break;
            }
            else{
                break;
            }
    }
    preseleccion(linkJuegos,i)
    
    if (e.key === "Enter"){
        e.preventDefault();
        alert(linkJuegos[i].innerText + " se habilitará próximamente! Intente de nuevo más tarde")
    }
})







