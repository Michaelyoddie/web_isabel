document.addEventListener("DOMContentLoaded", () => {
  /**
   * Función REUTILIZABLE para configurar CUALQUIER carrusel de tipo "finito".
   *
   * @param {string} trackId - El ID del contenedor que se desplaza (el track).
   * @param {string} prevBtnId - El ID del botón "anterior".
   * @param {string} nextBtnId - El ID del botón "siguiente".
   * @param {number} [autoplayDelay=0] - El retraso en ms para el autoplay. 0 para deshabilitar.
   */
  function setupFiniteCarousel(trackId, prevBtnId, nextBtnId, autoplayDelay = 0) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    // --- NUEVO: Variable para guardar el intervalo del autoplay ---
    let autoplayInterval = null;

    if (!track || !prevBtn || !nextBtn) {
      console.warn(`Elementos no encontrados para el carrusel: ${trackId}`);
      return;
    }

    const getScrollStep = () => {
      const firstCard = track.querySelector("article, .snap-start");
      if (!firstCard) return track.clientWidth;
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.gap) || 0;
      return firstCard.offsetWidth + gap;
    };

    const updateButtonVisibility = () => {
      const scrollLeft = track.scrollLeft;
      const scrollWidth = track.scrollWidth;
      const clientWidth = track.clientWidth;
      const tolerance = 2;
      const atStart = scrollLeft <= 0;
      const atEnd = Math.round(scrollLeft + clientWidth) >= scrollWidth - tolerance;
      prevBtn.classList.toggle("hidden", atStart);
      nextBtn.classList.toggle("hidden", atEnd);
    };

    // --- NUEVO: Funciones para controlar el Autoplay ---
    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    };

    const startAutoplay = () => {
      if (autoplayDelay <= 0) return; // No empezar si no está configurado
      stopAutoplay(); // Limpiar cualquier intervalo anterior
      
      autoplayInterval = setInterval(() => {
        const { scrollLeft, scrollWidth, clientWidth } = track;
        const tolerance = 2;
        const atEnd = Math.round(scrollLeft + clientWidth) >= scrollWidth - tolerance;

        if (atEnd) {
          // Si está al final, vuelve al principio
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Si no, avanza al siguiente
          track.scrollBy({ left: getScrollStep(), behavior: "smooth" });
        }
      }, autoplayDelay);
    };

    // Resetea el timer (ej. después de un clic manual)
    const resetAutoplay = () => {
        stopAutoplay();
        startAutoplay();
    };

    // --- Event Listeners MODIFICADOS ---

    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: getScrollStep(), behavior: "smooth" });
      // NUEVO: Resetear el timer si hay autoplay
      if (autoplayDelay > 0) resetAutoplay();
    });

    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
      // NUEVO: Resetear el timer si hay autoplay
      if (autoplayDelay > 0) resetAutoplay();
    });

    track.addEventListener("scroll", updateButtonVisibility);
    window.addEventListener("resize", updateButtonVisibility);
    updateButtonVisibility();

    // --- NUEVO: Iniciar y pausar el Autoplay ---
    if (autoplayDelay > 0) {
      startAutoplay(); // Empezar el autoplay
      // Pausar al pasar el mouse por encima
      track.addEventListener("mouseenter", stopAutoplay);
      // Reanudar al quitar el mouse
      track.addEventListener("mouseleave", startAutoplay);
    }
  }

  // --- Inicializar TODOS los carruseles ---

  // 1. Ofertas (Sin autoplay)
  setupFiniteCarousel("carouselTrack", "prevBtn", "nextBtn");
  
  // 2. Experiencias (Sin autoplay)
  setupFiniteCarousel("experiencesTrack", "expPrevBtn", "expNextBtn");
  
  // 3. Lugares para visitar (Sin autoplay)
  setupFiniteCarousel("placesTrack", "placesPrevBtn", "placesNextBtn");
  
  // 4. Empresas de guiado (¡CON AUTOPLAY!)
  // Le pasamos '3000' (3 segundos) como cuarto parámetro
  setupFiniteCarousel("guideTrack", "guidePrevBtn", "guideNextBtn", 2000);
  
  // 5. Gastronomía (Sin autoplay)
  setupFiniteCarousel("gastroTrack", "gastroPrevBtn", "gastroNextBtn");
  
  // 6. Beneficios (Sin autoplay)
  setupFiniteCarousel("benefitTrack", "benefitPrevBtn", "benefitNextBtn");

  // 7. Eventos
  setupFiniteCarousel("eventTrack", "eventPrevBtn", "eventNextBtn");
});