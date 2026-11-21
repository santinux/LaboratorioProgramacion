// TODO Convertir a ES6
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.obtenerProductos);

router.get('/negocio/:idNegocio', productosController.obtenerProductosPorNegocio);

router.get('/:id', productosController.obtenerProductoPorId);

router.post('/', productosController.crearProducto);

router.put('/:id', productosController.actualizarProducto);

module.exports = router;
