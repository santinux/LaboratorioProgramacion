// TODO Convertir a ES6
const fs = require('fs').promises;
const path = require('path');

const rutaArchivo = path.join(__dirname, '../data/productos.json');

// Leer todos los productos
async function leerProductos() {
    const contenido = await fs.readFile(rutaArchivo, 'utf-8');
    const productos = JSON.parse(contenido);

    if (!Array.isArray(productos)) {
        throw new Error('El archivo de productos tiene un formato inválido');
    }

    return productos;
}

// Guardar productos
async function guardarProductos(productos) {
    await fs.writeFile(
        rutaArchivo,
        JSON.stringify(productos, null, 2),
        'utf-8'
    );
}

// GET: obtener productos paginados
async function obtenerProductos(cantidad, from) {
    const productos = await leerProductos();

    return productos.slice(from, from + cantidad);
}

// GET: obtener producto por ID
async function obtenerProductoPorId(id) {
    const productos = await leerProductos();

    return productos.find(producto => producto.id === id) || null;
}

// POST: crear producto
async function crearProducto(nuevoProducto) {
    const productos = await leerProductos();

    const nuevoId = productos.reduce(
        (max, producto) => Math.max(max, producto.id),
        0
    ) + 1;

    const producto = {
        id: nuevoId,
        ...nuevoProducto
    };

    productos.push(producto);

    await guardarProductos(productos);

    return producto;
}

// PUT: actualizar producto
async function actualizarProducto(id, datosActualizados) {
    const productos = await leerProductos();

    const indice = productos.findIndex(producto => producto.id === id);

    if (indice === -1) {
        return null;
    }

    productos[indice] = {
        ...productos[indice],
        ...datosActualizados
    };

    await guardarProductos(productos);

    return productos[indice];
}

// GET: obtener productos de un negocio
async function obtenerProductosPorNegocio(idNegocio) {
    const productos = await leerProductos();

    return productos.filter(
        producto => producto.idNegocio === idNegocio
    );
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    obtenerProductosPorNegocio
};
