// Este código se ejecuta cuando la página carga
console.log("¡Hola! El archivo JavaScript está funcionando correctamente.");
const fechaAniversario = new Date(2024, 9, 12); // Ejemplo: 15 de Junio de 2024

function actualizarContador() {
    const ahora = new Date();
    
    // Restamos las fechas (el resultado es en milisegundos)
    const diferenciaMs = ahora - fechaAniversario;
    
    // Convertimos milisegundos a días
    const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
    
    // Buscamos el párrafo en el HTML y le cambiamos el texto
    document.getElementById('dias-juntos').textContent = `¡${dias} días de risas y momentos juntos!`;
}

// Ejecutamos la función nada más cargar la página
actualizarContador();

