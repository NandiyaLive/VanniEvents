import express from "express";
import { userController } from "@/controllers/user";
import { validateUserRoles } from "@/middlewares/auth";

const user = express.Router();

user.get("/", validateUserRoles(["superadmin"]), userController.getAllUsers);

user.get("/:id", userController.getUserById);

user.patch("/:id", userController.updateUser);

user.delete("/:id", userController.deleteUser);

user.post("/:id/change-password", userController.changePassword);

export default user;
