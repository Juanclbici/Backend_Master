const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ error: "Acceso denegado, token requerido" });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta_segura');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Token inválido o expirado" });
    }
};

module.exports = authMiddleware;
