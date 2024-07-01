import { eventService } from "@/services/event";
import { ticketService } from "@/services/ticket";

const createEvent = async (req, res) => {
  const payload = req.body;

  try {
    const event = await eventService.createEvent(payload);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await eventService.getEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await eventService.getEventById(id);

    const ticketCount = await ticketService.getTicketCountByEvent(id);

    res.status(200).json({ ...event._doc, ticketCount });
  } catch (error) {
    res.status(404).json({ message: "Event not found" });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const event = await eventService.updateEvent(id, payload);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await eventService.deleteEvent(id);
    res.status(204).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(404).json({ message: "Event not found" });
  }
};

const addAttendee = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const event = await eventService.addAttendee(id, userId);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeAttendee = async (req, res) => {
  const { id, userId } = req.params;

  try {
    const event = await eventService.removeAttendee(id, userId);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAttendees = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await eventService.getAttendees(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ message: "Event not found" });
  }
};

export const eventController = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addAttendee,
  removeAttendee,
  getAttendees,
};
