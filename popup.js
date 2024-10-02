document.getElementById('start-tts').addEventListener('click', () => {
    chrome.tabs.executeScript({
      code: 'chrome.tts.speak(window.getSelection().toString() || document.body.innerText);'
    });
  });
  
  document.getElementById('stop-tts').addEventListener('click', () => {
    chrome.tts.stop();
  });

  document.getElementById('transcribe-audio').addEventListener('click', () => {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.start();
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      alert("Texto transcrito: " + transcript);
    };
  });
  
  document.getElementById('start-tts').addEventListener('click', () => {
    // Obtener la pestaña activa
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab) {
        // Inyectar script para obtener el texto seleccionado o el cuerpo del documento
        chrome.scripting.executeScript(
          {
            target: { tabId: activeTab.id },
            func: getTextToRead
          },
          (injectionResults) => {
            for (const frameResult of injectionResults) {
              const text = frameResult.result;
              // Enviar el texto al background script para leerlo
              chrome.runtime.sendMessage({ action: "startReading", text: text });
            }
          }
        );
      }
    });
  });
  
  document.getElementById('stop-tts').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "stopReading" });
  });
  
  // Función que se ejecuta en la pestaña para obtener el texto
  function getTextToRead() {
    return window.getSelection().toString() || document.body.innerText;
  }
  