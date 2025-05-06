const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticasController');

router.get('/jugador/:id', estadisticasController.historialJugador);
router.post('/', estadisticasController.registrarEstadistica);

module.exports = router;
