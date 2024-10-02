// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startReading") {
      // Detener cualquier lectura previa
      chrome.tts.stop();
      
      // Iniciar la lectura del texto
      chrome.tts.speak(message.text, {
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        lang: "es-ES",
        onEvent: (event) => {
          if (event.type === "end" || event.type === "error") {
            sendResponse({ status: "done" });
          }
        }
      });
      // Mantener el canal abierto para sendResponse
      return true;
    } else if (message.action === "stopReading") {
      chrome.tts.stop();
    }
  });
  