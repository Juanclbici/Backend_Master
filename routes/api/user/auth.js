const express = require('express');
const router = express.Router(); 
const userController = require('../../../controllers/user/userController');
const authController = require('../../../controllers/user/authController');
const authMiddleware = require('../../../services/middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuarios
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/user/register', userController.createUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token generado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/user/login', authController.login);


/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
 */
router.get("/user/getAll", authMiddleware, userController.getAllUsers);

/**
 * @swagger
 * /user/get/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/user/get/:id", authMiddleware, userController.getUser);

/**
 * @swagger
 * /user/update/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.put("/user/update/:id", authMiddleware, userController.updateUser);

/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/user/delete/:id", authMiddleware, userController.deleteUser);

// Definición de esquemas (al final del archivo o en swagger.js)

// Rutas protegidas
/*
router.get("/user/getAll", authMiddleware, userController.getAllUsers);
router.get("/user/get/:id", authMiddleware, userController.getUser);
router.put("/user/update/:id", authMiddleware, userController.updateUser);
router.delete("/user/delete/:id", authMiddleware, userController.deleteUser);*/

module.exports = router; 