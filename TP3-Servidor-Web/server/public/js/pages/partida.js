import { header } from '../components/header.js';
import { footer } from '../components/footer.js';
import { cardTienda } from '../components/card-tienda.js';
import { TiendasRepository } from '../repositories/tiendas-repository.js';
import { Tienda } from '../models/tienda-model.js';

export const partida = (router) => {
    // Contenedor genérico para la página
    const contenedor = document.createElement('div');
    contenedor.className = 'contenedor-pagina';

    document.title = 'Partida';
    // Esto se deberá obtener del estado global
    let usuarioLogueado = true;

    // Crear elementos de main
    const main = document.createElement('main');
    const h1 = document.createElement('h1');
    const idPartida = document.createElement('span');
    const contenedorPartida = document.createElement('div');
    const h2 = document.createElement('h2');
    const contenedorTiendas = document.createElement('div');

    main.id = 'main-partida';
    contenedorPartida.className = 'contenedor-partida';
    contenedorTiendas.className = 'contenedor-tiendas';

    h1.textContent = 'Partida: ';
    // La id deberá obtenerse de la partida actual
    idPartida.textContent = 'Link, Héroe del Tiempo (#1234)';
    h2.textContent = 'Tiendas Disponibles';

    // Obtener las tiendas y renderizar sus cards
    const cargarTiendas = async () => {
        try {
            const tiendas = await TiendasRepository.getTiendas();
            tiendas.forEach((datos) => {
                const tienda = new Tienda(
                    datos.id,
                    datos.tipo,
                    datos.nombre,
                    datos.descripcion,
                    datos.imagen
                );
                contenedorTiendas.appendChild(cardTienda({ tienda, router }));
            });
        } catch (error) {
            console.error(error);
        }
    };

    cargarTiendas();

    h1.appendChild(idPartida);

    contenedorPartida.appendChild(h2);
    contenedorPartida.appendChild(contenedorTiendas);

    main.appendChild(h1);
    main.appendChild(contenedorPartida);

    // Agregar componentes principales de body
    contenedor.appendChild(header({usuarioLogueado}));
    contenedor.appendChild(main);
    contenedor.appendChild(footer());

    return (contenedor);
};
