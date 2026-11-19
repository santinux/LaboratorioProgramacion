
const fs = require('fs').promises;
const path = require('path');

const usuarioService = require('./usuarioService');

const rutaArchivo = path.join(__dirname, '../data/partidas.json');

// Funciones auxiliares
async function leerPartidas() {
    const contenido = await fs.readFile(rutaArchivo, 'utf-8');
    const partidas = JSON.parse(contenido);

    if (!Array.isArray(partidas)) {
        throw new Error('El archivo de partidas tiene un formato inválido');
    }

    return partidas;
}

async function guardarPartidas(partidas) {
    await fs.writeFile(
        rutaArchivo,
        JSON.stringify(partidas, null, 2),
        'utf-8'
    );
}

/////////////////////////////// GET //////////////////////////////////

// Obtener partidas paginadas
async function obtenerPartidas(cantidad, from) {
    const partidas = await leerPartidas();

    return partidas.slice(from, from + cantidad);
}

// Obtener partida por ID
async function obtenerPartidaPorId(id) {
    const partidas = await leerPartidas();

    return partidas.find(partida => partida.id === id) || null;
}

// Obtener partidas de un usuario
async function obtenerPartidasPorUsuario(idUsuario) {
    const usuario = await usuarioService.obtenerUsuarioPorId(idUsuario);

    if (!usuario) {
        return null;
    }

    const partidas = await leerPartidas();

    return partidas.filter(partida => partida.idUsuario === idUsuario);
}

/////////////////////////////// POST /////////////////////////////////

// Crear partida
async function crearPartida(nuevaPartida) {
    const usuario = await usuarioService.obtenerUsuarioPorId(
        nuevaPartida.idUsuario
    );

    if (!usuario) {
        return null;
    }

    const partidas = await leerPartidas();

    const nuevoId = partidas.reduce(
        (max, partida) => Math.max(max, partida.id),
        0
    ) + 1;

    const partidaCreada = {
        id: nuevoId,
        ...nuevaPartida,
        fechaCreacion: new Date().toISOString()
    };

    partidas.push(partidaCreada);

    await guardarPartidas(partidas);

    return partidaCreada;
}

module.exports = {
    obtenerPartidas,
    obtenerPartidaPorId,
    obtenerPartidasPorUsuario,
    crearPartida
};
