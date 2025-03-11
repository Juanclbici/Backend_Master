const express = require('express');
const sequelize = require('./config/databases');
const routes = require('./routes');  
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

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




