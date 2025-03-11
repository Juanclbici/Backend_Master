const UserModel = require('../models/User');
const { status } = require('http-status');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(status.BAD_REQUEST).json({ error: "Todos los campos son obligatorios." });
    }

    const newUser = await UserModel.create({ name, email, password });

    return res.status(201).json({
      message: "Usuario creado correctamente",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (exception) {
    return res.status(500).json({ error: exception.message });
  }
};

module.exports = { createUser };
