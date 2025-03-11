const authRoutes = require('./api/auth');
const protectedRoutes = require('./private');

module.exports = {
    unprotectedRoutes: authRoutes,  //rutas no protegidas
    protectedRoutes: protectedRoutes  
};
