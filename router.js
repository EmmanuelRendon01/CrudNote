import { auth } from './services/auth.js';

const routes = {
  '/': () => import('./scripts/landpage.js'),
  '/login': () => import('./scripts/login.js'),
  '/register': () => import('./scripts/register.js'),
  '/dashboard': () => import('./scripts/dashboard.js'),
  '/note': () => import('./scripts/note.js')
};

export async function renderRoute(hash, app) {
  // Desde #/login quita el # e inicia la cadena desde /, en caso de que devuelva '' devolverá '/'
  const path = hash.slice(1) || '/';
  const load = routes[path];

  auth(path);

  if (!load) {
    app.innerHTML = '<h2>Página no encontrada</h2>';
    return;
  }

  const module = await load();
  const html = await module.render();
  app.innerHTML = html;

  if (typeof module.afterRender === 'function') {
    module.afterRender();
  }
}
