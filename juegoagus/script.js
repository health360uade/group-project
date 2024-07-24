// script.js

// total de preguntas del juego
const TOTAL_PREGUNTAS = 9;

// variable que lleva la cantidad acertada
var cantidadAcertadas = 0;

// variable que controla la pregunta actual
var numPreguntaActual = -1;

// que pregunta se respondio y que no
var estadoPreguntas = new Array(TOTAL_PREGUNTAS).fill(0);

// creamos la base de datos de las preguntas
const bd_juego = [
    { id: 'A', pregunta: "Qué palabra describe la dificultad para respirar", respuesta: "asfixia" },
    { id: 'B', pregunta: "Condición de sanidad desde el punto de vista físico, mental y emocional", respuesta: "bienestar" },
    { id: 'C', pregunta: "Actividad Física más importante", respuesta: "caminar" },
    { id: 'D', pregunta: "Neurotransmisor que se encuentra en el sistema nervioso central que participa en la conducta motora, la emotividad y afectividad ", respuesta: "dopamina" },
    { id: 'E', pregunta: "Esta vitamina se encuentra en el pescado", respuesta: "e" },
    { id: 'F', pregunta: "El deporte más popular del mundo", respuesta: "futbol" },
    { id: 'G', pregunta: "Lugar al que se va a hacer ejercicio", respuesta: "gimnasio" },
    { id: 'H', pregunta: "Nutriente esencial que se encuentra en legumbres", respuesta: "hierro" },
    { id: 'I', pregunta: "Capacidad de resistir enfermedades y protegerse contra agentes patógenos", respuesta: "inmunidad" },
]

// variable para controlar el tiempo
const timer = document.getElementById("tiempo");
// tiempo del juego en segundo
const TIEMPO_DEL_JUEGO = 150;
// variable que indica el tiempo del juego restante
let timeLeft = TIEMPO_DEL_JUEGO;
// variable que maneja el contador
var countdown;

// creamos las letras
const container = document.querySelector(".container");
for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = String.fromCharCode(i + 96);
    circle.id = String.fromCharCode(i + 96).toUpperCase();
    container.appendChild(circle);

    const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
    const x = Math.round(95 + 120 * Math.cos(angle));
    const y = Math.round(95 + 120 * Math.sin(angle));
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
}

// boton comenzar
var comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function (event) {
    document.getElementById("pantalla-inicial").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";

    // alargamos el tiempo
    largarTiempo();
    cargarParegunta();
})

function largarTiempo() {
    countdown = setInterval(() => {
        timeLeft--;
        timer.innerText = timeLeft;

        if (timeLeft < 0) {
            clearInterval(countdown);
            mostrarPantallaFinal();
        }
    }, 1000);
}

function cargarParegunta() {
    numPreguntaActual++;
    if (numPreguntaActual >= TOTAL_PREGUNTAS) {
        numPreguntaActual = 0;
    }

    if (estadoPreguntas.indexOf(0) >= 0) {
        while (estadoPreguntas[numPreguntaActual] == 1) {
            numPreguntaActual++;
            if (numPreguntaActual >= TOTAL_PREGUNTAS) {
                numPreguntaActual = 0;
            }
        }

        document.getElementById("letra-pregunta").textContent = bd_juego[numPreguntaActual].id;
        document.getElementById("pregunta").textContent = bd_juego[numPreguntaActual].pregunta;
        var letra = bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.add("pregunta-actual");
    } else {
        clearInterval(countdown);
        mostrarPantallaFinal();
    }
}

var respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        if (respuesta.value == "") {
            alert("Debe Ingresar un valor");
            return;
        }

        var txtRespuesta = respuesta.value;
        controlarRespuesta(txtRespuesta.toLowerCase());
    }
})

var responder = document.getElementById("responder");
responder.addEventListener("click", function () {
    if (respuesta.value == "") {
        alert("Debe Ingresar un valor");
        return;
    }

    var txtRespuesta = respuesta.value;
    controlarRespuesta(txtRespuesta.toLowerCase());
});

function controlarRespuesta(txtRespuesta) {
    if (txtRespuesta == bd_juego[numPreguntaActual].respuesta) {
        cantidadAcertadas++;
        estadoPreguntas[numPreguntaActual] = 1;

        var letra = bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.remove("pregunta-actual");
        document.getElementById(letra).classList.add("bien-respondida");
    } else {
        estadoPreguntas[numPreguntaActual] = 1;
        var letra = bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.remove("pregunta-actual");
        document.getElementById(letra).classList.add("mal-respondida");
    }

    respuesta.value = "";
    cargarParegunta();
}

var pasar = document.getElementById("pasar");
pasar.addEventListener("click", function (event) {
    var letra = bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");

    cargarParegunta();
})

function mostrarPantallaFinal() {
    document.getElementById("acertadas").textContent = cantidadAcertadas;
    document.getElementById("score").textContent = ((cantidadAcertadas * 100) / TOTAL_PREGUNTAS).toFixed(2) + "% de acierto";
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-final").style.display = "block";
}

// para volver a comenzar a jugar
var recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function (event) {
    numPreguntaActual = -1;
    timeLeft = TIEMPO_DEL_JUEGO;
    timer.innerText = timeLeft;
    cantidadAcertadas = 0;
    estadoPreguntas = new Array(TOTAL_PREGUNTAS).fill(0);

    var circulos = document.getElementsByClassName("circle");
    for (i = 0; i < circulos.length; i++) {
        circulos[i].classList.remove("pregunta-actual");
        circulos[i].classList.remove("bien-respondida");
        circulos[i].classList.remove("mal-respondida");
    }

    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    respuesta.value = "";

    largarTiempo();
    cargarParegunta();
})
