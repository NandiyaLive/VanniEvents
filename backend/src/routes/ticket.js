import express from "express";
import { ticketController } from "@/controllers/ticket";

const ticket = express.Router();

ticket.get("/", ticketController.getAllTickets);

ticket.get("/:id", ticketController.getTicketById);

ticket.post("/", ticketController.createTicket);

ticket.patch("/:id", ticketController.updateTicket);

ticket.delete("/:id", ticketController.deleteTicket);

export default ticket;
