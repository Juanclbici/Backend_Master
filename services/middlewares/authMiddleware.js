const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // El token viene en los headers

    if (!token) {
        return res.status(401).json({ error: "Acceso denegado, token requerido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta_segura');
        req.user = decoded; // Guardamos los datos del usuario en req.user
        next(); // Continúa con la siguiente función en la ruta
    } catch (err) {
        return res.status(403).json({ error: "Token inválido o expirado" });
    }
};

module.exports = authMiddleware;
