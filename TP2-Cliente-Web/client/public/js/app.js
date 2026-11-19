import { Router } from './Router.js';

/**
 * Inicializa la aplicación al cargar el DOM.
 */
document.addEventListener('DOMContentLoaded', async () => {
    const root = document.querySelector('#root');
    const router = new Router(root);
    router.navegar('/');
});
