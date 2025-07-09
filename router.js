import { loadCss } from "./utils/loadCss.js";

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
            break;
        
        case '#/register':
            loadCss('register.css')
            break;

        case '#/landpage':
            loadCss('landpage.css')
            break;

        // case '#/dashboard':
        //     loadCss('dashboard.css')
        //     break;
    
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


