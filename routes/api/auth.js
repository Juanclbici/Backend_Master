const express = require('express');
const router = express.Router();
require('dotenv').config();


const createUser = require('../../services/createUser'); 
const getUsers = require('../../services/getUsers');
const getUserById = require('../../services/getUserById');
const updateUser = require('../../services/updateUser');
const deleteUser = require('../../services/deleteUser');
const auth = require('../../services/auth');

// Ruta para registrar usuario (ejemplo original)
router.post('/user/register2',auth.register);

// Ruta para registrar un nuevo usuario
router.post('/user/register', createUser.createUser);

// Ruta para obtener todos los usuarios
router.get("/user/getAll", getUsers);

// Ruta para obtener un usuario por ID
router.get("/user/get/:id", getUserById);

// Ruta para actualizar un usuario
router.put("/user/update/:id", updateUser);

// Ruta para eliminar un usuario
router.delete("/user/delete/:id", deleteUser);

module.exports = router;
