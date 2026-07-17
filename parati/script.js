document.addEventListener("DOMContentLoaded", () => {
    const btnAbrir = document.getElementById("btn-abrir");
    const pantallaInicio = document.getElementById("pantalla-inicio");
    const contenidoPrincipal = document.getElementById("contenido-principal");
    const musica = document.getElementById("musica-fondo");

    btnAbrir.addEventListener("click", () => {
        // Reproducir música
        musica.play().catch(error => {
            console.log("El navegador bloqueó el audio:", error);
        });

        // Transición visual: desvanecer la pantalla de inicio
        pantallaInicio.style.opacity = "0";

        // Esperar 1 segundo (lo que dura la transición CSS) antes de ocultar y mostrar el contenido
        setTimeout(() => {
            pantallaInicio.style.display = "none";
            contenidoPrincipal.classList.remove("oculto");
        }, 1000);
    });
});