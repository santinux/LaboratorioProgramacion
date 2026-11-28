/**
 * Componente footer.
 * @returns {HTMLElement} El componente footer construido
 */
export const footer = () => {
    const footer = document.createElement('footer');
    const p = document.createElement('p');

    p.innerHTML = `Patagonia - ${new Date().getFullYear()}`;

    footer.appendChild(p);

    return (footer);
};
