// scripts/main.js
import { renderRoute } from '../router.js';

const app = document.getElementById('app');

// Obtiene la ruta actual y la etiqueta donde se le va inserar el contenido
const handleRoute = () => renderRoute(location.hash, app);

// Cuando cambia el hash ejecuta la función
window.addEventListener('hashchange', handleRoute);
// Cuando se carga la página ejecuta la funcion
window.addEventListener('DOMContentLoaded', handleRoute);