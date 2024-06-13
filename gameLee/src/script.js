document.addEventListener('DOMContentLoaded', () => {
  const splashText = document.querySelector('.splash-text');
  const splashContainer = document.querySelector('.splash-container');
  const startScreen = document.getElementById('start-screen');
  const backgroundMusic = document.getElementById('background-music');

  setTimeout(() => {
      splashText.style.opacity = '1';
      splashText.style.transform = 'translateY(0)';

      for (let i = 0; i < 5; i++) {
          setTimeout(() => {
              createSmoke(splashText);
          }, i * 1200);
      }
  }, 500);

  function createSmoke(container) {
      const smoke = document.createElement('div');
      smoke.classList.add('smoke');
      container.appendChild(smoke);

      const x = container.clientWidth / 2;
      const y = container.clientHeight / 2;

      smoke.style.left = `${x}px`;
      smoke.style.top = `${y}px`;

      setTimeout(() => {
          smoke.remove();
      }, 1000);
  }

  splashContainer.addEventListener('click', () => {
      splashContainer.style.display = 'none';
      startScreen.classList.remove('d-none');
  });

  document.getElementById('start-button').addEventListener('click', function() {
      const playerName = document.getElementById('player-name').value;
      if (playerName) {
          startGame(playerName);
      } else {
          alert('Por favor, ingresa tu nombre.');
      }
  });

  function startGame(playerName) {
      document.getElementById('start-screen').classList.add('d-none');
      document.getElementById('game-screen').classList.remove('d-none');

      const gameScreen = document.getElementById('game-screen');
      gameScreen.innerHTML = '';

      const introBox = document.createElement('div');
      introBox.className = 'text-box fade-in';
      const introText = document.createElement('div');
      introText.id = 'intro-text';
      introText.className = 'intro-text';
      introText.textContent = `Eres un estudiante de 15 años que acaba de comenzar la escuela secundaria. A medida que navegas por los desafíos de la adolescencia, te enfrentarás a decisiones que tendrán un impacto duradero en tu salud y bienestar. ¿Tomarás el camino de la responsabilidad y el autocuidado, o sucumbirás a las presiones y tentaciones que te rodean?`;
      introBox.appendChild(introText);
      gameScreen.appendChild(introBox);

      introBox.addEventListener('click', function() {
          startEvent(0, playerName, 0);
      });

      // Comienza a reproducir la música de fondo
      backgroundMusic.play();
  }

  // Lista de eventos. No borres!!
  const events = [
      { id: 1, text: 'Mientras exploras tu nueva escuela, un grupo de estudiantes populares te invita a fumar cigarrillos detrás del gimnasio. Te sientes tentado a unirte a ellos para encajar, pero sabes que fumar es perjudicial para tu salud.', goodOption: 'Rechazas educadamente la invitación y te enfocas en hacer amigos de una manera más saludable.', badOption: 'Aceptas la invitación para fumar y te unes al grupo detrás del gimnasio.' },
      { id: 2, text: 'Has estado entrenando duro para las pruebas del equipo de baloncesto. Algunos compañeros te sugieren tomar suplementos dudosos para mejorar tu rendimiento, prometiendo resultados rápidos. Sin embargo, no estás seguro de la seguridad de estos suplementos.', goodOption: 'Optas por seguir entrenando arduamente, cuidar tu alimentación y dar lo mejor de ti en las pruebas sin pastillas.', badOption: 'Decides tomar los suplementos dudosos para mejorar tu rendimiento en las pruebas.' },
      { id: 3, text: 'Tu profesor de ciencias asigna un proyecto grupal y te encuentras trabajando con estudiantes poco motivados. El proyecto es complejo y requerirá mucho tiempo y esfuerzo. Tus compañeros sugieren que asumas la mayor parte del trabajo para asegurar una buena calificación.', goodOption: 'Insistes en dividir las tareas de manera equitativa, priorizando tu bienestar y el trabajo en equipo.', badOption: 'Asumes la mayor parte del trabajo para asegurar una buena calificación, sacrificando horas de sueño.' },
      { id: 4, text: 'Eres invitado a la fiesta de bienvenida más grande del año. Al llegar, te das cuenta de que hay alcohol disponible y muchos estudiantes están bebiendo. Algunos compañeros te animan a beber para integrarte y divertirte.', goodOption: 'Optas por divertirte sin alcohol, disfrutando de la fiesta de manera responsable y cuidando tu salud.', badOption: 'Te unes a los estudiantes que están bebiendo alcohol para no sentirte excluido.' },
      { id: 5, text: 'En una fiesta, un amigo cercano te ofrece probar marihuana, asegurándote que te ayudará a relajarte y pasarla bien. Nunca has consumido drogas antes y no estás seguro de cómo reaccionará tu cuerpo.', goodOption: 'Rechazas la oferta y te mantienes alejado de las drogas, priorizando tu salud y tomando decisiones responsables.', badOption: 'Cedes a la presión y pruebas la marihuana, arriesgándote a posibles consecuencias para tu salud y bienestar.' },
      { id: 6, text: 'Estás tomando clases de educación vial para obtener tu licencia de conducir. Después de una noche de fiesta, tu mejor amigo te pide que lo lleves a casa, a pesar de que has bebido. Sabes que conducir bajo los efectos del alcohol es extremadamente peligroso.', goodOption: 'Te niegas a conducir después de haber bebido y buscas una alternativa segura, como llamar a un taxi o a un adulto responsable.', badOption: 'Aceptas el riesgo de conducir bajo los efectos del alcohol para llevar a tu amigo a casa.' },
      { id: 7, text: 'Los exámenes finales se acercan y la presión académica es alta. Algunos compañeros te sugieren probar pastillas estimulantes para estudiar más tiempo sin dormir. Sabes que el abuso de estas sustancias puede tener efectos negativos en tu salud.', goodOption: 'Optas por crear un plan de estudio equilibrado, priorizar tu descanso y buscar el apoyo de tutores o profesores si lo necesitas.', badOption: 'Decides tomar las pastillas estimulantes para estudiar más tiempo sin dormir.' },
      { id: 8, text: 'Has comenzado a salir con alguien especial y la relación se está volviendo más física. Tu pareja sugiere tener relaciones sexuales sin protección, argumentando que se siente más placentero. Sabes que el sexo sin protección conlleva riesgos como embarazos no deseados y enfermedades de transmisión sexual.', goodOption: 'Insistes en usar métodos anticonceptivos para proteger tu salud y evitar embarazos no deseados.', badOption: 'Aceptas tener relaciones sexuales sin protección para complacer a tu pareja.' },
      { id: 9, text: 'Durante un partido crucial de baloncesto, sufres una lesión en el tobillo. El entrenador te presiona para que sigas jugando, sugiriendo que el equipo te necesita. Sin embargo, sientes un dolor intenso y sabes que continuar jugando podría agravar la lesión.', goodOption: 'Decides retirarte del juego y buscar atención médica adecuada para tu lesión en el tobillo.', badOption: 'Ignoras el dolor y continúas jugando, arriesgándote a una lesión más grave.' },
      { id: 10, text: 'Un cazatalentos te aborda en un centro comercial y te ofrece la oportunidad de convertirte en modelo. Sin embargo, sugiere que debes perder peso drásticamente para tener éxito. Sabes que las dietas extremas pueden ser perjudiciales para tu salud física y mental.', goodOption: 'Rechazas la oferta y te mantienes fiel a tus valores de autocuidado, priorizando tu salud sobre la oportunidad de modelaje.', badOption: 'Sigues una dieta extrema y arriesgas tu salud para cumplir con los estándares sugeridos por el cazatalentos.' },
      { id: 11, text: 'Tu escuela organiza un día de voluntariado en un comedor comunitario local. Algunos amigos te invitan a saltarte el evento para ir a una fiesta. Sabes que el voluntariado es una oportunidad para retribuir a la comunidad y marcar una diferencia positiva.', goodOption: 'Te comprometes a servir a tu comunidad y participas en el día de voluntariado en el comedor comunitario.', badOption: 'Decides saltarte el evento de voluntariado para ir a la fiesta con tus amigos.' },
      { id: 12, text: 'Decides participar en el concurso de talentos de la escuela, pero sufres un ataque de pánico escénico durante los ensayos. Te sientes avergonzado y consideras retirarte del concurso. Sin embargo, sabes que enfrentar tus miedos podría ayudarte a crecer y ganar confianza.', goodOption: 'Consultas al psicólogo y decides enfrentar tus miedos participando en el concurso.', badOption: 'Te retiras del concurso para evitar la vergüenza y el ataque de pánico escénico.' },
      { id: 13, text: 'Estás trabajando en tus aplicaciones universitarias y te sientes abrumado por la presión de ser aceptado en una universidad prestigiosa. Algunos compañeros sugieren exagerar tus logros y actividades extracurriculares para impresionar a los comités de admisión. Sabes que la honestidad es importante y que quieres que te acepten por quien realmente eres.', goodOption: 'Optas por ser honesto en tus aplicaciones y presentas una imagen auténtica de ti mismo.', badOption: 'Exageras tus logros y actividades extracurriculares para impresionar a los comités de admisión.' },
      { id: 14, text: 'Tu relación amorosa se ha vuelto tóxica y controladora, afectando negativamente tu salud mental. Tu pareja te hace sentir culpable por pasar tiempo con amigos y familiares, y constantemente cuestiona tus decisiones. Sabes que mereces una relación saludable y respetuosa.', goodOption: 'Tomas la valiente decisión de terminar la relación y priorizar tu bienestar emocional.', badOption: 'Decides quedarte en la relación tóxica, esperando que las cosas mejoren.' },
      { id: 15, text: 'Necesitas ganar dinero extra para tus gastos y te ofrecen un trabajo a tiempo parcial en un restaurante de comida rápida. El gerente te presiona para que trabajes horas extras, a costa de tus estudios y tu salud. Sabes que mantener un equilibrio entre el trabajo y la escuela es crucial para tu éxito y bienestar.', goodOption: 'Estableces límites saludables con tu gerente y te enfocas en mantener un equilibrio entre tu trabajo, estudios y bienestar personal.', badOption: 'Aceptas trabajar horas extras en el restaurante de comida rápida, sacrificando tus estudios y tu salud.' },
      { id: 16, text: 'A medida que se acerca la graduación, debes tomar decisiones importantes sobre tu futuro. Tus padres te presionan para que sigas una carrera prestigiosa, pero tu pasión lies en un campo menos convencional. Sabes que seguir tus sueños y hacer lo que te apasiona es clave para tu felicidad a largo plazo.', goodOption: 'Te mantienes fiel a ti mismo y decides perseguir una carrera que te apasiona, priorizando tu felicidad a largo plazo.', badOption: 'Cedes a las expectativas de tus padres y eliges una carrera prestigiosa, sacrificando tus sueños.' }
  ];

  function startEvent(eventIndex, playerName, healthScore) {
      if (eventIndex >= events.length) {
          endGame(healthScore);
          return;
      }

      const event = events[eventIndex];
      const gameScreen = document.getElementById('game-screen');

      if (gameScreen.firstChild) {
          gameScreen.firstChild.classList.add('fade-out');
          setTimeout(() => {
              gameScreen.removeChild(gameScreen.firstChild);
              showEvent(event, eventIndex, playerName, healthScore);
          }, 500);
      } else {
          showEvent(event, eventIndex, playerName, healthScore);
      }
  }

  function showEvent(event, eventIndex, playerName, healthScore) {
      const gameScreen = document.getElementById('game-screen');
      gameScreen.innerHTML = '';

      const eventBox = document.createElement('div');
      eventBox.className = 'text-box fade-in';
      const eventText = document.createElement('div');
      eventText.className = 'event-text';
      eventText.textContent = event.text;
      eventBox.appendChild(eventText);
      gameScreen.appendChild(eventBox);

      const optionsContainer = document.createElement('div');
      optionsContainer.className = 'options-container';

      const goodButton = document.createElement('button');
      goodButton.className = 'event-button';
      goodButton.textContent = event.goodOption;
      goodButton.addEventListener('click', function() {
          startEvent(eventIndex + 1, playerName, healthScore + 1);
      });

      const badButton = document.createElement('button');
      badButton.className = 'event-button';
      badButton.textContent = event.badOption;
      badButton.addEventListener('click', function() {
          startEvent(eventIndex + 1, playerName, healthScore);
      });

      optionsContainer.appendChild(goodButton);
      optionsContainer.appendChild(badButton);
      gameScreen.appendChild(optionsContainer);
  }

  function endGame(healthScore) {
    const gameScreen = document.getElementById('game-screen');
    gameScreen.innerHTML = '';

    const endingBox = document.createElement('div');
    endingBox.className = 'text-box fade-in';

    const endingImage = document.createElement('img'); // Crear un elemento img
    endingImage.className = 'ending-image'; // Clase para la imagen (añade estilos en CSS si es necesario)

    let endingText;
    if (healthScore > 8) {
        endingText = 'Final sano y fuerte: Después de tomar decisiones saludables durante su adolescencia, como mantener una dieta equilibrada, hacer ejercicio regularmente y evitar el consumo de sustancias nocivas, se siente enérgico y lleno de vitalidad en su vida adulta. Su cuerpo y mente están en armonía, permitiéndole enfrentar los desafíos diarios con claridad y resistencia. Se siente agradecido por las elecciones que hizo en su juventud, ya que ahora disfruta de una salud física y mental óptima, lo que le permite perseguir sus metas y disfrutar plenamente de la vida.';
        endingImage.src = 'assets/feliz.png'; // Ruta a la imagen del final saludable
    } else if (healthScore >= 5) {
        endingText = 'Final normal: A pesar de no haber tomado decisiones particularmente perjudiciales durante su adolescencia, tampoco se esforzó por adoptar hábitos excepcionalmente saludables. En su vida adulta, se encuentra con una salud promedio, enfrentando ocasionalmente problemas menores como resfriados o dolores de espalda. Si bien no se siente limitado por su salud, a veces se pregunta si podría haber hecho más en su juventud para sentirse aún mejor en su edad adulta. No obstante, se siente satisfecho con su calidad de vida general.';
        endingImage.src = 'assets/normal.png'; // Ruta a la imagen del final normal
    } else {
        endingText = 'Final no saludable: Las decisiones poco saludables que tomó durante su adolescencia, como fumar, beber en exceso y llevar una vida sedentaria, han pasado factura en su vida adulta. Se siente fatigado con frecuencia, sufre de problemas respiratorios y tiene dificultades para realizar actividades físicas sin sentirse exhausto. Además, su salud mental se ha visto afectada, lidiando con episodios de ansiedad y depresión. Lamenta profundamente no haber cuidado mejor de sí mismo en su juventud y ahora se esfuerza por revertir los daños causados, aunque el camino es difícil y los progresos son lentos.';
        endingImage.src = 'assets/triste.png'; // Ruta a la imagen del final no saludable
    }

    const endingMessage = document.createElement('div');
    endingMessage.className = 'ending-message';
    endingMessage.textContent = endingText;

    endingBox.appendChild(endingImage);
    endingBox.appendChild(endingMessage);
    gameScreen.appendChild(endingBox);

    const restartButton = document.createElement('button');
    restartButton.className = 'event-button';
    restartButton.textContent = 'Rehacer';
    restartButton.addEventListener('click', function() {
        restartGame();
    });

    gameScreen.appendChild(restartButton);
  }

  function restartGame() {
      document.getElementById('game-screen').classList.add('d-none');
      document.getElementById('start-screen').classList.remove('d-none');
      // Detén la música de fondo
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
  }
});
