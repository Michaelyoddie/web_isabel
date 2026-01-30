function toggleMenu() {
    const menu = document.getElementById("fullscreenMenu");
    menu.classList.toggle("show");
    document.body.classList.toggle("no-scroll");
}

// Opcional: evita scroll del fondo al abrir menú
document.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement('style');
    style.innerHTML = `
        body.no-scroll {
            overflow: hidden;
            position: fixed;
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});
