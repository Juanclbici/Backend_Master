const express = require('express');
const sequelize = require('./config/databases');
const routes = require('./routes'); 
require('dotenv').config();
const setupSwagger = require('./config/swagger');

const app = express();
const limiter = require('./services/middlewares/rateLimit'); 
const PORT = process.env.PORT || 3000;

app.use(limiter);
app.use(express.json());
setupSwagger(app);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
  console.log('Documentación Swagger en http://localhost:3000/api-docs');
});

// Sincronizar la base de datos
sequelize.sync()
    .then(() => console.log("DB is ready"))
    .catch(err => console.error(err));

// Usar las rutas
app.use('/api/users', routes.unprotectedRoutes);  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(routes.unprotectedRoutes);




