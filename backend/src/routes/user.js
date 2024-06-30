import express from "express";
import { userController } from "@/controllers/user";

const user = express.Router();

user.get("/", userController.getAllUsers);

user.get("/:id", userController.getUserById);

user.patch("/:id", userController.updateUser);

user.delete("/:id", userController.deleteUser);

export default user;
