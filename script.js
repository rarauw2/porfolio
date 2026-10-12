const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Posición del cursor con suavizado de inercia
const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
window.addEventListener('mousemove', (e) => {
  mouse.targetX = e.clientX;
  mouse.targetY = e.clientY;
});

window.addEventListener('mouseleave', () => {
  mouse.targetX = -1000;
  mouse.targetY = -1000;
});

// Configuración para el look del póster (espirales orbitantes 3D)
const config = {
  rings: 48,             // Gran cantidad de anillos para tupir la malla
  color: '#ffffff',      // Rojo intenso como la imagen
  repelRadius: 260,      // Radio de distorsión del ratón
  repelForce: 75,        // Fuerza de deformación elástica
  ambientSpeed: 0.003,   // Velocidad de órbita global (pausada y elegante)
};

let time = 0;

function draw() {
  // Interpolación suave del movimiento del ratón
  mouse.x += (mouse.targetX - mouse.x) * 0.08;
  mouse.y += (mouse.targetY - mouse.y) * 0.08;

  // Fondo oscuro con un ligerísimo rastro para dar suavidad (opcional, aquí limpio directo)
  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  // Escalado adaptativo según pantalla
  const baseRadius = Math.min(width, height) * 0.32;

  ctx.lineWidth = 0.85; // Líneas muy finas, como de grabado o render vectorial
  time += config.ambientSpeed;

  // Dibujamos las órbitas desalineadas 
  for (let r = 0; r < config.rings; r++) {
    const ringProgress = r / config.rings;

    // Calculamos un desfase orbital para cada anillo.
    // Esto crea la ilusión de espirales entrelazadas y volumen 3D.
    const angleOffset = ringProgress * Math.PI * 2 + time * 1.5;
    
    // Desplazamos levemente el centro de cada órbita para el look descentrado y orgánico
    const offsetDistance = baseRadius * 0.45 * Math.sin(time * 0.5 + ringProgress * Math.PI);
    const ringCenterX = centerX + Math.cos(angleOffset) * offsetDistance;
    const ringCenterY = centerY + Math.sin(angleOffset * 0.7) * offsetDistance;

    // Modificamos el radio de cada anillo de forma progresiva
    const currentRadiusX = baseRadius * (0.4 + ringProgress * 0.95);
    const currentRadiusY = baseRadius * (0.2 + ringProgress * 0.8) * (1 + Math.cos(time + ringProgress * 3) * 0.15);

    // Opacidad: los del centro más tenues, los exteriores más visibles, similar al cartel
    const ringAlpha = 0.06 + (ringProgress * 0.32);
    ctx.strokeStyle = config.color;
    ctx.globalAlpha = ringAlpha;
    ctx.beginPath();

    const steps = 180; // Puntos por elipse
    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2;

      // Elipse base con rotación e inclinación simulando 3D
      const tilt = Math.sin(time * 0.2 + ringProgress * Math.PI) * 0.4;
      let px = ringCenterX + currentRadiusX * Math.cos(theta);
      let py = ringCenterY + currentRadiusY * Math.sin(theta + tilt);

      // --- DISTORSIÓN REACTIVA AL MOUSE ---
      const dx = px - mouse.x;
      const dy = py - mouse.y;
      const dist = Math.hypot(dx, dy);

      if (dist < config.repelRadius) {
        // Cuanto más cerca, más fuerza. 
        const force = (1 - dist / config.repelRadius);
        // Efecto elástico de "absorción y empuje" geométrico
        const push = Math.pow(force, 2) * config.repelForce;

        // Añadimos una micro-ondulación (interferencia) para que vibre de forma orgánica al tocarlo
        const wave = Math.sin(dist * 0.08 - time * 12) * (force * 12);

        // Desplazamos los puntos vectoriales en dirección al cursor/contraria
        px += (dx / (dist || 1)) * push + (Math.cos(theta) * wave);
        py += (dy / (dist || 1)) * push + (Math.sin(theta) * wave);
      }

      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }

  // Restauramos la opacidad general para otras capas de la web
  ctx.globalAlpha = 1.0;
  requestAnimationFrame(draw);
}

draw();