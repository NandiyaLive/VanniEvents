import { authenticate } from "@/middlewares/auth";

import express from "express";

import authRoutes from "./auth";
import userRoutes from "./user";

const router = express.Router();

router.get("/", (req, res) => {
  const uptime = Math.round(process.uptime()) + "s";

  res.json({
    message: "Welcome to VanniEvents API",
    version: "1.0.0",
    status: "UP",
    uptime,
  });
});

router.use("/auth", authRoutes);
router.use("/users", authenticate, userRoutes);

export default router;
