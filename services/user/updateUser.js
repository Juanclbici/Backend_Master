const UserModel = require("../../models/User");
const bcrypt = require('bcrypt');
const { status } = require("http-status");

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ where: { id } });

    if (!user) {
      return res.status(status.NOT_FOUND).json({ error: "Usuario no encontrado." });
    }
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({ mensaje: "Usuario actualizado", user });
  } catch (exception) {
    return res.status(500).json({ error: exception.message });
  }
};

module.exports = updateUser;
