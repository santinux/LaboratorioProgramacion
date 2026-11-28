import { Router } from './router.js';

/**
 * Inicializa la aplicación al cargar el DOM.
 */
document.addEventListener('DOMContentLoaded', async () => {
    const root = document.querySelector('#root');
    const router = new Router(root);
    await router.navegar('/');
});
