const UserModel = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (email, password) => {
  const user = await UserModel.findOne({ where: { email } });
  if (!user) throw new Error("Usuario no encontrado");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Contraseña incorrecta");

  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'clave_secreta_segura',
    { expiresIn: '2h' }
  );
};

module.exports = {
  loginUser
};