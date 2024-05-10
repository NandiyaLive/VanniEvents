import { eventController } from "@/controllers/event";
import { authenticate, clubAdminProtect } from "@/middlewares/auth";

import express from "express";

const event = express.Router();

event.get("/", eventController.getEvents);
event.post("/", clubAdminProtect, eventController.createEvent);
event.get("/:id", eventController.getEventById);
event.patch("/:id", clubAdminProtect, eventController.updateEvent);
event.delete("/:id", clubAdminProtect, eventController.deleteEvent);
event.post("/:id/attendees", authenticate, eventController.addAttendee);
event.get("/:id/attendees", clubAdminProtect, eventController.getAttendees);
event.delete(
  "/:id/attendees/:userId",
  clubAdminProtect,
  eventController.removeAttendee
);

export default event;
