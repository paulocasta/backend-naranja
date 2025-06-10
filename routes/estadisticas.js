const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticasController');

router.get('/jugador/:id', estadisticasController.historialJugador);
router.post('/', estadisticasController.registrarEstadistica);
router.get('/partido/:id/detalles', estadisticasController.detallesPorPartido);
router.get('/partido/:id/goleadores', estadisticasController.goleadoresPorPartido);
router.get('/partido/:id', estadisticasController.estadisticasPorPartido);
router.put('/:id', estadisticasController.actualizarEstadistica);
router.delete('/:id', estadisticasController.eliminarEstadistica);
router.get('/jugador/partido/:id', estadisticasController.estadisticasJugadoresPartido);
router.get('/jugadores/:anio', estadisticasController.obtenerEstadisticasPorAnio);

module.exports = router;
