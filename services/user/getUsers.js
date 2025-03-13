const UserModel = require("../../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    return res.status(200).json(users);
  } catch (exception) {
    return res.status(500).json({ error: exception.message });
  }
};

module.exports = getUsers;
