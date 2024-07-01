import errorHandler from "@/utils/error-handler";
import { ticketService } from "@/services/ticket";
import { userService } from "@/services/user";
import { eventService } from "@/services/event";
import { v4 as uuidv4 } from "uuid";

const getAllTickets = async (req, res) => {
  const { eventId, userId } = req.query;

  try {
    const tickets = await ticketService.getAllTickets({ eventId, userId });
    res.status(200).json(tickets);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getTicketById = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await ticketService.getTicketById(id);
    res.status(200).json(ticket);
  } catch (error) {
    errorHandler(error, res);
  }
};

const createTicket = async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const event = await eventService.getEventById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const userTicket = await ticketService.getTicketByUserAndEvent(
      userId,
      eventId
    );

    if (userTicket) {
      return res
        .status(400)
        .json({ message: "User already has a ticket for this event" });
    }

    const payload = {
      reference: uuidv4(),
      event: eventId,
      owner: userId,
      approved: event.auto_approve,
    };

    const ticket = await ticketService.createTicket(payload);

    res.status(201).json(ticket);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateTicket = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const ticket = await ticketService.updateTicket(id, payload);
    res.status(200).json(ticket);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    await ticketService.deleteTicket(id);
    res.status(204).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const ticketController = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};
