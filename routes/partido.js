const express = require('express');
const router = express.Router();
const partidoController = require('../controllers/partidoController');

router.get('/', partidoController.obtenerpartido);
router.get('/totalPartidos', partidoController.totalPartidos);
router.post('/', partidoController.crearPartido);

module.exports = router;
