document.addEventListener("DOMContentLoaded", function () {
    const openGalleryButton = document.getElementById("openGallery");
    const closeGalleryButton = document.getElementById("closeGallery");
    const photoGallery = document.getElementById("photoGallery");
  
    // Abrir la galería
    openGalleryButton.addEventListener("click", () => {
      photoGallery.style.display = "block";
    });
  
    // Cerrar la galería
    closeGalleryButton.addEventListener("click", () => {
      photoGallery.style.display = "none";
    });
  
    // Cerrar la galería haciendo clic fuera del contenido
    photoGallery.addEventListener("click", (event) => {
      if (event.target === photoGallery) {
        photoGallery.style.display = "none";
      }
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector("video");
    if (video) {
      video.muted = true; // Asegúrate de que esté silenciado
      video.play().catch(error => {
        console.error("Error al reproducir el video automáticamente:", error);
      });
    }
  });
  const heartsContainer = document.getElementById('hearts-container');

function createHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = '🩷'; // Emoji de corazón
  heart.classList.add('heart');

  // Posición horizontal aleatoria
  heart.style.left = Math.random() * 100 + 'vw';

  // Duración de la animación aleatoria
  heart.style.animationDuration = Math.random() * 3 + 2 + 's';

  // Tamaño aleatorio
  heart.style.fontSize = Math.random() * 20 + 10 + 'px';

  // Agrega el corazón al contenedor
  heartsContainer.appendChild(heart);

  // Elimina el corazón después de que termine la animación
  setTimeout(() => {
    heart.remove();
  }, 5000); // Ajusta el tiempo según la duración de la animación
}

// Crea un nuevo corazón cada 300ms
setInterval(createHeart, 300);
// JavaScript para el preloader
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.valentine-preloader');
  const progress = document.querySelector('.progress');
  
  // Simular progreso de carga
  let currentProgress = 0;
  const progressInterval = setInterval(() => {
    currentProgress += Math.random() * 3;
    if(currentProgress >= 100) {
      currentProgress = 100;
      clearInterval(progressInterval);
    }
    progress.textContent = Math.min(currentProgress, 100).toFixed(0) + '%';
  }, 200);

  // Crear corazones flotantes adicionales
  const heartsContainer = document.querySelector('.floating-hearts');
  for(let i = 0; i < 5; i++) {
    const heart = document.createElement('div');
    heart.style.cssText = `
      position: absolute;
      font-size: ${20 + Math.random() * 20}px;
      left: ${Math.random() * 100}%;
      animation: float ${3 + Math.random() * 3}s infinite;
      animation-delay: ${Math.random() * 2}s;
      opacity: 0;
    `;
    heart.innerHTML = Math.random() > 0.5 ? '💖' : '💘';
    heartsContainer.appendChild(heart);
  }

  // Ocultar al cargar todo
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      preloader.addEventListener('transitionend', () => {
        preloader.remove();
      });
    }, 1000);
  });
});
// Configuración inicial de Media Session
if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: 'ForYou❤️',
    artist: 'Yamil & Esmeralda',
    artwork: [
      { src: 'https://files.catbox.moe/xgv2gd.jpg', sizes: '96x96', type: 'image/jpg' }
    ]
  });
}