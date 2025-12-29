const db = require('../db');

//
exports.obtenerRivales = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT r.id, r.nombre FROM rival r
      JOIN rival_torneo rt on rt.rival_id = r.id
      WHERE rt.torneo_id = ?
    `, [id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener rivales' });
  }
};

exports.registrarRival = async (req, res) => {
  const {
    nombre
  } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'nombre es obligatorio' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO rival 
        (nombre)
       VALUES (?)`,
      [
        nombre
      ]
    );
    res.status(201).json({ message: 'Rival registrado', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar rival' });
  }
};

exports.registrarRivalTorneo = async (req, res) => {
  const {
    rival_id,
    torneo_id
  } = req.body;

  if (!rival_id || !torneo_id)  {
    return res.status(400).json({ error: 'torneo y rival son obligatorios' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO rival_torneo 
        (rival_id, torneo_id)
       VALUES (?,?)`,
      [
        rival_id,torneo_id
      ]
    );
    res.status(201).json({ message: 'Rival registrado', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar rival' });
  }
};