const db = require('../db');

//
exports.obtenerTorneo = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT t.id, t.anio, t.tipo FROM torneo t
      WHERE t.id = ?
    `,[id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener torneo con id', id });
  }
};


//
exports.obtenerTorneos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT t.id, t.anio, t.tipo FROM torneo t order by t.anio desc
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener todos los torneos' });
  }
};