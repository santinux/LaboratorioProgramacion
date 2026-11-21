// TODO Convertir a ES6
const productoService = require('../services/productosService');
const negocioService = require('../services/negocioService');

// GET: obtener productos paginados
async function obtenerProductos(req, res) {
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

        const productos = await productoService.obtenerProductos(cantidad, from);

        return res.status(200).json(productos);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al obtener los productos'
        });
    }
}

// GET: obtener un producto por ID
async function obtenerProductoPorId(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: 'El ID debe ser un entero positivo'
            });
        }

        const producto = await productoService.obtenerProductoPorId(id);

        if (!producto) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        return res.status(200).json(producto);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al obtener el producto'
        });
    }
}

// POST: crear un producto
async function crearProducto(req, res) {
    try {
        const cuerpo = req.body;

        if (cuerpo === null || typeof cuerpo !== 'object' || Array.isArray(cuerpo)) {
            return res.status(400).json({
                error: 'Debe enviar un objeto JSON válido'
            });
        }

        const { nombre, precio, idNegocio } = cuerpo;

        if (typeof nombre !== 'string' || nombre.trim() === '') {
            return res.status(400).json({
                error: 'El nombre es obligatorio y debe ser un texto'
            });
        }

        if (typeof precio !== 'number' || !Number.isFinite(precio) || precio <= 0) {
            return res.status(400).json({
                error: 'El precio debe ser un número válido mayor que cero'
            });
        }

        if (!Number.isInteger(idNegocio) || idNegocio <= 0) {
            return res.status(400).json({
                error: 'El ID del negocio debe ser un entero positivo'
            });
        }

        const negocio = await negocioService.obtenerNegocioPorId(idNegocio);

        if (!negocio) {
            return res.status(404).json({
                error: 'El negocio indicado no existe'
            });
        }

        const nuevoProducto = {
            nombre: nombre.trim(),
            precio,
            idNegocio
        };

        const productoCreado = await productoService.crearProducto(nuevoProducto);

        return res.status(201).json(productoCreado);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al crear el producto'
        });
    }
}

// PUT: actualizar un producto
async function actualizarProducto(req, res) {
    try {
        const id = Number(req.params.id);
        const cuerpo = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: 'El ID debe ser un entero positivo'
            });
        }

        if (cuerpo === null || typeof cuerpo !== 'object' || Array.isArray(cuerpo)) {
            return res.status(400).json({
                error: 'Debe enviar un objeto JSON válido'
            });
        }

        const { nombre, precio, idNegocio } = cuerpo;

        if (nombre === undefined &&
            precio === undefined &&
            idNegocio === undefined) {
            return res.status(400).json({
                error: 'Debe enviar al menos un dato para actualizar'
            });
        }

        if (nombre !== undefined &&
            (typeof nombre !== 'string' || nombre.trim() === '')) {
            return res.status(400).json({
                error: 'El nombre debe ser un texto no vacío'
            });
        }

        if (precio !== undefined &&
            (typeof precio !== 'number' || !Number.isFinite(precio) || precio <= 0)) {
            return res.status(400).json({
                error: 'El precio debe ser un número válido mayor que cero'
            });
        }

        if (idNegocio !== undefined) {
            if (!Number.isInteger(idNegocio) || idNegocio <= 0) {
                return res.status(400).json({
                    error: 'El ID del negocio debe ser un entero positivo'
                });
            }

            const negocio = await negocioService.obtenerNegocioPorId(idNegocio);

            if (!negocio) {
                return res.status(404).json({
                    error: 'El negocio indicado no existe'
                });
            }
        }

        const datosActualizados = {};

        if (nombre !== undefined) {
            datosActualizados.nombre = nombre.trim();
        }

        if (precio !== undefined) {
            datosActualizados.precio = precio;
        }

        if (idNegocio !== undefined) {
            datosActualizados.idNegocio = idNegocio;
        }

        const producto = await productoService.actualizarProducto(
            id,
            datosActualizados
        );

        if (!producto) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        return res.status(200).json(producto);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al actualizar el producto'
        });
    }
}

// GET: obtener productos de un negocio
async function obtenerProductosPorNegocio(req, res) {
    try {
        const idNegocio = Number(req.params.idNegocio);

        if (!Number.isInteger(idNegocio) || idNegocio <= 0) {
            return res.status(400).json({
                error: 'El ID del negocio debe ser un entero positivo'
            });
        }

        const negocio = await negocioService.obtenerNegocioPorId(idNegocio);

        if (!negocio) {
            return res.status(404).json({
                error: 'Negocio no encontrado'
            });
        }

        const productos = await productoService.obtenerProductosPorNegocio(idNegocio);

        return res.status(200).json(productos);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al obtener los productos del negocio'
        });
    }
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    obtenerProductosPorNegocio
};
