let baraja = [];
const tipos = ["C", "D", "H", "S" ];
const especiales = ["A", "J", "Q", "K"]; //10, A = 10 o 11

const btnPedir = document.querySelector("#btnPedir");
const btnNuevo = document.querySelector("#btnNuevo");
const btnDetener = document.querySelector("#btnDetener");

let puntosjugador = 0, puntoscomputadora = 0;

const creaBaraja = () => {
    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            baraja.push(i + tipo);
        }
    }

    for(let tipo of tipos){
        for(let especial of especiales){
            baraja.push(especial + tipo);
        }   
    }

    baraja = _.shuffle(baraja);

    console.log(baraja);
    
};

creaBaraja();

const pedirCarta = () => {

    if(baraja.length==0){
        console.warn("NO HAY CARTAS EN LA BARAJA");
        throw "No hay cartas en la baraja";
    }
    const carta = baraja.pop();
    
    console.log(carta);
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length-1);

    let puntos = 0;

    if(isNaN(valor)) {
        console.log('No es un numero')
        puntos= valor == "A" ? 11 : 10;
    } else{
        console.log('es un numero')
        puntos=valor * 1 ;
    }
    return puntos
};



const jugadorCartas = document.querySelector("#jugador-cartas");
const computadoraCartas = document.querySelector("#computadoras-cartas");

const puntosJugadorHTML = document.querySelectorAll("h1 small")[0];
const puntosComputadoraHTML = document.querySelectorAll("h1 small")[1];

let juegoTerminado = false;

const mostrarCartaJugador = (carta) => {

    const imgCarta = document.createElement("img");

    imgCarta.src = `assets/${carta}.png`;
    imgCarta.classList.add("carta");
    imgCarta.alt = "carta jugador";

    jugadorCartas.append(imgCarta);
};

const mostrarCartaComputadora = (carta) => {

    const imgCarta = document.createElement("img");

    imgCarta.src = `assets/${carta}.png`;
    imgCarta.classList.add("carta");
    imgCarta.alt = "carta computadora";

    computadoraCartas.append(imgCarta);
};

const actualizarPuntos = () => {

    puntosJugadorHTML.innerText = puntosjugador;
    puntosComputadoraHTML.innerText = puntoscomputadora;

};

const determinarGanador = () => {

    if (puntosjugador > 21) {

        alert("XD Perdiste. Te pasaste de 21");

    } else if (puntoscomputadora > 21) {

        alert("¡Ganaste! La computadora se pasó de 21");

    } else if (puntosjugador === puntoscomputadora) {

        alert("Empate");

    } else if (puntosjugador > puntoscomputadora) {

        alert("¡Ganaste!");

    } else {

        alert("Ganó la computadora");

    }

    juegoTerminado = true;
};

const turnoComputadora = () => {

    while (
        puntoscomputadora < puntosjugador &&
        puntoscomputadora < 21
    ) {

        const carta = pedirCarta();

        puntoscomputadora =
            puntoscomputadora + valorCarta(carta);

        mostrarCartaComputadora(carta);

        actualizarPuntos();
    }

    determinarGanador();
};

btnPedir.addEventListener("click", () => {

    if (juegoTerminado) {
        return;
    }

    const carta = pedirCarta();

    puntosjugador =
        puntosjugador + valorCarta(carta);

    mostrarCartaJugador(carta);

    actualizarPuntos();

    if (puntosjugador === 21) {

        alert("¡Blackjack! 🎉");

        turnoComputadora();

        return;
    }

    if (puntosjugador > 21) {

        determinarGanador();

        return;
    }

});

btnDetener.addEventListener("click", () => {

    if (juegoTerminado) {
        return;
    }

    turnoComputadora();

});

btnNuevo.addEventListener("click", () => {
    baraja = [];

    puntosjugador = 0;
    puntoscomputadora = 0;

    juegoTerminado = false;

    creaBaraja();

    jugadorCartas.innerHTML = "";
    computadoraCartas.innerHTML = "";

    actualizarPuntos();


    console.log("Nuevo juego iniciado");

});
