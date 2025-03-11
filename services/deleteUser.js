const UserModel = require("../models/User");
const { status } = require("http-status");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne({ where: { id } });

    if (!user) {
      return res.status(status.NOT_FOUND).json({ error: "Usuario no encontrado." });
    }

    await user.destroy();

    return res.status(200).json({ mensaje: "Usuario eliminado exitosamente." });
  } catch (exception) {
    return res.status(500).json({ error: exception.message });
  }
};

module.exports = deleteUser;
