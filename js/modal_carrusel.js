/* =========================================
   PROJECT CAROUSELS
========================================= */

const carousels = document.querySelectorAll(".project-carousel");

/* =========================================
   GLOBAL MODAL
========================================= */

const projectModal = document.querySelector(".project-modal");
const modalBackdrop = document.querySelector(".project-modal-backdrop");
const modalContent = document.querySelector(".project-modal-content");

const modalTrack = document.querySelector(".project-modal-track");
const modalDotsContainer = document.querySelector(".project-modal-dots");

const modalClose = document.querySelector(".project-modal-close");
const modalPrev = document.querySelector(".project-modal-prev");
const modalNext = document.querySelector(".project-modal-next");

let activeCarousel = null;
let modalIndex = 0;

/* =========================================
   MODAL FUNCTIONS
========================================= */

function openProjectModal(carousel, index) {
  activeCarousel = carousel;
  modalIndex = index;

  const slides = carousel.querySelectorAll(".project-slide");

  if (!slides.length) return;

  /* Limpiar contenido anterior */
  modalTrack.innerHTML = "";
  modalDotsContainer.innerHTML = "";

  /* =====================================
       CREAR SLIDES DEL MODAL
    ===================================== */

  slides.forEach((slide, index) => {
    const image = slide.querySelector("img");

    if (!image) return;

    const modalSlide = document.createElement("div");

    modalSlide.classList.add("project-modal-slide");

    const modalImage = document.createElement("img");

    modalImage.src = image.src;
    modalImage.alt = image.alt;

    modalSlide.appendChild(modalImage);

    modalTrack.appendChild(modalSlide);

    /* =================================
           CREAR DOT
        ================================= */

    const dot = document.createElement("button");

    dot.classList.add("project-modal-dot");

    dot.type = "button";

    dot.setAttribute("aria-label", `Go to image ${index + 1}`);

    dot.addEventListener("click", () => {
      modalIndex = index;

      updateModal();
    });

    modalDotsContainer.appendChild(dot);
  });

  /* =====================================
       MOSTRAR MODAL
    ===================================== */

  projectModal.classList.add("active");

  projectModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  /* Actualizar */
  updateModal();

  /* =====================================
       ENFOCAR BOTÓN CERRAR
    ===================================== */

  setTimeout(() => {
    modalClose.focus();
  }, 50);
}

/* =========================================
   UPDATE MODAL
========================================= */

function updateModal() {
  const slides = modalTrack.querySelectorAll(".project-modal-slide");

  const dots = modalDotsContainer.querySelectorAll(".project-modal-dot");

  if (!slides.length) return;

  /* Mover track */

  modalTrack.style.transform = `translateX(-${modalIndex * 100}%)`;

  /* Actualizar indicadores */

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === modalIndex);
  });
}

/* =========================================
   MODAL NEXT
========================================= */

function modalNextSlide() {
  const slides = modalTrack.querySelectorAll(".project-modal-slide");

  if (!slides.length) return;

  modalIndex++;

  if (modalIndex >= slides.length) {
    modalIndex = 0;
  }

  updateModal();
}

/* =========================================
   MODAL PREVIOUS
========================================= */

function modalPreviousSlide() {
  const slides = modalTrack.querySelectorAll(".project-modal-slide");

  if (!slides.length) return;

  modalIndex--;

  if (modalIndex < 0) {
    modalIndex = slides.length - 1;
  }

  updateModal();
}

/* =========================================
   CLOSE MODAL
========================================= */

function closeProjectModal() {
  projectModal.classList.remove("active");

  projectModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");

  activeCarousel = null;
}

/* =========================================
   MODAL EVENTS
========================================= */

modalClose.addEventListener("click", closeProjectModal);

modalBackdrop.addEventListener("click", closeProjectModal);

modalNext.addEventListener("click", modalNextSlide);

modalPrev.addEventListener("click", modalPreviousSlide);

/* =========================================
   KEYBOARD
========================================= */

document.addEventListener("keydown", (event) => {
  if (!projectModal.classList.contains("active")) {
    return;
  }

  switch (event.key) {
    case "Escape":
      closeProjectModal();

      break;

    case "ArrowRight":
      modalNextSlide();

      break;

    case "ArrowLeft":
      modalPreviousSlide();

      break;
  }
});

/* =========================================
   PROJECT CAROUSELS
========================================= */

carousels.forEach((carousel) => {
  const track = carousel.querySelector(".project-track");

  const slides = carousel.querySelectorAll(".project-slide");

  const prevBtn = carousel.querySelector(".carousel-prev");

  const nextBtn = carousel.querySelector(".carousel-next");

  const expandBtn = carousel.querySelector(".carousel-expand");

  const dotsContainer = carousel.querySelector(".carousel-dots");

  const totalSlides = slides.length;

  let currentIndex = 0;

  let autoplay;

  let isPaused = false;

  /* =====================================
       CREAR INDICADORES
    ===================================== */

  slides.forEach((_, index) => {
    const dot = document.createElement("button");

    dot.classList.add("carousel-dot");

    dot.type = "button";

    dot.setAttribute("aria-label", `Go to image ${index + 1}`);

    dot.addEventListener("click", () => {
      goToSlide(index);

      restartAutoplay();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".carousel-dot");

  /* =====================================
       UPDATE
    ===================================== */

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  /* =====================================
       GO TO
    ===================================== */

  function goToSlide(index) {
    currentIndex = index;

    updateCarousel();
  }

  /* =====================================
       NEXT
    ===================================== */

  function nextSlide() {
    currentIndex++;

    if (currentIndex >= totalSlides) {
      currentIndex = 0;
    }

    updateCarousel();
  }

  /* =====================================
       PREVIOUS
    ===================================== */

  function previousSlide() {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = totalSlides - 1;
    }

    updateCarousel();
  }

  /* =====================================
       AUTOPLAY
    ===================================== */

  function startAutoplay() {
    clearInterval(autoplay);

    autoplay = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 4500);
  }

  function restartAutoplay() {
    clearInterval(autoplay);

    startAutoplay();
  }

  /* =====================================
       NEXT BUTTON
    ===================================== */

  nextBtn.addEventListener("click", () => {
    nextSlide();

    restartAutoplay();
  });

  /* =====================================
       PREVIOUS BUTTON
    ===================================== */

  prevBtn.addEventListener("click", () => {
    previousSlide();

    restartAutoplay();
  });

  /* =====================================
       EXPAND BUTTON
    ===================================== */

  expandBtn.addEventListener("click", () => {
    /*
     * Abrimos el modal exactamente
     * en la imagen actual.
     */

    openProjectModal(carousel, currentIndex);

    /*
     * Detenemos el autoplay mientras
     * el usuario está viendo el modal.
     */

    isPaused = true;
  });

  /* =====================================
       MOUSE PAUSE
    ===================================== */

  carousel.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  carousel.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  /* =====================================
       INITIALIZE
    ===================================== */

  updateCarousel();

  startAutoplay();
});
