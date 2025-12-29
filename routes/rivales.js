const express = require('express');
const router = express.Router();
const rivalesController = require('../controllers/rivalesController');

router.get('/torneo/:id', rivalesController.obtenerRivales);
router.post('/', rivalesController.registrarRival);
router.post('/torneo', rivalesController.registrarRivalTorneo);

module.exports = router;