import { eventController } from "@/controllers/event";
import { authenticate, clubAdminProtect } from "@/middlewares/auth";
import validateData from "@/middlewares/validate";
import { eventSchema } from "@/validations/event";

import express from "express";

const event = express.Router();

event.get("/", eventController.getEvents);
event.post(
  "/",
  authenticate,
  clubAdminProtect,
  validateData(eventSchema),
  eventController.createEvent
);
event.get("/:id", eventController.getEventById);
event.patch(
  "/:id",
  authenticate,
  clubAdminProtect,
  eventController.updateEvent
);
event.delete(
  "/:id",
  authenticate,
  clubAdminProtect,
  eventController.deleteEvent
);
event.post("/:id/attendees", authenticate, eventController.addAttendee);
event.get(
  "/:id/attendees",
  authenticate,
  clubAdminProtect,
  eventController.getAttendees
);
event.delete(
  "/:id/attendees/:userId",
  authenticate,
  clubAdminProtect,
  eventController.removeAttendee
);

export default event;
