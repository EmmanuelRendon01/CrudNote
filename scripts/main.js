// scripts/main.js
import { renderRoute } from '../router.js';

const app = document.getElementById('app');

const handleRoute = () => renderRoute(location.hash, app);

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);