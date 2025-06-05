const db = require('../db');

// GET: Listar partido
exports.obtenerpartido = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM partido ORDER BY fecha DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener partido' });
  }
};

// POST: Crear un nuevo partido
exports.crearPartido = async (req, res) => {
  const { rival, fecha, goles_equipo, goles_rival } = req.body;

  if (!rival || !fecha) {
    return res.status(400).json({ error: 'Rival y fecha son obligatorios' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO partido (rival, fecha, goles_equipo, goles_rival) VALUES (?, ?, ?, ?)`,
      [rival, fecha, goles_equipo || 0, goles_rival || 0]
    );
    res.status(201).json({ id: result.insertId, rival, fecha, goles_equipo, goles_rival });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear partido' });
  }
};

// GET: Listar partido
exports.totalPartidos = async (req, res) => {
  const { id } = req.params;
  try {
    const [row] = await db.query(`SELECT COUNT(p.id) as total from partido p where p.fecha like ?`, [id + '%']);
    res.json(row[0].total);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener total partidos' });
  }
};

// GET: Listar anios de partidos
exports.totalAnios = async (req, res) => {
    try {
    const [result] = await db.query('SELECT DISTINCT YEAR(p.fecha) as fecha FROM partido p');
    const años = result.map(r => r.fecha);
    res.json(años);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener total anios' });
  }
}
