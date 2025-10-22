const express = require('express');
const router = express.Router();
const torneosController = require('../controllers/torneosController');

router.get('/:id', torneosController.obtenerTorneo);
router.get('/', torneosController.obtenerTorneos);

module.exports = router;