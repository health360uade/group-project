$(document).ready(function () {
  const story = [
    {
      text: "1-Te despiertas sintiéndote agotado y sin energía. ¿Qué haces?",
      image: "imagenes/despertar.jpg",
      options: [
        { text: "Levántate y haz algo de ejercicio", next: 2 },
        { text: "Sigue durmiendo", next: 3 },
      ],
    },
    {
      text: "2-Haces ejercicio y te sientes más energizado. ¿Qué haces a continuación?",
      image: "imagenes/ejercicio.jpg",
      options: [
        { text: "Tómate una ducha y desayuna", next: 4 },
        { text: "Siéntate a revisar tus redes sociales", next: 5 },
      ],
    },
    {
      text: "3-Te sientes un poco más descansado, pero sigues sin energía. ¿Qué haces?",
      image: "imagenes/dormir.jpg",
      options: [
        { text: "Tómate un café", next: 6 },
        { text: "Quédate en la cama revisando el móvil", next: 7 },
      ],
    },
    {
      text: "4-Te sientes renovado y listo para enfrentar el día. ¿Qué haces?",
      image: "imagenes/ducha.jpg",
      options: [
        { text: "Planifica tu día y establece metas", next: 8 },
        { text: "Deja que el día te lleve a donde quiera", next: 9 },
      ],
    },
    {
      text: "5-Sientes que pierdes tiempo y energía revisando las redes. ¿Qué haces?",
      image: "imagenes/redes_sociales.jpg",
      options: [
        { text: "Deja el móvil y haz algo productivo", next: 8 },
        { text: "Sigue navegando sin rumbo", next: 10 },
      ],
    },
    {
      text: "6-Te sientes más despierto y motivado. ¿Qué haces?",
      image: "imagenes/cafe.jpg",
      options: [
        { text: "Encuentra una actividad que disfrutes", next: 4 },
        { text: "Siéntate a revisar tus redes sociales", next: 5 },
      ],
    },
    {
      text: "7-Te sientes atrapado en un círculo vicioso. ¿Qué haces?",
      image: "imagenes/atrapado.jpg",
      options: [
        { text: "Busca ayuda profesional", next: 10 },
        { text: "Intenta salir por tu cuenta", next: 10 },
      ],
    },
    {
      text: "8-Establecer metas te ayuda a enfocarte y ser más productivo. ¡Buen trabajo!",
      image: "imagenes/metas.jpg",
      options: [{ text: "Ver tu certificado", next: 18 }],
    },
    {
      text: "9-Dejar que el día te lleve te hace sentir desorganizado y estresado. ¿Qué haces?",
      image: "imagenes/estres.jpg",
      options: [
        { text: "Planifica mejor tu día", next: 8 },
        { text: "Sigue sin un plan", next: 10 },
      ],
    },
    {
      text: "10-Buscar ayuda es una excelente decisión. Te ayuda a encontrar nuevas formas de enfrentar tus problemas.",
      image: "imagenes/ayuda_profesional.jpg",
      options: [{ text: "Ver tu certificado", next: 18 }],
    },
    {
      text: "11-Intentar salir por tu cuenta es difícil, pero con esfuerzo y dedicación puedes lograrlo.",
      image: "imagenes/dificil.jpg",
      options: [{ text: "Ver tu certificado", next: 18 }],
    },
    {
      text: "12-Te sientes motivado y decides leer un libro sobre desarrollo personal. ¿Qué haces después?",
      image: "imagenes/leer_libro.jpg",
      options: [
        { text: "Aplicar lo aprendido y establecer nuevas rutinas", next: 15 },
        {
          text: "Dejarlo para después y volver a la rutina habitual",
          next: 10,
        },
      ],
    },
    {
      text: "13-Te tomas un descanso y decides meditar. ¿Cómo te sientes después?",
      image: "imagenes/meditar.jpg",
      options: [
        { text: "Más calmado y enfocado", next: 16 },
        { text: "Igual de estresado que antes", next: 10 },
      ],
    },
    {
      text: "14-Decides hablar con un amigo cercano sobre tus preocupaciones. ¿Qué hace tu amigo?",
      image: "imagenes/hablar_amigo.jpg",
      options: [
        { text: "Te apoya y te da buenos consejos", next: 17 },
        { text: "No parece entender tu situación", next: 10 },
      ],
    },
    {
      text: "15-Establecer nuevas rutinas te ayuda a mantenerte enfocado y productivo. ¡Buen trabajo!",
      image: "imagenes/nuevas_rutinas.jpg",
      options: [{ text: "Ver tu certificado", next: 18 }],
    },
    {
      text: "16-Te sientes más calmado y puedes enfrentar mejor tus tareas. ¡Buen trabajo!",
      image: "imagenes/calmado.jpg",
      options: [{ text: "Ver tu certificado", next: 18 }],
    },
    {
      text: "17-El apoyo de tu amigo te motiva a seguir adelante. ¡Buen trabajo!",
      image: "imagenes/apoyo_amigo.jpg",
      options: [{ text: "Ver tu certificado", next: 18 }],
    },
    {
      text: "18-¡Felicidades! Has completado el juego. Recuerda siempre cuidar tu salud mental.",
      image: "imagenes/certificado.jpg",
      options: [],
      certificate: true,
    },
  ];

  function displayStory(index) {
    const currentStory = story[index - 1];
    let html = `
            <img class="game-img" src="${currentStory.image}" alt="Imagen relacionada" height="500" >
            <p>${currentStory.text}</p>
        `;

    if (currentStory.options.length > 0) {
      html += currentStory.options
        .map(
          (option) =>
            `<button class="option" data-next="${option.next}">${option.text}</button>`
        )
        .join("");
    } else if (currentStory.certificate) {
      html += `
                <div class="certificate">
                    <h3>Certificado de Finalización</h3>
                    <p>¡Felicidades! Has completado el juego.</p>
                    <p>Recuerda siempre cuidar tu salud mental.</p>
                    <p>Espero haberte ayudado.</p>
                    <p>Si necesitas ayuda, no dudes en buscar apoyo profesional.</p>
                    <h3>Recomendaciones</h3>
                    <p>Tomar sol.</p>
                     <p>Formar parte de una comunidad o deporte.</p>
                     <p>Hablar sin miedo sobre problemáticas que nos afectan.</p>
                     <p>Empatía con los demás.</p>
                     <p>Si sentís que una situación rebasa tus capacidades de procesarla o genera mucha incomodidad en eldía a día, buscar ayuda profesional en psicólogos y psiquiatras que puedan ayudarte.</p>
                     <p>Buscar una actividad que nos apasione.</p>
                     <p>Mantener una rutina de sueño saludable. (cantidad y calidad de las horas del sueño)</p>
                      <button id="print-certificate">Imprimir Certificado</button>
                </div>
            `;
    }
    html += `
            <div id="button-container">
              <button id="return-btn">Volver a empezar</button>
              <button id="return-project">Volver al proyecto principal</button>
              <button id="return-manual">Ver manual</button>
            </div>
            `;

    $("#story").html(html);
  }

  $("#story").on("click", ".option", function () {
    const next = $(this).data("next");
    displayStory(next);
  });

  // Función para volver al inicio
  $("#story").on("click", "#return-btn", function () {
    displayStory(1);
  });

  // Función para redireccionar al manual
  $("#story").on("click", "#return-manual", function () {
    window.location.href = "guide.html";
  });

  // Función para redireccionar al proyecto
  $("#story").on("click", "#return-project", function () {
    window.location.href = "../../index.html";
  });
  // Mostrar la primera historia al cargar la página
  displayStory(1);

  // Función para imprimir la página
function printCertificate() {
  window.print();
}

// Agregar el evento de clic para el botón de impresión del certificado
$("#story").on("click", "#print-certificate", function () {
  printCertificate();
});
});


