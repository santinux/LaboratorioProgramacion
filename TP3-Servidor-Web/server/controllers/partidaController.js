
const partidaService = require('../services/partidaService');

function cuerpoValido(cuerpo) {
    return cuerpo !== null &&
        typeof cuerpo === 'object' &&
        !Array.isArray(cuerpo);
}

/////////////////////////////// GET //////////////////////////////////

// Obtener partidas paginadas
async function obtenerPartidas(req, res) {
    try {
        const cantidad = req.query.cantidad === undefined
            ? 10
            : Number(req.query.cantidad);

        const from = req.query.from === undefined
            ? 0
            : Number(req.query.from);

        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            return res.status(400).json({
                error: 'La cantidad debe ser un entero mayor que cero'
            });
        }

        if (!Number.isInteger(from) || from < 0) {
            return res.status(400).json({
                error: 'El parámetro from debe ser un entero mayor o igual a cero'
            });
        }

        const partidas = await partidaService.obtenerPartidas(cantidad, from);

        return res.status(200).json(partidas);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al obtener las partidas'
        });
    }
}

// Obtener partida por ID
async function obtenerPartidaPorId(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: 'El ID debe ser un entero positivo'
            });
        }

        const partida = await partidaService.obtenerPartidaPorId(id);

        if (!partida) {
            return res.status(404).json({
                error: 'Partida no encontrada'
            });
        }

        return res.status(200).json(partida);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al obtener la partida'
        });
    }
}

// Obtener partidas de un usuario
async function obtenerPartidasPorUsuario(req, res) {
    try {
        const idUsuario = Number(req.params.idUsuario);

        if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
            return res.status(400).json({
                error: 'El ID del usuario debe ser un entero positivo'
            });
        }

        const partidas = await partidaService.obtenerPartidasPorUsuario(idUsuario);

        if (partidas === null) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        return res.status(200).json(partidas);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al obtener las partidas del usuario'
        });
    }
}

/////////////////////////////// POST /////////////////////////////////

// Crear partida
async function crearPartida(req, res) {
    try {
        if (!cuerpoValido(req.body)) {
            return res.status(400).json({
                error: 'Debe enviar un objeto JSON válido'
            });
        }

        const { nombre, idUsuario } = req.body;

        if (typeof nombre !== 'string' || nombre.trim() === '') {
            return res.status(400).json({
                error: 'El nombre de la partida es obligatorio'
            });
        }

        if (nombre.trim().length > 50) {
            return res.status(400).json({
                error: 'El nombre no puede superar los 50 caracteres'
            });
        }

        if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
            return res.status(400).json({
                error: 'El ID del usuario debe ser un entero positivo'
            });
        }

        const nuevaPartida = {
            nombre: nombre.trim(),
            idUsuario
        };

        const partidaCreada = await partidaService.crearPartida(nuevaPartida);

        if (!partidaCreada) {
            return res.status(404).json({
                error: 'El usuario indicado no existe'
            });
        }

        return res.status(201).json(partidaCreada);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al crear la partida'
        });
    }
}

module.exports = {
    obtenerPartidas,
    obtenerPartidaPorId,
    obtenerPartidasPorUsuario,
    crearPartida
};

