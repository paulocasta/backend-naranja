const db = require('../db');

// 🥇 Goleadores
exports.rankingGoleadores = async (req, res) => {
  const { anio } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT j.id, j.nombre, j.apellido, SUM(e.goles) AS goles
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      LEFT JOIN partido p ON p.id = e.partido_id
      WHERE p.fecha like ?
      GROUP BY j.id
      ORDER BY goles DESC
      LIMIT 10
    `,[anio+'%']);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ranking de goleadores' });
  }
};

// 🎯 Asistidores
exports.rankingAsistidores = async (req, res) => {
  const { anio } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT j.id, j.nombre, j.apellido, SUM(e.asistencias) AS asistencias
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      LEFT JOIN partido p ON p.id = e.partido_id
      WHERE p.fecha like ?
      GROUP BY j.id
      ORDER BY asistencias DESC
      LIMIT 10
    `,[anio+'%']);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ranking de asistencias' });
  }
};

// 🚨 Tarjetas
exports.rankingTarjetas = async (req, res) => {
  const { anio } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT j.id, j.nombre, j.apellido, SUM(e.tarjetas) AS tarjetas
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      LEFT JOIN partido p ON p.id = e.partido_id
      WHERE p.fecha like ?
      GROUP BY j.id
      ORDER BY tarjetas DESC
      LIMIT 10
    `,[anio+'%']);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ranking de tarjetas' });
  }
};

// 🏟️ partido jugados
exports.rankingPartidos = async (req, res) => {
  const { anio } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT j.id, j.nombre, j.apellido, COUNT(e.partido_id) AS partidos
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      LEFT JOIN partido p ON p.id = e.partido_id
      WHERE p.fecha like ?
      GROUP BY j.id
      ORDER BY partidos DESC
      LIMIT 10
    `,[anio+'%']);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ranking de partidos' });
  }
};

// 🔶 Tarjetas amarillas
exports.rankingAmarillas = async (req, res) => {
  const { anio } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT j.id, j.nombre, j.apellido, SUM(e.tarjetas_amarillas) AS amarillas
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      LEFT JOIN partido p ON p.id = e.partido_id
      WHERE p.fecha like ?
      GROUP BY j.id
      ORDER BY amarillas DESC
      LIMIT 10
    `,[anio+'%']);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ranking de amarillas' });
  }
};

// 🔴 Tarjetas rojas
exports.rankingRojas = async (req, res) => {
  const { anio } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT j.id, j.nombre, j.apellido, SUM(e.tarjetas_rojas) AS rojas
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      LEFT JOIN partido p ON p.id = e.partido_id
      WHERE p.fecha like ?
      GROUP BY j.id
      ORDER BY rojas DESC
      LIMIT 10
    `,[anio+'%']);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ranking de rojas' });
  }
};

// 🥇 Top Goleadores
exports.top3 = async (req, res) => {
  const { anio } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT j.id, j.nombre, j.apellido, SUM(e.goles) AS total_goles, COUNT(e.partido_id) AS partidos_jugados, j.numero, j.foto_url
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      LEFT JOIN partido p ON p.id = e.partido_id
      WHERE p.fecha like ?
      GROUP BY j.id
      ORDER BY total_goles DESC
      LIMIT 3
    `,[anio+'%']);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ranking de goleadores' });
  }
};

// 🧤 Top Arqueros
exports.rankigsArqueros = async (req, res) => {
  const { anio } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT j.id, j.nombre, j.apellido, SUM(p.goles_rival) AS goles
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      JOIN partido p ON p.id = e.partido_id
      WHERE p.fecha like ?
      AND e.atajo = true
      GROUP BY j.id, j.nombre, j.apellido
      ORDER BY goles ASC
      LIMIT 10
    `,[anio+'%']);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ranking de goleadores' });
  }
};