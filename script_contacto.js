document.addEventListener("DOMContentLoaded", function () {
    // ====== MENÚ FULLSCREEN ======
    const menu = document.querySelector('.fullscreen-menu');
    const body = document.body;
    const menuOpenBtn = document.getElementById('menuToggleOpen');
    const menuCloseBtn = document.getElementById('menuToggleClose');
  
    function toggleMenu() {
      if (!menu) return;
  
      const isShown = menu.classList.toggle('show');
  
      // Si usas Tailwind, puedes agregar/remover la clase `hidden` si lo deseas
      if (isShown) {
        menu.classList.remove('hidden');
      } else {
        menu.classList.add('hidden');
      }
  
      body.classList.toggle('no-scroll', isShown);
    }
  
    menuOpenBtn?.addEventListener('click', toggleMenu);
    menuCloseBtn?.addEventListener('click', toggleMenu);
  
    // Cerrar menú al hacer clic en un enlace
    menu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (menu.classList.contains('show')) {
          toggleMenu();
        }
      });
    });
  
    // ====== HEADER AUTO-HIDE ======
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
  
      hoverZone.addEventListener("mouseenter", () => {
        header.classList.remove("header-hidden");
      });
    }
  
    // ====== AÑO EN EL FOOTER ======
    const anio = document.getElementById("anioActual");
    if (anio) {
      anio.textContent = new Date().getFullYear();
    }
  });
  