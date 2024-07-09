// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Juego del número secreto';

// let parrafo = document.querySelector('.texto__parrafo');
// parrafo.innerHTML = 'Indica un número del 1 al 10';

// Función para asignar textos a los diferentes elementos HTML

let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

condicionesIniciales();

function reiniciarJuego() {
    // Limpiar la caja de texto
    limpiarCaja();
    // Indicar nuevamente el mensaje inicial
    // Generar el número aleatorio
    // Reiniciar intentos
    condicionesIniciales();
    // Desabilitar el botón de nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled', 'true'); // AGREGAR ATRIBUTOS
}

function condicionesIniciales() {
    asignarElementoTexto('h1', 'Juego del número secreto');
    asignarElementoTexto('.texto__parrafo', `Indica un número del 1 al ${numeroMaximo}:`);
    intentos = 1;
    numeroSecreto = generarNumeroSecreto();
}

function asignarElementoTexto(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
};

function generarNumeroSecreto() {
    let numeroSecreto = Math.floor(Math.random()*numeroMaximo)+1; // Generar número aleatorio
    console.log(numeroSecreto);
    if (listaNumerosSorteados.includes(numeroSecreto)) {
        if (listaNumerosSorteados.length == numeroMaximo){
            asignarElementoTexto('.texto__parrafo', 'Ya se sortearon todos los números posibles!');
            document.querySelector('.container__boton').setAttribute('disabled', 'true');
            return;
        } else {
            console.log('otro');
            return generarNumeroSecreto(); // Recusividad  // RETURN
        }
    } else {
        listaNumerosSorteados.push(numeroSecreto);
        console.log(listaNumerosSorteados);
        return numeroSecreto;                              // RETURN
    }
};

//console.log(generarNumeroSecreto());

function verificarIntento() {
    let numeroUsuario = parseInt(document.getElementById('intento').value);
    
    if(numeroSecreto === numeroUsuario) {
        asignarElementoTexto('.texto__parrafo', `Acertaste el número secreto luego de ${intentos} ${intentos == 1 ? 'intento!' : 'intentos!'}`);
        document.getElementById('reiniciar').removeAttribute('disabled'); // QUITAR ATRIBUTOS
    } else if(numeroUsuario < numeroSecreto) {
        asignarElementoTexto('.texto__parrafo', 'El número secreto es MAYOR al ingresado!');
    } else {
        asignarElementoTexto('.texto__parrafo', 'El número secreto es MENOR al ingresado!');
    }

    intentos++;
    limpiarCaja();
    return;
};

function limpiarCaja() {
    document.getElementById('intento').value = '';
}