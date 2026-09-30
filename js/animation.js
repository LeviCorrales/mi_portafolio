const heroWave = document.querySelector(".hero-wave");

const WAVE_INTERVAL = 6000; // 15 segundos entre cada inicio de onda

function playHeroWave() {
  heroWave.classList.remove("wave-active");
  void heroWave.offsetWidth; // Forzar reinicio del DOM
  heroWave.classList.add("wave-active");
}

// Ejecutar la primera vez inmediatamente
playHeroWave();

// Repetir cada 15 segundos
setInterval(playHeroWave, WAVE_INTERVAL);
