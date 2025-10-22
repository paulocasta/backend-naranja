const db = require('../db');

//
exports.obtenerRivales = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.id, r.nombre FROM rival r
    `);
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
