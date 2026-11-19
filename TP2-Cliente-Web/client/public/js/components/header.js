/**
 * Componente header.
 * @param {Object} props - Propiedades del componente
 * @param {boolean} [props.usuarioLogueado=false] - Si el usuario está logueado
 * @param {string} [props.imagenAvatar='/assets/img/MnM-Ask.jpg'] - Ruta de la imagen del avatar
 * @returns {HTMLElement} El componente header construido
 */
 export const header = (props = {}) => {
    // Props por defecto y asignación por desestructuración
    const {
        usuarioLogueado = false,
        imagenAvatar = "/assets/img/MnM-Ask.jpg"
    } = props;

    // Crear los elementos del header
    const header = document.createElement('header');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const div = document.createElement('div');

    a.href = '/';
    a.innerHTML = '<span class="letra-roja">D</span>ue<span class="letra-roja">nd</span>e';

    // Se puede usar el operador de coalescencia nula, similar al operador ternario
    //img.src = usuarioLogueado ?? imagenAvatar;
    img.src = usuarioLogueado ? "/assets/img/Chicho-mini.jpg" : imagenAvatar;
    img.alt = 'Avatar usuario';

    div.className = 'boton-avatar';
    // Agregar los elementos al header
    div.appendChild(img);
    header.appendChild(a);
    header.appendChild(div);

    return (header);
};
