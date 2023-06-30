const botonPersonajeJugador = document.getElementById('boton-personaje')
const contenedorPersonajes = document.getElementById("contenedor-personajes")
const seleccionar = document.getElementById("boton-personaje");
const seccionLucha = document.getElementById("contenedor-lucha")
const imgJugadores = document.getElementById('img-jugador')
const imgEnemigo = document.getElementById('img-enemigo')
const botonAtaques= document.getElementById('botones-ataques')
const mensaje= document.getElementById('contendedor-mensaje')
const imgAtaque= document.getElementById('contendedor-logo-ataque')
const barraVidaJugador = document.querySelector('#vida-progreso-jugador')
const barraVidaEnemigo = document.querySelector('#vida-progreso-enemigo')
const contenedorBarraJugador = document.querySelector('#contenedor-jugador-vida')
const contenedorBarraEnemigo = document.querySelector('#contenedor-enemigo-vida')
const botonReiniciar = document.getElementById('boton-reiniciar')
const sectionReiniciar = document.getElementById('reiniciar')
let personajes=[]
let ataques=[];
let opcionPersonaje
let inputLion;
let inputJill;
let inputChris; 
let personajeJugador = document.getElementById('img-jugador');
let personajeEnemigo = document.getElementById('img-enemigo');;
let botonAgua= document.getElementById('boton-agua')
let botonFuego= document.getElementById('boton-fuego')
let botonGranada= document.getElementById('boton-granada')
let ataqueJugador;
let ataqueEnemigo;
let vidaJugador=100;
let vidaEnemigo=100;
let tipoataque =1
let enemigo;
let jugador;


class Personajes {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
       
       
    }
}

let lion = new Personajes('Lion','img/lion.png')
let jill = new Personajes('Jill' ,'img/jill.png')
let chris = new Personajes('Chris','img/cr.png')
let albert = new Personajes('albert' ,'./img/albert.png')
let nemesis = new Personajes('nemesis' , './img/nemesis.png')
let salazar= new Personajes('salazar' , './img/salazar.png')
personajes.push(lion,jill,chris)


mensaje.style.display="none";
ataques.push(botonAgua,botonFuego,botonGranada);
personajes.forEach((Personajes)=>{
    opcionPersonaje=`<input type="radio" name="personaje" id=${Personajes.nombre}/>
    <label id=${Personajes.nombre} class="personajes" for=${Personajes.nombre}
        <p>${Personajes.nombre}</p>
        <img src=${Personajes.foto} id=${Personajes.nombre} alt=${Personajes.nombre}
    </label> `

    sectionReiniciar.style.display = 'none'

    contenedorPersonajes.innerHTML += opcionPersonaje;   
    botonReiniciar.addEventListener('click', reiniciarJuego) 
})


inputLion = document.getElementById('Lion');
inputJill= document.getElementById('Jill');
inputChris =document.getElementById('Chris');



botonAtaques.style.display="none"
contenedorBarraJugador.style.display="none"
contenedorBarraEnemigo.style.display="none"
contenedorPersonajes.addEventListener("click", function(event) {
    const target = event.target;
    if (target.tagName === "IMG") {
      const imagenes = contenedorPersonajes.getElementsByTagName("img");
      for (let i = 0; i < imagenes.length; i++) {
        const imagen = imagenes[i];
        imagen.style.display = "none";
        imagen.classList.remove("move-left");    
      }
      
      enemigoAleatorio();
      personajeJugador.innerHTML = mostrarImagen(target.src, target.alt);
      target.classList.add("move-left");
      jugador = (target.alt=="Jill")?"Jill":(target.alt=="Lion")?"Lion":"Chris";
    }
    botonAtaques.style.display="block"
    lucha()
    tipoataque= aleatorio(1,2);
  });

