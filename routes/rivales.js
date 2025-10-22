const express = require('express');
const router = express.Router();
const rivalesController = require('../controllers/rivalesController');

router.get('/', rivalesController.obtenerRivales);
router.post('/', rivalesController.registrarRival);

module.exports = router;