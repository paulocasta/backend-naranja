const db = require('../db');

// GET: Listar partido
exports.obtenerpartido = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.id, p.fecha, p.goles_equipo, p.goles_rival, r.nombre as rival, t.anio, t.tipo
      FROM partido p
      JOIN rival r on r.id = p.rival_id 
      JOIN torneo t on t.id = p.torneo_id 
      ORDER BY fecha DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener partido' });
  }
};

// GET: Listar partido x torneo
exports.obtenerpartidoPorTorneo = async (req, res) => {
    const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT p.id, p.fecha, p.goles_equipo, p.goles_rival, r.nombre as rival, t.anio, t.tipo
      FROM partido p
      JOIN rival r on r.id = p.rival_id 
      JOIN torneo t on t.id = p.torneo_id 
      WHERE p.torneo_id = ?
      ORDER BY fecha DESC
    `, [id]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener partido' });
  }
};

// POST: Crear un nuevo partido
exports.crearPartido = async (req, res) => {
  const { fecha, goles_equipo, goles_rival, torneo_id, rival_id } = req.body;

  if (!torneo_id || !rival_id || !fecha) {
    return res.status(400).json({ error: 'Rival, Torneo o fecha son obligatorios' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO partido (fecha, goles_equipo, goles_rival, torneo_id, rival_id) VALUES (?, ?, ?, ?, ?)`,
      [fecha, goles_equipo || 0, goles_rival || 0, torneo_id, rival_id]
    );
    res.status(201).json({ id: result.insertId, fecha, goles_equipo, goles_rival, torneo_id, rival_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear partido' });
  }
};

// GET: Listar partido por anio
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

// GET: Listar partido por torneo
exports.totalPartidosPorTorneo = async (req, res) => {
  const { torneoId } = req.params;
  try {
    const [row] = await db.query(`SELECT COUNT(p.id) as total from partido p where p.torneo_id = ?`, [torneoId]);
    res.json(row[0].total);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener total partidos' });
  }
};

// GET: Listar torneos
exports.torneos = async (req, res) => {
    try {
    const [result] = await db.query('SELECT t.* FROM torneo t order by t.anio desc');
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener total anios' });
  }
}

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
