// routes/jugador.js
const express = require('express');
const router = express.Router();
const jugadorController = require('../controllers/jugadorController');

router.get('/', jugadorController.obtenerjugador);
router.post('/', jugadorController.crearJugador);
router.get('/:id/estadisticas', jugadorController.obtenerEstadisticasJugador);

module.exports = router;