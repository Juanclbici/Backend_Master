const UserModel = require('../../models/User');
const bcrypt = require('bcrypt');
const { status } = require('http-status');

const getAllUsers = async () => {
  return await UserModel.findAll();
};

const getUserById = async (id) => {
  const user = await UserModel.findOne({ where: { id } });
  if (!user) throw new Error("Usuario no encontrado.");
  return user;
};

const createUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("Todos los campos son obligatorios.");
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  return await UserModel.create({ name, email, password: hashedPassword });
};

const updateUser = async (id, { name, email, password }) => {
  const user = await UserModel.findOne({ where: { id } });
  if (!user) throw new Error("Usuario no encontrado.");

  let hashedPassword = user.password;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.password = hashedPassword;

  await user.save();
  return user;
};

const deleteUser = async (id) => {
  const user = await UserModel.findOne({ where: { id } });
  if (!user) throw new Error("Usuario no encontrado.");
  await user.destroy();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};