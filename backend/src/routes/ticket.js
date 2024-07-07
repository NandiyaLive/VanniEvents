import express from "express";
import { ticketController } from "@/controllers/ticket";
import { validateUserRoles } from "@/middlewares/auth";

const ticket = express.Router();

ticket.get(
  "/",
  validateUserRoles(["superadmin", "admin"]),
  ticketController.getAllTickets
);

ticket.get("/:id", ticketController.getTicketById);

ticket.post("/", ticketController.createTicket);

ticket.patch("/:id", ticketController.updateTicket);

ticket.delete("/:id", ticketController.deleteTicket);

export default ticket;
