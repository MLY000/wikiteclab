// Variables globales para text-to-speech
let isListening = false;
let speechSynthesis = window.speechSynthesis;
let utterance;

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Configurar event listeners para los botones
    document.getElementById('listen-btn').addEventListener('click', toggleListen);
    document.getElementById('pause-btn').addEventListener('click', pauseSpeech);
    document.getElementById('resume-btn').addEventListener('click', resumeSpeech);
    document.getElementById('volver-btn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Llamar a la función del clima cuando la página cargue
    getWeather();
});

// Text-to-speech mejorado
function toggleListen() {
    const btn = document.getElementById("listen-btn");
    
    if (!isListening) {
        // Detener cualquier reproducción previa
        speechSynthesis.cancel();
        
        // Obtener todo el texto de la página
        const mainContent = document.querySelector('.container');
        const text = mainContent.innerText.replace(/\s+/g, ' ').trim();
        
        // Crear nueva utterance
        utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-AR';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        // Evento cuando termina la reproducción
        utterance.onend = () => {
            isListening = false;
            btn.innerHTML = '<i class="fas fa-volume-up"></i> Escuchar Texto';
        };
        
        // Evento si hay error
        utterance.onerror = (event) => {
            console.error('Error en speechSynthesis:', event);
            isListening = false;
            btn.innerHTML = '<i class="fas fa-volume-up"></i> Escuchar Texto';
            alert('Error al intentar leer el texto. Por favor intente nuevamente.');
        };
        
        // Iniciar reproducción
        speechSynthesis.speak(utterance);
        isListening = true;
        btn.innerHTML = '<i class="fas fa-stop"></i> Detener';
    } else {
        speechSynthesis.cancel();
        isListening = false;
        btn.innerHTML = '<i class="fas fa-volume-up"></i> Escuchar Texto';
    }
}

function pauseSpeech() {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.pause();
    }
}

function resumeSpeech() {
    if (speechSynthesis.paused) {
        speechSynthesis.resume();
    }
}

// Función para obtener datos del clima (simulada)
function getWeather() {
    // En una implementación real, aquí se haría una llamada a una API de clima
    // Por ahora es una simulación
    console.log("Obteniendo datos del clima...");
    
    // Si hay elementos para mostrar el clima, actualizarlos
    const weatherIcon = document.getElementById('weather-icon-aguadacecilio');
    const temperature = document.querySelector('#weather-icon-aguadacecilio + div > div');
    const humidity = document.getElementById('humidity-aguadacecilio');
    const wind = document.getElementById('wind-aguadacecilio');
    
    if (weatherIcon) {
        weatherIcon.src = 'https://openweathermap.org/img/wn/01d@2x.png';
    }
    if (temperature) {
        temperature.textContent = '22°C';
    }
    if (humidity) {
        humidity.textContent = '35%';
    }
    if (wind) {
        wind.textContent = '18 km/h';
    }
}

// Modo oscuro/claro (si existe el botón)
function toggleModo() {
    document.body.classList.toggle("dark-mode");
    const btn = document.querySelector('.modo-btn');
    if (btn) {
        if (document.body.classList.contains("dark-mode")) {
            btn.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
        } else {
            btn.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
        }
    }
}