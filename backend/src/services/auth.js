import User from "@/models/user.js";
import { JWT_SECRET, SALT_ROUNDS } from "@/utils/config.js";
import { genSaltSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (payload) => {
  const { password } = payload;

  const salt = genSaltSync(SALT_ROUNDS);
  const hash = hashSync(password, salt);

  return await User.create({ ...payload, password: hash });
};

const login = async (payload) => {
  const { email } = payload;

  const user = await User.findOne({
    email,
  });

  return user;
};

const generateToken = async (user) => {
  const { _id, email } = user;

  return jwt.sign({ userId: _id, email }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const authService = {
  register,
  login,
  generateToken,
};
