document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");

          // Deja de observar después de aparecer
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  elements.forEach((element) => {
    observer.observe(element);
  });

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
});
