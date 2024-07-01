import User from "@/models/user";
import { hashPassword } from "./auth";

const getAllUsers = async (role) => {
  let users = [];

  if (role) {
    users = await User.find({
      role,
    });
  } else {
    users = await User.find();
  }

  users.map((user) => {
    user.password = undefined;
  });

  return users;
};

const getUserById = async (id) => {
  const user = await User.findById(id);

  if (user) {
    user.password = undefined;
  } else {
    throw new Error("User not found");
  }

  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });

  if (user) {
    user.password = undefined;
  } else {
    throw new Error("User not found");
  }

  return user;
};

const updateUser = async (id, payload, user) => {
  if (payload.role === "superadmin" && user.role !== "superadmin") {
    throw new Error("You are not permitted to assign this role");
  }

  if (payload.role === "admin" && user.role !== "superadmin") {
    throw new Error("You are not permitted to assign this role");
  }

  if (payload.password) {
    const { password } = payload;

    const hash = hashPassword(password);

    payload.password = hash;
  }

  return await User.findByIdAndUpdate(id, payload, { new: true });
};

const changePassword = async (id, password) => {
  const hash = hashPassword(password);

  return await User.findByIdAndUpdate(id, { password: hash }, { new: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

const checkUserRole = async (userId, role) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user.role === role;
};

export const userService = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  changePassword,
  checkUserRole,
};
