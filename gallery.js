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