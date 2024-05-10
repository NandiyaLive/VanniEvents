import Event from "@/models/event";

const createEvent = async (event) => {
  return await Event.create(event);
};

const getEvents = async () => {
  return await Event.find();
};

const getEventById = async (id) => {
  return await Event.findById(id);
};

const updateEvent = async (id, event) => {
  return await Event.findByIdAndUpdate(id, event, { new: true });
};

const deleteEvent = async (id) => {
  return await Event.findByIdAndDelete(id);
};

const addAttendee = async (eventId, userId) => {
  return await Event.findByIdAndUpdate(
    eventId,
    { $push: { attendees: userId } },
    { new: true }
  );
};

const removeAttendee = async (eventId, userId) => {
  return await Event.findByIdAndUpdate(
    eventId,
    { $pull: { attendees: userId } },
    { new: true }
  );
};

const getAttendees = async (eventId) => {
  return await Event.findById(eventId).populate("attendees");
};

export const eventService = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addAttendee,
  removeAttendee,
  getAttendees,
};
