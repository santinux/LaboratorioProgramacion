
const fs = require('fs').promises;
const path = require('path');

const rutaArchivo = path.join(__dirname, '../data/negocios.json');

// Funciones auxiliares
async function leerNegocios() {
    const contenido = await fs.readFile(rutaArchivo, 'utf-8');
    const negocios = JSON.parse(contenido);

    if (!Array.isArray(negocios)) {
        throw new Error('El archivo de negocios tiene un formato inválido');
    }

    return negocios;
}

async function guardarNegocios(negocios) {
    await fs.writeFile(
        rutaArchivo,
        JSON.stringify(negocios, null, 2),
        'utf-8'
    );
}

function normalizarNombre(nombre) {
    return nombre.trim().toLowerCase();
}

/////////////////////////////// GET //////////////////////////////////

// Obtener negocios paginados
async function obtenerNegocios(cantidad, from) {
    const negocios = await leerNegocios();

    return negocios.slice(from, from + cantidad);
}

// Obtener negocio por ID
async function obtenerNegocioPorId(id) {
    const negocios = await leerNegocios();

    return negocios.find(negocio => negocio.id === id) || null;
}

/////////////////////////////// POST /////////////////////////////////

// Crear negocio
async function crearNegocio(nuevoNegocio) {
    const negocios = await leerNegocios();

    const existe = negocios.some(
        negocio => normalizarNombre(negocio.nombre) ===
            normalizarNombre(nuevoNegocio.nombre)
    );

    if (existe) {
        return null;
    }

    const nuevoId = negocios.reduce(
        (max, negocio) => Math.max(max, negocio.id),
        0
    ) + 1;

    const negocioCreado = {
        id: nuevoId,
        ...nuevoNegocio
    };

    negocios.push(negocioCreado);

    await guardarNegocios(negocios);

    return negocioCreado;
}

/////////////////////////////// PUT //////////////////////////////////

// Actualizar negocio
async function actualizarNegocio(id, datosActualizados) {
    const negocios = await leerNegocios();

    const indice = negocios.findIndex(negocio => negocio.id === id);

    if (indice === -1) {
        return null;
    }

    if (datosActualizados.nombre !== undefined) {
        const existe = negocios.some(negocio =>
            negocio.id !== id &&
            normalizarNombre(negocio.nombre) ===
                normalizarNombre(datosActualizados.nombre)
        );

        if (existe) {
            return false;
        }
    }

    negocios[indice] = {
        ...negocios[indice],
        ...datosActualizados
    };

    await guardarNegocios(negocios);

    return negocios[indice];
}

module.exports = {
    obtenerNegocios,
    obtenerNegocioPorId,
    crearNegocio,
    actualizarNegocio
};
