import { header } from '../components/header.js';
import { footer } from '../components/footer.js';

export const landing = (router) => {
    // Contenedor genérico para la página
    const contenedor = document.createElement('div');
    contenedor.className = 'contenedor-pagina';

    // Crear elementos de main
    const main = document.createElement('main');
    const section = document.createElement('section');
    const imgIzquierda = document.createElement('img');
    const imgDerecha = document.createElement('img');
    const parrafoBienvenida = document.createElement('p');
    const botonIngresar = document.createElement('button');

    main.id = 'main-landing';

    imgIzquierda.className = 'img-izq';
    imgIzquierda.src = 'assets/img/nino.jpg';
    imgIzquierda.alt = 'Nino, personaje de Los Peques';

    parrafoBienvenida.innerHTML = `Bienvenido a Duende,<br/> un mercado central<br/> en una tierra medieval`;

    botonIngresar.className = 'boton';
    botonIngresar.textContent = 'Ingresar';

    // Éste método debe cambiar con router
    /*
    botonIngresar.addEventListener('click', () => {
        window.location.href = '../../pages/login.html';
    });
    */

    botonIngresar.addEventListener('click', () => {
        router.goTo('/login');
    });

    imgDerecha.className = 'img-der';
    imgDerecha.src = 'assets/img/chicho.jpg';
    imgDerecha.alt = 'Chicho, personaje de Los Peques';

    parrafoBienvenida.appendChild(botonIngresar);
    section.appendChild(imgIzquierda);
    section.appendChild(parrafoBienvenida);
    section.appendChild(imgDerecha);
    main.appendChild(section);

    // Agregar componentes principales de body
    contenedor.appendChild(header());
    contenedor.appendChild(main);
    contenedor.appendChild(footer());

    return (contenedor);
};
