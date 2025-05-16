const db = require('../db');

// 🥇 Goleadores
exports.rankingGoleadores = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT j.id, j.nombre, j.apellido, SUM(e.goles) AS total_goleadores
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      GROUP BY j.id
      ORDER BY total_goleadores DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ranking de goleadores' });
  }
};

// 🎯 Asistidores
exports.rankingAsistidores = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT j.id, j.nombre, j.apellido, SUM(e.asistencias) AS total_asistencias
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      GROUP BY j.id
      ORDER BY total_asistencias DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ranking de asistencias' });
  }
};

// 🚨 Tarjetas
exports.rankingTarjetas = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT j.id, j.nombre, j.apellido, SUM(e.tarjetas) AS total_tarjetas
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      GROUP BY j.id
      ORDER BY total_tarjetas DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ranking de tarjetas' });
  }
};

// 🏟️ partido jugados
exports.rankingPartidos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT j.id, j.nombre, j.apellido, COUNT(e.partido_id) AS total_partidos
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      GROUP BY j.id
      ORDER BY total_partidos DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ranking de partidos' });
  }
};

// 🔶 Tarjetas amarillas
exports.rankingAmarillas = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT j.id, j.nombre, j.apellido, SUM(e.tarjetas_amarillas) AS total_amarillas
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      GROUP BY j.id
      ORDER BY total_amarillas DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ranking de amarillas' });
  }
};

// 🔴 Tarjetas rojas
exports.rankingRojas = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT j.id, j.nombre, j.apellido, SUM(e.tarjetas_rojas) AS total_rojas
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      GROUP BY j.id
      ORDER BY total_rojas DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ranking de rojas' });
  }
};

// 🥇 Top Goleadores
exports.top3 = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT j.id, j.nombre, j.apellido, SUM(e.goles) AS total_goles, COUNT(e.partido_id) AS partidos_jugados, j.numero, j.foto_url
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      GROUP BY j.id
      ORDER BY total_goles DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ranking de goleadores' });
  }
};