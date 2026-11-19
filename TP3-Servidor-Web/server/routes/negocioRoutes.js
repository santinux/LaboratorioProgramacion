
const express = require('express');
const router = express.Router();

const negocioController = require('../controllers/negocioController');

router.get('/', negocioController.obtenerNegocios);
router.get('/:id', negocioController.obtenerNegocioPorId);
router.post('/', negocioController.crearNegocio);
router.put('/:id', negocioController.actualizarNegocio);

module.exports = router;
