const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máximo de solicitudes por IP en el tiempo definido
    message: { error: "Demasiadas solicitudes, intenta más tarde" }
});

module.exports = limiter;