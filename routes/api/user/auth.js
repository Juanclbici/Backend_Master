const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/user/userController');
const authController = require('../../../controllers/user/authController');
const authMiddleware = require('../../../services/middlewares/authMiddleware');

// Rutas públicas
router.post('/user/register', userController.createUser);
router.post('/user/login', authController.login);

// Rutas protegidas
router.get("/user/getAll", authMiddleware, userController.getAllUsers);
router.get("/user/get/:id", authMiddleware, userController.getUser);
router.put("/user/update/:id", authMiddleware, userController.updateUser);
router.delete("/user/delete/:id", authMiddleware, userController.deleteUser);

module.exports = router;