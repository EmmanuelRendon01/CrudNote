// Importamos funciones que nos permiten cargar archivos CSS y JS de forma dinámica
import { loadCss } from "./utils/loadCss.js";
import { loadScript } from "./utils/loadJs.js";

// Definimos las rutas del sitio. Cada ruta (como #/login) está asociada a un archivo HTML.
const routes = {
    '#/' : 'landpage.html',         // Página de inicio
    '#/login': 'login.html',        // Página de inicio de sesión
    '#/register': 'register.html',  // Página de registro
    '#/dashboard': 'dashboard.html',// Panel principal del usuario
    '#/note': 'note.html'           // Página de notas
}

// Esta función se encarga de cambiar el contenido de la página según la ruta que esté en la URL
export async function router() {
    const app = document.getElementById('app'); // Aquí se va a mostrar el contenido
    const route = window.location.hash || '#/'; // Obtenemos la ruta actual. Si no hay, usamos la de inicio
    const page = routes[route]; // Buscamos el HTML correspondiente a esa ruta

    try {
        // Si ya había una página cargada antes, la limpiamos para evitar errores o duplicaciones
        if (window.currentPage && window.pageModules[window.currentPage]) {
            window.pageModules[window.currentPage].cleanup();
        }

        // Cargamos el archivo HTML correspondiente a la ruta y lo insertamos en la página
        const res = await fetch(`./pages/${page}`);
        const html = await res.text();
        app.innerHTML = html;

        // Según la ruta actual, cargamos los archivos CSS y JS necesarios
        switch (route) {
            case '#/login':
                loadCss('login.css');                 // Cargamos estilos de la página de login
                await loadScript('login.js');         // Cargamos lógica del login

                // Ejecutamos la función que prepara el formulario de login
                if (window.pageModules['login.js']) {
                    window.pageModules['login.js'].init();
                }

                // Guardamos el nombre de la página actual para futuras limpiezas
                window.currentPage = 'login.js';
                break;

            case '#/register':
                loadCss('register.css');              // Estilos para registro
                await loadScript('register.js');      // Lógica para el formulario de registro

                // Activamos el formulario de registro
                if (window.pageModules['register.js']) {
                    window.pageModules['register.js'].init();
                }

                // Guardamos que estamos en la página de registro
                window.currentPage = 'register.js';
                break;

            case '#/':
                loadCss('landpage.css');              // Estilos de la página de inicio
                break;

            case '#/dashboard':
                loadCss('dashboard.css');             // Estilos del panel principal
                break;
        }
    } catch (error) {
        // Si algo falla (por ejemplo, al cargar un archivo), mostramos un mensaje de error
        app.innerHTML = `<h1>Error</h1>`;
        console.error(error); // Mostramos el error en la consola del navegador para debug
    }
}
