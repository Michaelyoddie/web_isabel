// proyectos_individuales.js
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* ========================
     Menú Fullscreen
  ======================== */
  const menu = document.getElementById("fullscreenMenu");
  const openMenuBtn = document.getElementById("menuToggleOpen");
  const closeMenuBtn = document.getElementById("menuToggleClose");

  function toggleMenu() {
    if (!menu) return;
    const isShown = menu.classList.toggle("show");
    body.classList.toggle("no-scroll", isShown);
  }

  openMenuBtn?.addEventListener("click", toggleMenu);
  closeMenuBtn?.addEventListener("click", toggleMenu);

  // Cerrar menú al hacer clic en un link
  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("show")) toggleMenu();
    });
  });

  /* ========================
     Header auto-hide
  ======================== */
  const header = document.querySelector("header");
  const hoverZone = document.querySelector(".header-hover-zone");
  let lastScroll = 0;

  if (header) {
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add("header-hidden"); // al bajar, ocultar
      } else {
        header.classList.remove("header-hidden"); // al subir, mostrar
      }
      lastScroll = currentScroll;
    });

    // Recuperar header al pasar el mouse por la franja superior (si existe)
    hoverZone?.addEventListener("mouseenter", () =>
      header.classList.remove("header-hidden")
    );
  }

  /* ========================
     Año actual en el footer
  ======================== */
  const anio = document.getElementById("anioActual");
  if (anio) anio.textContent = new Date().getFullYear();

  /* ========================
     Carrusel 3D
  ======================== */
  (function initCarousel3D(){
    const container = document.getElementById("carousel3D");
    if (!container) return;

    const items = Array.from(container.querySelectorAll(".carousel-3d-item"));
    const prevBtn = document.getElementById("carousel3DPrevBtn");
    const nextBtn = document.getElementById("carousel3DNextBtn");
    if (!items.length || !prevBtn || !nextBtn) return;

    let center = 0; // índice del elemento al frente

    function setPositions() {
      items.forEach(it => it.classList.remove("front","left","right","back"));
      const n = items.length;
      const left  = (center - 1 + n) % n;
      const right = (center + 1) % n;
      items[center].classList.add("front");
      items[left].classList.add("left");
      items[right].classList.add("right");
      items.forEach((it, i) => {
        if (i !== center && i !== left && i !== right) it.classList.add("back");
      });
    }

    function next(){ center = (center + 1) % items.length; setPositions(); }
    function prev(){ center = (center - 1 + items.length) % items.length; setPositions(); }

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);

    // Navegación con teclado
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    });

    // Inicializar
    setPositions();
  })();
});
