const startDate = new Date(2025, 5, 20);

// --- SAYAÇ MANTIĞI ---
function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.innerHTML = `
            <div class="timer-box">
                <span class="timer-val">${days}</span>
                <span class="timer-unit">GÜN</span>
            </div>
            <div class="timer-box">
                <span class="timer-val">${hours}</span>
                <span class="timer-unit">SAAT</span>
            </div>
            <div class="timer-box">
                <span class="timer-val">${minutes}</span>
                <span class="timer-unit">DK</span>
            </div>
            <div class="timer-box">
                <span class="timer-val">${seconds}</span>
                <span class="timer-unit">SN</span>
            </div>
        `;
    }
}
setInterval(updateTimer, 1000);
updateTimer();

// --- KAR YAĞIŞI EFEKTİ ---
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > height) {
            this.y = -10;
            this.x = Math.random() * width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = Math.min(width * 0.2, 150);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resize();
    initParticles();
});

resize();
initParticles();
animate();

// --- MÜZİK ÇALAR ---
const playBtn = document.getElementById('playBtn');
const audio = document.getElementById('audio');
const disk = document.getElementById('disk');
let isPlaying = false;

if (playBtn) {
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<i class="fa-solid fa-play ml-1"></i>';
            disk.classList.remove('spin-slow');
            disk.style.animationPlayState = 'paused';
        } else {
            audio.play();
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            disk.classList.add('spin-slow');
            disk.style.animationPlayState = 'running';
        }
        isPlaying = !isPlaying;
    });
}