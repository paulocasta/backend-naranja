const db = require('../db');

exports.registrarLavado = async (req, res) => {
  const {
    jugador_id,
    fecha
  } = req.body;

  if (!jugador_id || !fecha) {
    return res.status(400).json({ error: 'jugador_id y fecha son obligatorios' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO lavado_camisetas 
        (jugador_id, fecha)
       VALUES (?, ?)`,
      [
        jugador_id,
        fecha
      ]
    );
    res.status(201).json({ message: 'Camiseta registrada', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar camiseta' });
  }
};

exports.historialLavados = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
        SELECT j.nombre , j.apellido, lc.fecha 
        FROM lavado_camisetas lc
        JOIN jugador j ON j.id = lc.jugador_id
        ORDER BY lc.fecha ASC
    `, [id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener historial del jugador' });
  }
};
