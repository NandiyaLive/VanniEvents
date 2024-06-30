import { authenticate } from "@/middlewares/auth";
import Status from "@/models/status";
import express from "express";
import mongoose from "mongoose";

import authRoutes from "./auth";
import clubRoutes from "./club";
import eventRoutes from "./event";
import ticketRoutes from "./ticket";
import userRoutes from "./user";

const router = express.Router();

router.get("/", (req, res) => {
  const uptime = Math.round(process.uptime()) + "s";
  Status.create({
    status: mongoose.connection.readyState === 1 ? "UP" : "DOWN",
  });

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
router.use("/clubs", clubRoutes);
router.use("/events", eventRoutes);
router.use("/tickets", ticketRoutes);

export default router;
