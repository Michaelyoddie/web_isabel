
document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;

  /* ========================
     Menú Fullscreen
  ======================== */
  const menu = document.getElementById('fullscreenMenu');
  const openMenuBtn = document.getElementById('menuToggleOpen');
  const closeMenuBtn = document.getElementById('menuToggleClose');

  function toggleMenu() {
    if (!menu) return;
    const isShown = menu.classList.toggle('show');
    body.classList.toggle('no-scroll', isShown);
  }

  openMenuBtn?.addEventListener('click', toggleMenu);
  closeMenuBtn?.addEventListener('click', toggleMenu);
  menu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (menu.classList.contains('show')) toggleMenu();
    });
  });

  /* ========================
     Swiper (carrusel principal)
     Requiere: <script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js">
  ======================== */
  if (window.Swiper) {
    new Swiper(".principalSwiper", {
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      grabCursor: true
    });
  }

  /* ========================
     Header auto-hide
  ======================== */
  let lastScroll = 0;
  const header = document.querySelector("header");
  const hoverZone = document.querySelector(".header-hover-zone");

  if (header && hoverZone) {
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add("header-hidden");
      } else {
        header.classList.remove("header-hidden");
      }
      lastScroll = currentScroll;
    });
    hoverZone.addEventListener("mouseenter", () => header.classList.remove("header-hidden"));
  }

  /* ========================
     Reveal on Scroll (imágenes .reveal)
  ======================== */
  (function initRevealOnScroll(){
    const opts = { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // Asegura que el estado inicial (transform/opacity) esté pintado
        el.getBoundingClientRect();
        requestAnimationFrame(() => {
          el.classList.add("is-visible");
        });
        io.unobserve(el);
      });
    }, opts);

    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.remove("is-visible");
      io.observe(el);
    });
  })();

  /* ========================
     Año actual en el footer
  ======================== */
  const anio = document.getElementById('anioActual');
  if (anio) anio.textContent = new Date().getFullYear();
});
