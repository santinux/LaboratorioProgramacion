
const negocioService = require('../services/negocioService');

function cuerpoValido(cuerpo) {
    return cuerpo !== null &&
        typeof cuerpo === 'object' &&
        !Array.isArray(cuerpo);
}

/////////////////////////////// GET //////////////////////////////////

// Obtener negocios paginados
async function obtenerNegocios(req, res) {
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

        const negocios = await negocioService.obtenerNegocios(cantidad, from);

        return res.status(200).json(negocios);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al obtener los negocios'
        });
    }
}

// Obtener negocio por ID
async function obtenerNegocioPorId(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: 'El ID debe ser un entero positivo'
            });
        }

        const negocio = await negocioService.obtenerNegocioPorId(id);

        if (!negocio) {
            return res.status(404).json({
                error: 'Negocio no encontrado'
            });
        }

        return res.status(200).json(negocio);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al obtener el negocio'
        });
    }
}

/////////////////////////////// POST /////////////////////////////////

// Crear negocio
async function crearNegocio(req, res) {
    try {
        if (!cuerpoValido(req.body)) {
            return res.status(400).json({
                error: 'Debe enviar un objeto JSON válido'
            });
        }

        const { nombre, descripcion, imagen } = req.body;

        if (typeof nombre !== 'string' ||
            nombre.trim() === '' ||
            nombre.trim().length > 60) {
            return res.status(400).json({
                error: 'El nombre es obligatorio y debe tener como máximo 60 caracteres'
            });
        }

        if (typeof descripcion !== 'string' ||
            descripcion.trim() === '' ||
            descripcion.trim().length > 300) {
            return res.status(400).json({
                error: 'La descripción es obligatoria y debe tener como máximo 300 caracteres'
            });
        }

        if (imagen !== undefined &&
            (typeof imagen !== 'string' || imagen.trim() === '')) {
            return res.status(400).json({
                error: 'La imagen debe ser una ruta de texto no vacía'
            });
        }

        const nuevoNegocio = {
            nombre: nombre.trim(),
            descripcion: descripcion.trim()
        };

        if (imagen !== undefined) {
            nuevoNegocio.imagen = imagen.trim();
        }

        const negocioCreado = await negocioService.crearNegocio(nuevoNegocio);

        if (!negocioCreado) {
            return res.status(409).json({
                error: 'Ya existe un negocio con ese nombre'
            });
        }

        return res.status(201).json(negocioCreado);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al crear el negocio'
        });
    }
}

/////////////////////////////// PUT //////////////////////////////////

// Actualizar negocio
async function actualizarNegocio(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: 'El ID debe ser un entero positivo'
            });
        }

        if (!cuerpoValido(req.body)) {
            return res.status(400).json({
                error: 'Debe enviar un objeto JSON válido'
            });
        }

        const { nombre, descripcion, imagen } = req.body;

        if (nombre === undefined &&
            descripcion === undefined &&
            imagen === undefined) {
            return res.status(400).json({
                error: 'Debe enviar al menos un dato para actualizar'
            });
        }

        if (nombre !== undefined &&
            (typeof nombre !== 'string' ||
                nombre.trim() === '' ||
                nombre.trim().length > 60)) {
            return res.status(400).json({
                error: 'El nombre debe ser un texto no vacío de hasta 60 caracteres'
            });
        }

        if (descripcion !== undefined &&
            (typeof descripcion !== 'string' ||
                descripcion.trim() === '' ||
                descripcion.trim().length > 300)) {
            return res.status(400).json({
                error: 'La descripción debe ser un texto no vacío de hasta 300 caracteres'
            });
        }

        if (imagen !== undefined &&
            (typeof imagen !== 'string' || imagen.trim() === '')) {
            return res.status(400).json({
                error: 'La imagen debe ser una ruta de texto no vacía'
            });
        }

        const datosActualizados = {};

        if (nombre !== undefined) {
            datosActualizados.nombre = nombre.trim();
        }

        if (descripcion !== undefined) {
            datosActualizados.descripcion = descripcion.trim();
        }

        if (imagen !== undefined) {
            datosActualizados.imagen = imagen.trim();
        }

        const negocio = await negocioService.actualizarNegocio(
            id,
            datosActualizados
        );

        if (negocio === null) {
            return res.status(404).json({
                error: 'Negocio no encontrado'
            });
        }

        if (negocio === false) {
            return res.status(409).json({
                error: 'Ya existe otro negocio con ese nombre'
            });
        }

        return res.status(200).json(negocio);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al actualizar el negocio'
        });
    }
}

module.exports = {
    obtenerNegocios,
    obtenerNegocioPorId,
    crearNegocio,
    actualizarNegocio
};
