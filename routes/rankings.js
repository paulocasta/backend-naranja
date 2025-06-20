const express = require('express');
const router = express.Router();
const rankingsController = require('../controllers/rankingsController');

router.get('/goleadores/:anio', rankingsController.rankingGoleadores);
router.get('/asistencias/:anio', rankingsController.rankingAsistidores);
router.get('/tarjetas/:anio', rankingsController.rankingTarjetas);
router.get('/partidos/:anio', rankingsController.rankingPartidos);
router.get('/amarillas/:anio', rankingsController.rankingAmarillas);
router.get('/rojas/:anio', rankingsController.rankingRojas);
router.get('/top3/:anio', rankingsController.top3);
router.get('/arqueros/:anio', rankingsController.rankigsArqueros);

module.exports = router;
