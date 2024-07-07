import { eventController } from "@/controllers/event";
import { validateToken, validateClubAdmin } from "@/middlewares/auth";
import validateData from "@/middlewares/validate";
import { eventSchema } from "@/validations/event";

import express from "express";

const event = express.Router();

event.get("/", eventController.getEvents);

event.get("/:id", eventController.getEventById);

event.post(
  "/",
  validateToken,
  validateClubAdmin,
  validateData(eventSchema),
  eventController.createEvent
);

event.patch(
  "/:id",
  validateToken,
  validateClubAdmin,
  eventController.updateEvent
);

event.delete(
  "/:id",
  validateToken,
  validateClubAdmin,
  eventController.deleteEvent
);

export default event;
