import { clubController } from "@/controllers/club";
import {
  adminProtect,
  authenticate,
  clubAdminProtect,
  superAdminProtect,
} from "@/middlewares/auth";
import validateData from "@/middlewares/validate";
import { clubSchema } from "@/validations/club";
import express from "express";

const club = express.Router();

club.post(
  "/",
  authenticate,
  superAdminProtect,
  validateData(clubSchema),
  clubController.createClub
);
club.get("/", clubController.getClubs);
club.patch(
  "/:id",
  authenticate,
  superAdminProtect,
  validateData(clubSchema),
  clubController.updateClub
);
club.delete("/:id", authenticate, superAdminProtect, clubController.deleteClub);
club.get("/:id", clubController.getClubById);
club.post(
  "/:id/admins",
  authenticate,
  superAdminProtect,
  clubController.addAdmin
);
club.get("/:id/admins", authenticate, adminProtect, clubController.getAdmins);
club.delete(
  "/:clubId/admins/:userId",
  authenticate,
  superAdminProtect,
  clubController.removeAdmin
);
club.post("/:id/events", authenticate, clubAdminProtect, clubController.addEvent);
club.get("/:id/events", clubController.getEvents);
club.delete("/:id/events/:eventId", clubController.removeEvent);

export default club;
