document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const indicator = document.querySelector(".menu-indicator");
  const links = [...document.querySelectorAll(".menu a")];

  const sections = links.map((link) => {
    return document.querySelector(link.getAttribute("href"));
  });

  function updateIndicator() {
    const scrollY = window.scrollY;

    /*
     * Encontramos entre qué dos secciones estamos.
     */
    let currentIndex = 0;

    for (let i = 0; i < sections.length; i++) {
      if (scrollY >= sections[i].offsetTop) {
        currentIndex = i;
      }
    }

    /*
     * Si estamos en la última sección,
     * mantenemos el indicador sobre el último botón.
     */
    if (currentIndex >= sections.length - 1) {
      moveIndicatorToLink(links[links.length - 1]);

      updateActiveText();

      return;
    }

    /*
     * Posiciones de las dos secciones.
     */
    const currentSection = sections[currentIndex];
    const nextSection = sections[currentIndex + 1];

    const currentTop = currentSection.offsetTop;
    const nextTop = nextSection.offsetTop;

    /*
     * Calculamos cuánto hemos avanzado
     * entre ambas secciones.
     */
    const progress = (scrollY - currentTop) / (nextTop - currentTop);

    /*
     * Limitamos el valor entre 0 y 1.
     */
    const t = Math.max(0, Math.min(1, progress));

    /*
     * Posición de los botones.
     */
    const currentLink = links[currentIndex];
    const nextLink = links[currentIndex + 1];

    const currentRect = currentLink.getBoundingClientRect();
    const nextRect = nextLink.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();

    const currentLeft = currentRect.left - menuRect.left;

    const nextLeft = nextRect.left - menuRect.left;

    /*
     * Interpolamos entre los dos botones.
     */
    const left = currentLeft + (nextLeft - currentLeft) * t;

    /*
     * También hacemos que el ancho
     * cambie progresivamente.
     */
    const width = currentRect.width + (nextRect.width - currentRect.width) * t;

    indicator.style.left = `${left}px`;
    indicator.style.width = `${width}px`;

    /*
     * Actualizamos el texto que está
     * debajo del indicador.
     */
    updateActiveText();
  }

  /*
   * Detecta qué botón está debajo
   * del indicador.
   */
  function updateActiveText() {
    const indicatorRect = indicator.getBoundingClientRect();

    const indicatorCenter = indicatorRect.left + indicatorRect.width / 2;

    links.forEach((link) => {
      const linkRect = link.getBoundingClientRect();

      const linkLeft = linkRect.left;
      const linkRight = linkRect.right;

      /*
       * Si el centro del indicador está
       * dentro del botón, lo activamos.
       */
      const isActive =
        indicatorCenter >= linkLeft && indicatorCenter <= linkRight;

      link.classList.toggle("active", isActive);
    });
  }

  /*
   * Mueve el indicador directamente
   * hacia un enlace.
   */
  function moveIndicatorToLink(link) {
    const menuRect = menu.getBoundingClientRect();

    const linkRect = link.getBoundingClientRect();

    indicator.style.left = `${linkRect.left - menuRect.left}px`;

    indicator.style.width = `${linkRect.width}px`;
  }

  /*
   * Actualizamos mientras hacemos scroll.
   */
  window.addEventListener("scroll", updateIndicator, {
    passive: true,
  });

  /*
   * También cuando cambia el tamaño.
   */
  window.addEventListener("resize", updateIndicator);

  /*
   * Posición inicial.
   */
  updateIndicator();

  // --- LÓGICA DEL IDIOMA ---
  const langBtns = document.querySelectorAll(".lang-btn");

  langBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Quitar clase activa al botón actual
      document.querySelector(".lang-btn.active").classList.remove("active");
      // Poner clase activa al botón clickeado
      btn.classList.add("active");

      // Aquí puedes agregar tu lógica para traducir el portafolio
      // const idiomaSeleccionado = btn.getAttribute('data-lang');
      // cambiarIdioma(idiomaSeleccionado);
    });
  });

  const themeBtn = document.querySelector(".theme-btn");
  const themeIcon = document.querySelector(".theme-icon");

  // Revisar si hay un tema guardado al cargar la página
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  themeBtn.addEventListener("click", () => {
    // 1. Iniciamos la animación de salida (el icono gira y desaparece)
    themeIcon.classList.add("switching");

    // 2. Esperamos 150ms (la mitad de la transición de 0.3s)
    setTimeout(() => {
      // Cambiamos el tema global de la página
      document.body.classList.toggle("light-theme");
      const isLight = document.body.classList.contains("light-theme");

      // Intercambiamos los iconos
      if (isLight) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "light");
      } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "dark");
      }

      // 3. Quitamos la clase 'switching'.
      // El nuevo icono aparecerá girando a su tamaño y opacidad normal.
      themeIcon.classList.remove("switching");
    }, 150);
  });
});
