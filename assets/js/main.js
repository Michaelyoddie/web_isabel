// Seleccionamos el canvas del DOM y obtenemos el contexto 2D
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

// Detectamos la clase del <body> para definir el color de las partículas
// Variables para los colores

let backgroundColor; // Color de fondo
let particleColor; // Color de las partículas
let lineColor; // Color de las líneas

if (document.body.classList.contains('sobre-mi')) {
    backgroundColor = 'black'; // Fondo negro para "Sobre Mí"
    particleColor = 'gris'; // Color blanco para la página "Sobre Mí"
    lineColor = 'rgba(255, 255, 255, 0.5)'; // Color de líneas para "Sobre Mí" (blanco semitransparente)
} else if (document.body.classList.contains('proyectos')) {
    backgroundColor = 'white'; // Fondo blanco para "Proyectos"
    particleColor = 'black'; // Partículas negras para "Proyectos"
    lineColor = 'rgba(128, 128, 128, 0.5)'; // Líneas grises semitransparentes
}

// Función para ajustar el tamaño del canvas según la ventana
function resizeCanvas() {
    canvas.width = window.innerWidth; // Ancho igual al de la ventana
    canvas.height = window.innerHeight; // Alto igual al de la ventana
}
resizeCanvas(); // Llamamos a la función al inicio

// Volvemos a ajustar el tamaño del canvas si la ventana cambia de tamaño
window.addEventListener('resize', () => {
    resizeCanvas(); // Reajustamos las dimensiones
    initParticles(); // Re-inicializamos las partículas
});

// Arreglo donde almacenaremos las partículas
let particles = [];
const maxDistance = 100; // Distancia máxima para conectar partículas con líneas
const numParticles = 100; // Cantidad total de partículas

// Objeto que rastrea la posición del cursor
const mouse = { x: undefined, y: undefined };

// Evento que actualiza las coordenadas del cursor al moverlo
canvas.addEventListener('mousemove', event => {
    mouse.x = event.clientX; // Guardamos la posición X del cursor
    mouse.y = event.clientY; // Guardamos la posición Y del cursor
});

// Clase que representa una partícula
class Particle {
    constructor(x, y, speedX, speedY, size) {
        this.x = x; // Coordenada inicial en X
        this.y = y; // Coordenada inicial en Y
        this.speedX = speedX; // Velocidad en el eje X
        this.speedY = speedY; // Velocidad en el eje Y
        this.size = size; // Tamaño (radio) de la partícula
    }

    // Método para dibujar la partícula en el canvas
    draw() {
        ctx.beginPath(); // Comenzamos un nuevo camino
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Dibujamos un círculo
        ctx.fillStyle = particleColor; // Usamos el color definido según la página
        ctx.fill(); // Rellenamos el círculo
    }

    // Método para actualizar la posición de la partícula
    update() {
        this.x += this.speedX; // Movemos la partícula en X
        this.y += this.speedY; // Movemos la partícula en Y

        // Efecto de repulsión: las partículas se alejan si el cursor está cerca
        const dx = this.x - mouse.x; // Diferencia en X entre partícula y cursor
        const dy = this.y - mouse.y; // Diferencia en Y entre partícula y cursor
        const distance = Math.sqrt(dx * dx + dy * dy); // Calculamos la distancia
        const repelRadius = 150; // Radio dentro del cual las partículas son repelidas

        if (distance < repelRadius) {
            const angle = Math.atan2(dy, dx); // Calculamos el ángulo
            const overlap = repelRadius - distance; // Qué tanto está dentro del radio
            const pushStrength = 0.3; // Fuerza de empuje
            this.x += overlap * Math.cos(angle) * pushStrength; // Ajustamos X
            this.y += overlap * Math.sin(angle) * pushStrength; // Ajustamos Y
        }

        // Rebote de las partículas en los bordes del canvas
        if (this.x - this.size < 0 || this.x + this.size > canvas.width) {
            this.speedX *= -1; // Cambiamos la dirección en X
        }
        if (this.y - this.size < 0 || this.y + this.size > canvas.height) {
            this.speedY *= -1; // Cambiamos la dirección en Y
        }
    }
}

// Función para inicializar todas las partículas
function initParticles() {
    particles = []; // Reiniciamos el arreglo de partículas
    for (let i = 0; i < numParticles; i++) {
        const size = Math.random() * 3 + 2; // Tamaño aleatorio entre 2px y 5px
        const x = Math.random() * canvas.width; // Posición inicial aleatoria en X
        const y = Math.random() * canvas.height; // Posición inicial aleatoria en Y
        const speedX = (Math.random() - 0.5) * 2; // Velocidad aleatoria en X
        const speedY = (Math.random() - 0.5) * 2; // Velocidad aleatoria en Y
        particles.push(new Particle(x, y, speedX, speedY, size)); // Creamos y agregamos la partícula
    }
}

// Función para conectar partículas cercanas con líneas
function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x; // Diferencia en X
            const dy = particles[i].y - particles[j].y; // Diferencia en Y
            const distance = Math.sqrt(dx * dx + dy * dy); // Distancia entre partículas

            if (distance < maxDistance) { // Si la distancia es menor a maxDistance
                const opacity = 1 - distance / maxDistance; // Opacidad proporcional a la distancia
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`; // Color de la línea
                ctx.lineWidth = 1; // Grosor de la línea
                ctx.beginPath(); // Comenzamos un nuevo camino
                ctx.moveTo(particles[i].x, particles[i].y); // Punto inicial
                ctx.lineTo(particles[j].x, particles[j].y); // Punto final
                ctx.stroke(); // Dibujamos la línea
            }
        }
    }
}

// Función para animar las partículas
function animate() {
    ctx.fillStyle = 'black'; // Fondo negro del canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Llenamos todo el canvas
    particles.forEach(p => {
        p.update(); // Actualizamos la posición de la partícula
        p.draw(); // Dibujamos la partícula
    });
    connectParticles(); // Conectamos partículas cercanas
    requestAnimationFrame(animate); // Llamamos a la función en el próximo frame
}

// Inicializamos el sistema de partículas y comenzamos la animación
initParticles();
animate();
