const UserModel = require("../models/User");
const { status } = require("http-status");

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne({ where: { id } });

    if (!user) {
      return res.status(status.NOT_FOUND).json({ error: "Usuario no encontrado." });
    }

    return res.status(200).json(user);
  } catch (exception) {
    return res.status(500).json({ error: exception.message });
  }
};

module.exports = getUserById;
