const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticasController');

router.get('/jugador/:id', estadisticasController.historialJugador);
router.post('/', estadisticasController.registrarEstadistica);
router.get('/partido/:id/detalles', estadisticasController.detallesPorPartido);
router.get('/partido/:id/goleadores', estadisticasController.goleadoresPorPartido);

module.exports = router;
