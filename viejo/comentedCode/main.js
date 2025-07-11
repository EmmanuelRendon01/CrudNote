// Importamos la función "router", que se encarga de cargar la página correcta según la ruta (como #/login, #/register, etc.)
import { router } from './router.js'

// Cuando la página termina de cargarse por primera vez, llamamos a "router"
// Esto muestra la sección correcta (por ejemplo, la landing page si estamos en "#/")
window.addEventListener('load', router)

// Cuando la parte final de la URL cambia (por ejemplo, de "#/login" a "#/register"),
// también llamamos a "router" para actualizar lo que se ve en pantalla
window.addEventListener('hashchange', router)
