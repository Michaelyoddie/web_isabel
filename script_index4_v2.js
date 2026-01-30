/*
=====================================================
   SCRIPT DEL SITIO WEB (Actualizado)
   Versión: Sin carrusel principal, con Hero animado.
   Incluye: Nuevo Carrusel Enfoque Profesional
=====================================================
*/

document.addEventListener("DOMContentLoaded", function () {
    
    // ========================
    // 1. Selección de Elementos Globales
    // ========================
    const body = document.body;
    const header = document.querySelector("header");
    const hoverZone = document.querySelector(".header-hover-zone");
    const menu = document.getElementById('fullscreenMenu');
    const openMenuBtn = document.getElementById('menuToggleOpen');
    const closeMenuBtn = document.getElementById('menuToggleClose');
    const preloader = document.getElementById("preloader");
    const cerrarBtn = document.getElementById("cerrarPreloader");
    const anioActualEl = document.getElementById('anioActual');
    let lastScroll = 0; 

    // ========================
    // 2. Menú Fullscreen
    // ========================
    function toggleMenu() {
        if (!menu) return;
        const isShown = menu.classList.toggle('show');
        body.classList.toggle('no-scroll', isShown);
    }

    openMenuBtn?.addEventListener('click', toggleMenu);
    closeMenuBtn?.addEventListener('click', toggleMenu);

    menu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('show')) {
                toggleMenu();
            }
        });
    });

    // ========================
    // 3. Header Auto-Hide
    // ========================
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

    // ========================
    // 4. Animaciones de Scroll (Intersection Observer)
    // ========================
    const elementosOcultos = document.querySelectorAll('.oculto-scroll, .oculto-izquierda, .oculto-derecha');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('mostrar-scroll');
                if (entry.target.classList.contains('oculto-izquierda')) {
                    entry.target.classList.add('izquierda');
                } else if (entry.target.classList.contains('oculto-derecha')) {
                    entry.target.classList.add('derecha');
                }
            } else {
                // Revertir animación al salir (opcional)
                entry.target.classList.remove('mostrar-scroll', 'izquierda', 'derecha');
            }
        });
    }, {
        threshold: 0.15 
    });

    elementosOcultos.forEach(el => observer.observe(el));


    // ========================
    // 5. Lógica del Preloader + RESET ANIMACIÓN HERO
    // ========================
    let preloaderTimeout;

    function ocultarPreloader() {
        if (!preloader || preloader.classList.contains('hidden')) return;

        clearTimeout(preloaderTimeout);
        preloader.classList.add("hidden");

        // --- TRUCO DE ANIMACIÓN ---
        // Reiniciamos la animación CSS del Hero para que se ejecute 
        // JUSTO cuando el usuario empieza a ver la página.
        const heroAnims = document.querySelectorAll('.animate-fade-in-photo');
        heroAnims.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; /* trigger reflow (reinicio forzado) */
            el.style.animation = null; // Vuelve a aplicar la animación del CSS
        });

        setTimeout(() => {
            preloader.style.display = "none";
            // Iniciar lógicas secundarias si existen
            updateCarousel3D(); 
            startAutoRotate3D(); 
        }, 1000); 
    }

    if (preloader) {
        // Espera 2 segundos antes de ocultar
        preloaderTimeout = setTimeout(ocultarPreloader, 2000);
        cerrarBtn?.addEventListener("click", ocultarPreloader);
    } else {
        setTimeout(() => {
            updateCarousel3D();
            startAutoRotate3D();
        }, 50);
    }

    // ========================
    // 6. Carrusel 3D (Lógica defensiva por si se usa después)
    // ========================
    const items3D = document.querySelectorAll('.carousel-3d-item');
    const totalItems3D = items3D.length;
    let currentIndex3D = 0;
    let autoRotate3DInterval;

    function updateCarousel3D() {
        if (totalItems3D === 0) return;
        items3D.forEach((item, i) => {
            item.className = 'carousel-3d-item'; 
            if (i === currentIndex3D) item.classList.add('front');
            else if (i === (currentIndex3D + 1) % totalItems3D) item.classList.add('right');
            else if (i === (currentIndex3D - 1 + totalItems3D) % totalItems3D) item.classList.add('left');
            else if (i === (currentIndex3D + 3) % totalItems3D || i === (currentIndex3D - 3 + totalItems3D) % totalItems3D) item.classList.add('back');
        });
    }

    function rotateCarousel3D(direction = -1) {
        currentIndex3D = (currentIndex3D + direction + totalItems3D) % totalItems3D;
        updateCarousel3D();
    }

    function startAutoRotate3D() {
        if (totalItems3D === 0) return;
        stopAutoRotate3D();
        autoRotate3DInterval = setInterval(() => rotateCarousel3D(-1), 5000);
    }

    function stopAutoRotate3D() {
        clearInterval(autoRotate3DInterval);
        autoRotate3DInterval = null;
    }

    document.getElementById("carousel3DPrevBtn")?.addEventListener("click", () => {
        rotateCarousel3D(1);
        stopAutoRotate3D();
        startAutoRotate3D();
    });

    document.getElementById("carousel3DNextBtn")?.addEventListener("click", () => {
        rotateCarousel3D(-1);
        stopAutoRotate3D();
        startAutoRotate3D();
    });


    // ========================
    // 7. Inicialización de Carruseles (Swiper.js)
    // ========================
  
    // NOTA: Se eliminó 'principalSwiper' porque ahora usamos la sección Hero estática.

    // --- Carrusel de Metodología (Proceso) ---
    const swiperProcess = new Swiper(".myProcessSwiper", {
        loop: true,
        spaceBetween: 24,
        navigation: {
            nextEl: "#processNextBtn",
            prevEl: "#processPrevBtn",
        },
        slidesPerView: 1.5, 
        breakpoints: {
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 4 }
        },
    });

    // --- Carrusel de Proyectos ---
    const swiperProjects = new Swiper(".myProjectsSwiper", {
      loop: true,
      spaceBetween: 24, 
      freeMode: false, 
      slidesOffsetBefore: 24, 
      slidesOffsetAfter: 24,  
      navigation: {
        nextEl: "#projectsNextBtn",
        prevEl: "#projectsPrevBtn",
      },
      slidesPerView: 1.15, 
      breakpoints: {
        640: { slidesPerView: 1.2, spaceBetween: 24 },
        1024: { slidesPerView: 2.5, spaceBetween: 24, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
        1280: { slidesPerView: 3, spaceBetween: 24, slidesOffsetBefore: 0, slidesOffsetAfter: 0 }
      },
    });

    // --- Carrusel de Testimonios ---
    const swiperTestimonials = new Swiper(".myTestimonialsSwiper", {
        loop: true,
        autoplay: {
            delay: 7000, 
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination", 
            clickable: true,
        },
        grabCursor: true
    });

    // --- Carrusel de Líneas de Arquitectura (Si existe en HTML) ---
    const swiperLineas = new Swiper(".myLineasSwiper", {
      loop: true,
      spaceBetween: 24, 
      navigation: {
        nextEl: "#lineasNextBtn", 
        prevEl: "#lineasPrevBtn", 
      },
      slidesPerView: 1.15, 
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 2 }
      },
    });

    // --- NUEVO: Carrusel de Enfoque Profesional ---
    const swiperEnfoque = new Swiper(".myEnfoqueSwiper", {
        loop: true,               // Infinito
        centeredSlides: true,     // Centrado en móvil se ve mejor
        autoplay: {
            delay: 3000,          // Avanza cada 3 segundos
            disableOnInteraction: false, // Sigue avanzando tras tocarlo
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: "#enfoqueNextBtn",
            prevEl: "#enfoquePrevBtn",
        },
        breakpoints: {
            // Móvil: 1 item visible
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true, 
            },
            // Tablet pequeña
            640: {
                slidesPerView: 2,
                spaceBetween: 30,
                centeredSlides: false,
            },
            // Tablet grande / Laptop
            768: {
                slidesPerView: 3,
                spaceBetween: 40,
                centeredSlides: false,
            },
            // Escritorio: 4 items visibles
            1024: {
                slidesPerView: 4,
                spaceBetween: 50,
                centeredSlides: false,
            }
        },
    });


    // ========================
    // 8. Footer (Año)
    // ========================
    if (anioActualEl) {
        anioActualEl.textContent = new Date().getFullYear();
    }

}); // <-- FIN DE DOMContentLoaded

/* FIX SWIPER LOAD */
window.addEventListener("load", () => {
  const swiperInstance = document.querySelector('.myTestimonialsSwiper')?.swiper;
  const swiperEnfoqueInstance = document.querySelector('.myEnfoqueSwiper')?.swiper;
  
  if (swiperInstance) swiperInstance.update(); 
  if (swiperEnfoqueInstance) swiperEnfoqueInstance.update();
});