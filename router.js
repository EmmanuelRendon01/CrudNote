// scripts/router.js
const routes = {
  '/':      () => import('./scripts/landpage.js'),
  '/login': () => import('./scripts/login.js'),
  '/register': () => import('./scripts/register.js'),
  '/dashboard' : () => import('./scripts/dashboard.js'),
  '/note' : () => import('./scripts/note.js')
};

const protectedRoutes = ['/dashboard', '/note'];

export async function renderRoute(hash, outlet) {
  const path = hash.slice(1) || '/';
  const load = routes[path];

  if (protectedRoutes.includes(path)) {
    const session = sessionStorage.getItem('logged');
    if (session !== "true") {
      window.location.href = '#/login';
      return;
    }
  }

  if (!load) {
    outlet.innerHTML = '<h2>Página no encontrada</h2>';
    return;
  }

  const module = await load();
  const html = await module.render();
  outlet.innerHTML = html;

  if (typeof module.afterRender === 'function') {
    module.afterRender();
  }
}
