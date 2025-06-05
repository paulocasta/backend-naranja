const express = require('express');
const router = express.Router();
const partidoController = require('../controllers/partidoController');

router.get('/', partidoController.obtenerpartido);
router.get('/totalPartidos/:id', partidoController.totalPartidos);
router.post('/', partidoController.crearPartido);
router.get('/totalAnios', partidoController.totalAnios); 

module.exports = router;
