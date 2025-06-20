const db = require('../db');

exports.registrarEstadistica = async (req, res) => {
  const {
    jugador_id,
    partido_id,
    goles,
    asistencias,
    tarjetas_amarillas,
    tarjetas_rojas,
    asistio_partido,
    atajo
  } = req.body;

  if (!jugador_id || !partido_id) {
    return res.status(400).json({ error: 'jugador_id y partido_id son obligatorios' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO estadistica_partido 
        (jugador_id, partido_id, goles, asistencias, tarjetas_amarillas, tarjetas_rojas, asistio_partido, atajo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        jugador_id,
        partido_id,
        goles || 0,
        asistencias || 0,
        tarjetas_amarillas || 0,
        tarjetas_rojas || 0,
        asistio_partido || true,
        atajo || false
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

exports.goleadoresPorPartido = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT j.nombre, j.apellido, e.goles
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      WHERE e.partido_id = ? AND e.goles > 0
    `, [id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener goleadores' });
  }
};

exports.detallesPorPartido = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT j.nombre, j.apellido,
             e.goles, e.asistencias,
             e.tarjetas_amarillas, e.tarjetas_rojas
      FROM estadistica  _partido e
      JOIN jugador j ON e.jugador_id = j.id
      WHERE e.partido_id = ?
    `, [id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener detalles del partido' });
  }
};

exports.estadisticasPorPartido = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT e.id, e.jugador_id, j.nombre, j.apellido,
             e.goles, e.asistencias, e.tarjetas_amarillas, e.tarjetas_rojas,
             e.atajo, e.asistio_partido
      FROM estadistica_partido e
      JOIN jugador j ON e.jugador_id = j.id
      WHERE e.partido_id = ?
    `, [id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener estadísticas del partido' });
  }
};

exports.actualizarEstadistica = async (req, res) => {
  const { id } = req.params;
  const { goles, asistencias, tarjetas_amarillas, tarjetas_rojas, atajo } = req.body;

  try {
    await db.query(`
      UPDATE estadistica_partido
      SET goles = ?, asistencias = ?, tarjetas_amarillas = ?, tarjetas_rojas = ?, atajo = ?
      WHERE id = ?
    `, [goles, asistencias, tarjetas_amarillas, tarjetas_rojas, atajo, id]);

    res.json({ message: 'Estadística actualizada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
};

exports.eliminarEstadistica = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM estadistica_partido WHERE id = ?', [id]);
    res.json({ message: 'Estadística eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar estadística' });
  }
};

exports.estadisticasJugadoresPartido = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`SELECT j.* FROM jugador j
    WHERE NOT EXISTS (SELECT * FROM estadistica_partido ep where j.id = ep.jugador_id and ep.partido_id = ?)
    `, [id]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener jugador' });
  }
};

exports.obtenerEstadisticasPorAnio = async (req, res) => {
  const { anio } = req.params;

  try {
    const [rows] = await db.query(
      `
     SELECT 
          j.id,
          j.nombre,
          j.posicion_inicial,
          j.posicion_secundaria,
          j.foto_url,
          j.numero,
          COALESCE(SUM(e.goles), 0) AS goles,
          COALESCE(SUM(e.asistencias), 0) AS asistencias,
          COALESCE(SUM(e.tarjetas_amarillas), 0) AS tarjetas_amarillas,
          COALESCE(SUM(e.tarjetas_rojas), 0) AS tarjetas_rojas,
          COUNT(e.asistio_partido) AS partidos_jugados
        FROM jugador j
        LEFT JOIN estadistica_partido e ON j.id = e.jugador_id
        LEFT JOIN partido p ON p.id = e.partido_id 
        WHERE p.fecha like ?
        GROUP BY j.id
        ORDER BY j.numero 
      `,
      [anio+'%']
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas del jugador por anio' });
  }
};