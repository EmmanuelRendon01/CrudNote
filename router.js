import { loadCss } from "./utils/loadCss.js";
import { loadScript } from "./utils/loadJs.js";

const routes = {
    '#/' : 'landpage.html',
    '#/login': 'login.html',
    '#/register': 'register.html',
    '#/dashboard': 'dashboard.html',
    '#/note': 'note.html'
}

export async function router(){
    const app = document.getElementById('app');
    const route = window.location.hash || '#/';
    const page = routes[route];

    switch (route) {
        case '#/login':
            loadCss('login.css')
            loadScript('login.js')
            break;
        
        case '#/register':
            loadCss('register.css')
            loadScript('register.js')
            break;

        case '#/landpage':
            loadCss('landpage.css')
            break;
    
        default:
            break;
    }

    try {
        const res = await fetch(`./pages/${page}`);
        const html = await res.text();
        app.innerHTML = html;

    } catch (error) {
        app.innerHTML = `<h1>Error</h1>`;
        console.error(error)
    }
}


