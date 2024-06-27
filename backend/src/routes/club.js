import { clubController } from "@/controllers/club";
import validateData from "@/middlewares/validate";
import { clubSchema } from "@/validations/club";
import express from "express";

const club = express.Router();

club.post("/", validateData(clubSchema), clubController.createClub);
club.get("/", clubController.getClubs);
club.patch("/:id", validateData(clubSchema), clubController.updateClub);
club.delete("/:id", clubController.deleteClub);
club.get("/:id", clubController.getClubById);
club.post("/:id/admins", clubController.addAdmin);
club.get("/:id/admins", clubController.getAdmins);
club.delete("/:id/admins", clubController.removeAdmin);
club.post("/:id/events", clubController.addEvent);
club.get("/:id/events", clubController.getEvents);
club.delete("/:id/events/:eventId", clubController.removeEvent);

export default club;
