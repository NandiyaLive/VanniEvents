import { userService } from "@/services/user";
import errorHandler from "@/utils/error-handler";

const getAllUsers = async (req, res) => {
  const { role } = req.query;

  try {
    const users = await userService.getAllUsers(role);
    res.status(200).json(users);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await userService.getUserByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const user = req.user;

  try {
    const updatedUser = await userService.updateUser(id, payload, user);
    delete updatedUser.password;

    res.status(200).json(updatedUser);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await userService.deleteUser(id);
    res.status(204).end();
  } catch (error) {
    errorHandler(error, res);
  }
};

export const userController = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
