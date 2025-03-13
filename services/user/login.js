const UserModel = require('../../models/User'); 
const bcrypt = require('bcrypt');
const { status } = require('http-status');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'clave_secreta_segura',
        { expiresIn: '2h' }
      );
  
      return res.status(200).json({ message: "Inicio de sesión exitoso", token });
  
    } catch (exception) {
      return res.status(500).json({ error: exception.message });
    }
  };
  
  module.exports = { loginUser };
  