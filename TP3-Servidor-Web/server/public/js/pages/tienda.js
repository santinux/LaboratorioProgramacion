import { header } from '../components/header.js';
import { footer } from '../components/footer.js';

export const tienda = (props = {}) => {
    const { router, idTienda } = props;

    // Contenedor genérico para la página
    const contenedor = document.createElement('div');
    contenedor.className = 'contenedor-pagina';

    document.title = 'Tienda';
    // Esto se deberá obtener del estado global
    let usuarioLogueado = true;

    // Crear elementos de main
    const main = document.createElement('main');
    const h1 = document.createElement('h1');

    // TODO mostrar inventario

    contenedor.appendChild(header({usuarioLogueado}));
    contenedor.appendChild(main);
    contenedor.appendChild(footer());

    return (contenedor);
}
