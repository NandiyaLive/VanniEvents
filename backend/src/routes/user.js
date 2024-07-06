import express from "express";
import { userController } from "@/controllers/user";
import { superAdminProtect } from "@/middlewares/auth";

const user = express.Router();

user.get("/", userController.getAllUsers);

user.get("/:id", userController.getUserById);

user.patch("/:id", superAdminProtect, userController.updateUser);

user.delete("/:id", userController.deleteUser);

user.post("/:id/change-password", userController.changePassword);

export default user;
