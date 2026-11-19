import { header } from '../components/header.js';
import { footer } from '../components/footer.js';

export const login = (router) => {
    // Contenedor genérico para la página
    const contenedor = document.createElement('div');
    contenedor.className = 'contenedor-pagina';

    document.title = 'Login';
    // Esto se deberá obtener del estado global
    let usuarioLogueado = true;

    // Crear elementos de main
    const main = document.createElement('main');
    const titulo = document.createElement('h1');
    const formulario = document.createElement('form');
    const labelUsuario = document.createElement('label');
    const labelContrasegna = document.createElement('label');
    const inputUsuario = document.createElement('input');
    const inputContrasegna = document.createElement('input');
    const botonLogin = document.createElement('button');

    main.id = 'main-login';

    titulo.textContent = 'Login';

    labelUsuario.textContent = 'Nombre de Usuario';
    labelUsuario.setAttribute('for', 'usuario');

    inputUsuario.setAttribute('type', 'text');
    inputUsuario.setAttribute('id', 'usuario');
    inputUsuario.setAttribute('name', 'username');

    labelContrasegna.textContent = 'Contraseña:';
    labelContrasegna.setAttribute('for', 'contrasegna');

    inputContrasegna.setAttribute('type', 'password');
    inputContrasegna.setAttribute('id', 'contrasegna');
    inputContrasegna.setAttribute('name', 'contrasegna');

    botonLogin.setAttribute('type', 'button');
    botonLogin.textContent = 'Ingresar';

    botonLogin.addEventListener('click', () => {
        router.goTo('/partida');
    });

    formulario.appendChild(labelUsuario);
    formulario.appendChild(inputUsuario);
    formulario.appendChild(labelContrasegna);
    formulario.appendChild(inputContrasegna);
    formulario.appendChild(botonLogin);

    main.appendChild(titulo);
    main.appendChild(formulario);

    // Agregar componentes principales de body
    contenedor.appendChild(header({usuarioLogueado}));
    contenedor.appendChild(main);
    contenedor.appendChild(footer());

    return (contenedor);
};
