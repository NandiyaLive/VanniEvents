import { authenticate, superAdminProtect } from "@/middlewares/auth";
import express from "express";

import authRoutes from "./auth";
import userRoutes from "./user";
import clubRoutes from "./club";
import eventRoutes from "./event";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res) => {
  const uptime = Math.round(process.uptime()) + "s";

  res.json({
    message: "Welcome to VanniEvents API",
    version: "1.0.0",
    status: "UP",
    uptime,
    mongodb: {
      status: mongoose.connection.readyState === 1 ? "UP" : "DOWN",
    },
  });
});

router.use("/auth", authRoutes);
router.use("/users", authenticate, userRoutes);
router.use("/clubs", authenticate, superAdminProtect, clubRoutes);
router.use("/events", eventRoutes);

export default router;
