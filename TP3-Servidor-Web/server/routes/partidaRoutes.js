
const express = require('express');
const router = express.Router();

const partidaController = require('../controllers/partidaController');

router.get('/', partidaController.obtenerPartidas);
router.get('/usuario/:idUsuario', partidaController.obtenerPartidasPorUsuario);
router.get('/:id', partidaController.obtenerPartidaPorId);
router.post('/', partidaController.crearPartida);

module.exports = router;