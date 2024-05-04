import express from "express";
import { userController } from "@/controllers/user";
import validateData from "@/middlewares/validate";
import { registrationSchema } from "@/validations/auth";

const user = express.Router();

user.get("/", userController.getAllUsers);

user.get("/:id", userController.getUserById);

user.put("/:id", validateData(registrationSchema), userController.updateUser);

user.delete("/:id", userController.deleteUser);

export default user;
