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

const authMiddleware = require('../../../services/middlewares/authMiddleware');

// Ruta para registrar usuario (ejemplo original)
router.post('/user/register2',auth.register);

// Ruta para registrar un nuevo usuario
router.post('/user/register', createUser.createUser);

// Ruta para iniciar sesión (acceso público)
router.post("/user/login", loginUser);


// Rutas protegidas con middleware de autenticacion

// Ruta para obtener todos los usuarios
router.get("/user/getAll", authMiddleware, getUsers);

// Ruta para obtener un usuario por ID
router.get("/user/get/:id", authMiddleware, getUserById);

// Ruta para actualizar un usuario
router.put("/user/update/:id", authMiddleware, updateUser);

// Ruta para eliminar un usuario
router.delete("/user/delete/:id", authMiddleware, deleteUser);

module.exports = router;
