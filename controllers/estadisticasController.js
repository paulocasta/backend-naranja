const db = require('../db');

exports.registrarEstadistica = async (req, res) => {
  const {
    jugador_id,
    partido_id,
    goles,
    asistencias,
    tarjetas_amarillas,
    tarjetas_rojas
  } = req.body;

  if (!jugador_id || !partido_id) {
    return res.status(400).json({ error: 'jugador_id y partido_id son obligatorios' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO estadistica_partido 
        (jugador_id, partido_id, goles, asistencias, tarjetas_amarillas, tarjetas_rojas)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        jugador_id,
        partido_id,
        goles || 0,
        asistencias || 0,
        tarjetas_amarillas || 0,
        tarjetas_rojas || 0
      ]
    );
    res.status(201).json({ message: 'Estadística registrada', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar estadística' });
  }
};

exports.historialJugador = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT e.*, p.fecha, p.rival
      FROM estadistica_partido e
      JOIN partido p ON e.partido_id = p.id
      WHERE e.jugador_id = ?
      ORDER BY p.fecha DESC
    `, [id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener historial del jugador' });
  }
};