function lucha(){ 
    console.log(vidaJugador)
    console.log(vidaEnemigo)
    contenedorBarraJugador.style.display="block"
    contenedorBarraEnemigo.style.display="block"
    if(vidaJugador >0 && vidaEnemigo>0){
        botonAgua.addEventListener("click", ataquesPersonajes)
        botonFuego.addEventListener("click", ataquesPersonajes)
        botonGranada.addEventListener("click", ataquesPersonajes)
    }else{
        mensaje.style.background ="none";
        mensaje.style.boxShadow ="none";
        imgAtaque.style.display="none";
        botonAgua.style.display="none";
        botonFuego.style.display="none";
        botonGranada.style.display="none";

        mensajeFinal()
    }
}
 



function ataquesPersonajes(e){
    const target = e.target
    if(target.alt=="agua"){
        ataqueJugador = "agua"
    }else if (target.alt=="fuego"){
        ataqueJugador= "fuego"
    }else{
        ataqueJugador="granada"
    }
    ataqueEnemigo = ataqueAleatorio();
    mensaje.style.display="block";
    if(tipoataque==1){
        imgAtaque.innerHTML=mostrarImagen('img/logo-ataque.png')
        let num = luchaCondicion(ataqueJugador,ataqueEnemigo)
        vidaJugador-= num;
        if(vidaJugador<0){
            vidaJugador=0;
        }
        barraVidaJugador.style.width = vidaJugador + "%"
        tipoataque=2
        mensajeAtaque(num)
    }else{
        imgAtaque.innerHTML=mostrarImagen('img/logo-escudo.png')
        let num= luchaCondicion(ataqueJugador,ataqueEnemigo)
        vidaEnemigo-= num
        if(vidaEnemigo<0){
            vidaEnemigo=0;
        }
        barraVidaEnemigo.style.width = vidaEnemigo + "%"
        tipoataque=1
        mensajeDefensa(num)
    }
   
}



function luchaCondicion(ataqueJugador,ataqueEnemigo){
    
    if(ataqueJugador=="agua" && ataqueEnemigo=="agua" || ataqueJugador=="fuego" && ataqueEnemigo=="fuego" || ataqueJugador=="granada" && ataqueEnemigo=="granada"){
        return 10;
    }else if(ataqueJugador=="granada" && ataqueEnemigo=="agua" || ataqueJugador=="agua" && ataqueEnemigo=="fuego" || ataqueJugador=="fuego" && ataqueEnemigo=="granada"){
        return 20;
    }else {
        return  0;
    }

    
}


function mensajeAtaque(vida){
  let img = `
     <p>${jugador} ha ataquado con ${ataqueJugador}, el enemigo ${enemigo} se ha defendido con ${ataqueEnemigo}, le has quitado ${vida} de vida.</p>
  `
  mensaje.innerHTML= img;
  lucha()
}

function mensajeDefensa(vida){
    let img = `
    <p>${enemigo} ha ataquado con ${ataqueEnemigo}, ${jugador} se ha defendido con ${ataqueJugador}, te han quitado ${vida} de vida.</p>
    `
    mensaje.innerHTML= img;
    lucha()
}

function mensajeFinal(){
    if(vidaEnemigo<vidaJugador){
        let img= `
        <img src="img/win.gif" alt="" class="img-logo-final">
        `
        mensaje.innerHTML= img;
    }else{
        let img= `
        <img src="img/lose.gif" alt="" class="img-logo-final">
        `
        mensaje.innerHTML= img;
    }
    sectionReiniciar.style.display = 'block'
}

function ataqueAleatorio(){
    let num = aleatorio(1,3)
    return (num==1)? "agua":(num==2)?"fuego":"granada";
}

function mostrarImagen(direccion, nombre) {
  let imagen = `
    <img src="${direccion}" alt="${nombre}" id="${nombre}">
  `;
  return imagen;
}








function enemigoAleatorio(){
    let num = aleatorio(1,3);
    if(num==1){
        personajeEnemigo.innerHTML= mostrarImagen("./img/albert.png", "Albert");
        enemigo = albert.nombre
    }else if(num==2){
        personajeEnemigo.innerHTML= mostrarImagen("./img/nemesis.png", "Nemesis");
        enemigo = nemesis.nombre
    }else{
        personajeEnemigo.innerHTML= mostrarImagen("./img/salazar.png", "salazar");
        enemigo= salazar.nombre
    }  
}


function reiniciarJuego() {
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}




