const express = require('express');
const router = express.Router();
require('dotenv').config();


const createUser = require('../../../services/user/createUser'); 
const getUsers = require('../../../services/user/getUsers');
const getUserById = require('../../../services/user/getUserById');
const updateUser = require('../../../services/user/updateUser');
const deleteUser = require('../../../services/user/deleteUser');
const auth = require('../../../services/user/auth');

const { loginUser } = require("../../../services/user/login");

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

// Ruta para login
router.post("/user/login", loginUser);

module.exports = router;
