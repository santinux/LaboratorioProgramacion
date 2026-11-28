/**
 * Router básico responsable de rutear y renderizar las páginas de la
 * aplicación en el navegador.
 *
 */
export class Router {
    constructor(rootElement) {
        this.root = rootElement;
        this.paginaActual = null;

        // Escuchar cambios en el historial
        window.addEventListener('popstate', () => this.navegar());
    }

    async navegar(ruta = null) {
        // Si no se proporciona path, obtener del URL actual
        if (!ruta) {
            ruta = window.location.pathname;
        }

        // Limpiar página anterior
        this.root.innerHTML = '';

        // Importar y renderizar página según ruta
        try {
            let pagina;
            switch (ruta) {
                case '/':
                    const { landing } = await import('./pages/landing.js');
                    pagina = landing(this);
                    break;
                case '/login':
                    const { login } = await import('./pages/login.js');
                    pagina = login(this);
                    break;
                case '/partida':
                    const { partida } = await import('./pages/partida.js');
                    pagina = partida(this);
                    break;
                case '/tienda':
                    const { tienda } = await import('./pages/tienda.js');
                    pagina = tienda(this);
                    break;
                default:
                    const { notFound } = await import('./pages/not-found.js');
                    pagina = notFound();
                    break;
            }
            // Agregar página a root
            this.root.appendChild(pagina);
            this.paginaActual = ruta;
        } catch (error) {
            console.error('Error cargando página:', error);
            this.root.innerHTML = '<p>Error cargando la página</p>';
        }
    }

    // Método para navegar desde componentes
    goTo(ruta) {
        window.history.pushState({}, '', ruta);
        this.navegar(ruta);
    }
}
