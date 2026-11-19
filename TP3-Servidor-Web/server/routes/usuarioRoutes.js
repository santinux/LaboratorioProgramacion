
const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id', usuarioController.obtenerUsuarioPorId);
router.post('/', usuarioController.crearUsuario);
router.post('/login', usuarioController.iniciarSesion);
router.put('/:id', usuarioController.actualizarUsuario);

module.exports = router;

