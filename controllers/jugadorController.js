// controllers/jugadorController.js
const db = require('../db');

// GET: Obtener todos los jugador
exports.obtenerjugador = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM jugador');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener jugador' });
  }
};

// POST: Crear un nuevo jugador
exports.crearJugador = async (req, res) => {
  const {
    nombre,
    apellido,
    fecha_nacimiento,
    posicion_inicial,
    posicion_secundaria,
    numero,
    foto_url
  } = req.body;

  if (!nombre || !apellido || !fecha_nacimiento || !posicion_inicial || !posicion_secundaria  || !numero) {
    console.error('Faltan datos obligatorios', req.body);
    return res.status(400).json({ error: 'Nombre, apellido y número son obligatorios' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO jugador (
        nombre, apellido, fecha_nacimiento,
        posicion_inicial, posicion_secundaria,
        numero, foto_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre,
        apellido,
        fecha_nacimiento,
        posicion_inicial,
        posicion_secundaria,
        numero,
        foto_url || ''
      ]
    );

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear jugador' });
  }
};

exports.obtenerEstadisticasJugador = async (req, res) => {
  const { id } = req.params;

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
        WHERE j.id = ?
        GROUP BY j.id
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Jugador no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener estadísticas del jugador' });
  }
};
