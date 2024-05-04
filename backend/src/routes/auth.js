import { authController } from "@/controllers/auth";
import validateData from "@/middlewares/validate";
import { loginSchema, registrationSchema } from "@/validations/auth";
import express from "express";

const auth = express.Router();

auth.post(
  "/register",
  validateData(registrationSchema),
  authController.register
);

auth.post("/login", validateData(loginSchema), authController.login);

export default auth;
