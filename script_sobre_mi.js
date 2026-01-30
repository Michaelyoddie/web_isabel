document.addEventListener("DOMContentLoaded", function () {
    // ====== MENÚ RESPONSIVE ======
    function toggleMenu() {
        const menu = document.querySelector('.fullscreen-menu');
        if (!menu) return;

        if (menu.classList.contains('show')) {
            // Ocultar menú
            menu.classList.remove('show');
            document.body.classList.remove('no-scroll');
        } else {
            // Mostrar menú
            menu.classList.add('show');
            document.body.classList.add('no-scroll');
        }
    }

    const menuToggleOpen = document.getElementById("menuToggleOpen");
    const menuToggleClose = document.getElementById("menuToggleClose");

    if (menuToggleOpen) {
        menuToggleOpen.addEventListener("click", toggleMenu);
    }

    if (menuToggleClose) {
        menuToggleClose.addEventListener("click", toggleMenu);
    }

    // ====== FOOTER: Año actual ======
    const anioActual = document.getElementById("anioActual");
    if (anioActual) {
        anioActual.textContent = new Date().getFullYear();
    }

    // ====== LIGHTBOX DE IMÁGENES ======
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    const galleryImages = document.querySelectorAll('.grid img');
    let currentIndex = 0;

    function showImage(index) {
        currentIndex = index;
        lightboxImg.src = galleryImages[currentIndex].src;
        lightbox.classList.remove('hidden');
    }

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            showImage(index);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.add('hidden');
            lightboxImg.src = "";
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            showImage(currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % galleryImages.length;
            showImage(currentIndex);
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.add('hidden');
                lightboxImg.src = "";
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox || lightbox.classList.contains('hidden')) return;

        if (e.key === 'ArrowRight') {
            nextBtn?.click();
        } else if (e.key === 'ArrowLeft') {
            prevBtn?.click();
        } else if (e.key === 'Escape') {
            closeBtn?.click();
        }
    });


    // ========================
    // Header auto-hide
    // ========================
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

}); // Fin de DOMContentLoaded