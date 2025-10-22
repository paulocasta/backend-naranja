const express = require('express');
const router = express.Router();
const partidoController = require('../controllers/partidoController');

router.get('/', partidoController.obtenerpartido);
router.get('/torneo/:id', partidoController.obtenerpartidoPorTorneo);
router.get('/totalPartidos/:id', partidoController.totalPartidos);
router.get('/totalPartidos/torneo/:torneoId', partidoController.totalPartidosPorTorneo);
router.post('/', partidoController.crearPartido);
router.get('/totalAnios', partidoController.totalAnios); 
router.get('/torneos', partidoController.torneos); 

module.exports = router;
