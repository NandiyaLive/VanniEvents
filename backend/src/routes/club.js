import { clubController } from "@/controllers/club";
import { validateToken, validateUserRoles } from "@/middlewares/auth";
import validateData from "@/middlewares/validate";
import { clubSchema } from "@/validations/club";
import express from "express";

const club = express.Router();

club.post(
  "/",
  validateToken,
  validateUserRoles(["superadmin"]),
  validateData(clubSchema),
  clubController.createClub
);

club.get("/", clubController.getClubs);

club.get("/slugs/:slug", clubController.getClubBySlug);

club.get("/:id", clubController.getClubById);

club.patch(
  "/:id",
  validateToken,
  validateUserRoles(["superadmin"]),
  validateData(clubSchema),
  clubController.updateClub
);

club.delete(
  "/:id",
  validateToken,
  validateUserRoles(["superadmin"]),
  clubController.deleteClub
);

club.get(
  "/:id/admins",
  validateToken,
  validateUserRoles(["superadmin", "admin"]),
  clubController.getAdmins
);

club.post(
  "/:id/admins",
  validateToken,
  validateUserRoles(["superadmin"]),
  clubController.addAdmin
);

club.delete(
  "/:clubId/admins/:userId",
  validateToken,
  validateUserRoles(["superadmin"]),
  clubController.removeAdmin
);

export default club;
