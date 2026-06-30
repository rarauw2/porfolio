// Este código se ejecuta cuando la página carga
console.log("¡Hola! El archivo JavaScript está funcionando correctamente.");
const boton = document.getElementById('boton-oscuro');

boton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
