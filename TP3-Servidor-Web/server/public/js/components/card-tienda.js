export const cardTienda = (props = {}) => {
    const { tienda, router } = props;

    const card = document.createElement('div');
    const img = document.createElement('img');
    const cartel = document.createElement('span');

    card.className = 'card-tienda';
    card.textContent = tienda.getNombre();
    img.src = tienda.getImagen();
    img.alt = `Imagen tienda ${tienda.getNombre()}`;

    if (tienda.getEstado() === 'abierto') {
        cartel.className = 'tienda-abierta';
        cartel.textContent = 'Abierto';
    } else {
        cartel.className = 'tienda-cerrada';
        cartel.textContent = 'Cerrado';
    }

    card.appendChild(img);
    card.appendChild(cartel);

    return (card);
};
