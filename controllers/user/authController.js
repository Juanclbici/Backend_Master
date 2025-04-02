const authService = require('../../services/user/authService');

const login = async (req, res) => {
  try {
    const token = await authService.loginUser(req.body.email, req.body.password);
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  login
};