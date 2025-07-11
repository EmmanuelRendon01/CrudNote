import { loadCss } from "./utils/loadCss.js";
import { loadScript } from "./utils/loadJs.js";
import { guardian } from "../services/auth.js";

const routes = {
    '#/': 'landpage.html',
    '#/login': 'login.html',
    '#/register': 'register.html',
    '#/dashboard': 'dashboard.html',
    '#/note': 'note.html'
}

export async function router() {
    const app = document.getElementById('app');
    const route = window.location.hash || '#/';
    const page = routes[route];

    try {

        if (window.currentPage && window.pageModules[window.currentPage]) {
            window.pageModules[window.currentPage].cleanup();
        }

        const res = await fetch(`./pages/${page}`);
        const html = await res.text();
        app.innerHTML = html;

        switch (route) {
            case '#/login':
                loadCss('login.css');
                await loadScript('login.js');

                if (window.pageModules['login.js']) {
                    window.pageModules['login.js'].init();
                }
                window.currentPage = 'login.js';
                break;

            case '#/register':
                loadCss('register.css');
                await loadScript('register.js');

                if (window.pageModules['register.js']) {
                    window.pageModules['register.js'].init();
                }
                window.currentPage = 'register.js';
                break;

            case '#/':
                loadCss('landpage.css');
                break;

            case '#/dashboard':
                if (!guardian()) {
                    break;
                }
                loadCss('dashboard.css');
                await loadScript('dashboard.js');

                if (window.pageModules['dashboard.js']) {
                    window.pageModules['dashboard.js'].init();
                }

                window.currentPage = 'dashboard.js';
                break;

            case '#/note':
                if (!guardian()) {
                    break;
                }
                loadCss('note.css')
                await loadScript('note.js');

                if (window.pageModules['note.js']) {
                    window.pageModules['note.js'].init();
                }

                window.currentPage = 'note.js';
                break;
        }
    } catch (error) {
        app.innerHTML = `<h1>Error</h1>`;
        console.error(error);
    }
}