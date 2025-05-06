// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const jugadorRoutes = require('./routes/jugador');
const partidoRoutes = require('./routes/partido');
const estadisticasRoutes = require('./routes/estadisticas');
const rankingsRoutes = require('./routes/rankings');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/jugador', jugadorRoutes);
app.use('/api/partido', partidoRoutes);
app.use('/api/estadisticas', estadisticasRoutes);
app.use('/api/rankings', rankingsRoutes);
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});