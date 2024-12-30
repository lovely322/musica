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