const express = require('express');
const router = express.Router();
const rankingsController = require('../controllers/rankingsController');

router.get('/goleadores', rankingsController.rankingGoleadores);
router.get('/asistencias', rankingsController.rankingAsistidores);
router.get('/tarjetas', rankingsController.rankingTarjetas);
router.get('/partidos', rankingsController.rankingPartidos);
router.get('/amarillas', rankingsController.rankingAmarillas);
router.get('/rojas', rankingsController.rankingRojas);
router.get('/top3', rankingsController.top3);

module.exports = router;
