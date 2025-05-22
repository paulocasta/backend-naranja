const express = require('express');
const router = express.Router();
const lavadosController = require('../controllers/lavadosController');

router.get('/', lavadosController.historialLavados);
router.post('/', lavadosController.registrarLavado);

module.exports = router;