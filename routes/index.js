const authRoutes = require('./api/user/auth');
const protectedRoutes = require('./private');

module.exports = {
    unprotectedRoutes: authRoutes,  //rutas no protegidas
    protectedRoutes: protectedRoutes  
};
