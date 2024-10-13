        document.addEventListener('keydown', function(event) {
            // Iniciar lectura con la tecla 'f'
            if (event.key === 'f') {
                startReading();
            }
            // Pausar/reanudar lectura con la tecla 'j'
            if (event.key === 'j') {
                pauseResumeReading();
            }
        });

        function startReading() {
            const utterance = new SpeechSynthesisUtterance();
            const text = document.body.innerText; // Leer todo el texto de la página
            utterance.text = text;
            window.speechSynthesis.speak(utterance);
        }

        function pauseResumeReading() {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.pause();
            } else {
                window.speechSynthesis.resume();
            }
        }

        function changePageColor() {
            const colors = ["#ffcccc", "#ccffcc", "#ccccff"]; // Colores para el cambio
            document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        }
