// routes/jugador.js
const express = require('express');
const router = express.Router();
const jugadorController = require('../controllers/jugadorController');

router.get('/', jugadorController.obtenerjugadores);
router.post('/', jugadorController.crearJugador);
router.get('/:id/estadisticas/:anio', jugadorController.obtenerEstadisticasJugadorPorAnio);

module.exports = router;