require('dotenv').config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Simulamos un token simple
        return res.json({ token: 'admin-token' });
    }

    res.status(401).json({ error: 'Credenciales inválidas' });
};
