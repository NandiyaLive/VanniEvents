import User from "@/models/user";

const getAllUsers = async () => {
  return await User.find();
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const updateUser = async (id, payload, user) => {
  if (payload.role === "superadmin" && user.role !== "superadmin") {
    throw new Error("You are not permitted to assign this role");
  }

  if (payload.role === "admin" && user.role !== "superadmin") {
    throw new Error("You are not permitted to assign this role");
  }

  return await User.findByIdAndUpdate(id, payload, { new: true });
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
  checkUserRole,
};
