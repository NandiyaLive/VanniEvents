import Ticket from "@/models/ticket";

const getAllTickets = async ({ eventId, userId }) => {
  try {
    if (eventId && userId) {
      return await getTicketByUserAndEvent(userId, eventId);
    }

    if (eventId) {
      return await Ticket.find({ eventId });
    }

    if (userId) {
      return await Ticket.find({ userId });
    }

    return await Ticket.find();
  } catch (error) {
    throw new Error(error);
  }
};

const getTicketById = async (id) => {
  try {
    return await Ticket.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};

const getTicketsByUserId = async (userId) => {
  try {
    return await Ticket.find({ userId });
  } catch (error) {
    throw new Error(error);
  }
};

const getTicketByUserAndEvent = async (userId, eventId) => {
  try {
    return await Ticket.findOne({ owner: userId, event: eventId });
  } catch (error) {
    throw new Error(error);
  }
};

const createTicket = async (payload) => {
  try {
    return await Ticket.create(payload);
  } catch (error) {
    throw new Error(error);
  }
};

const updateTicket = async (id, payload) => {
  try {
    return await Ticket.findByIdAndUpdate(id, payload, { new: true });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTicket = async (id) => {
  try {
    return await Ticket.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const ticketService = {
  getAllTickets,
  getTicketById,
  getTicketsByUserId,
  getTicketByUserAndEvent,
  createTicket,
  updateTicket,
  deleteTicket,
};
