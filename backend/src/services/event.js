import Event from "@/models/event";

const createEvent = async (event) => {
  const data = {
    ...event,
    organizer: event.clubId,
  }
  delete data.clubId;

  console.log(data)

  return await Event.create(data);
};

const getEvents = async () => {
  return await Event.find();
};

const getEventById = async (id) => {
  if (!id) {
    throw new Error("Event ID is required");
  }
  
  return await Event.findById(id);
};

const updateEvent = async (id, event) => {
  if (!id) {
    throw new Error("Event ID is required");
  }

  return await Event.findByIdAndUpdate(id, event, { new: true });
};

const deleteEvent = async (id) => {
  if (!id) {
    throw new Error("Event ID is required");
  }

  return await Event.findByIdAndDelete(id);
};

const addAttendee = async (eventId, userId) => {
  if (!eventId) {
    throw new Error("Event ID is required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }

  return await Event.findByIdAndUpdate(
    eventId,
    { $push: { attendees: userId } },
    { new: true }
  );
};

const removeAttendee = async (eventId, userId) => {
  if (!eventId) {
    throw new Error("Event ID is required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }

  return await Event.findByIdAndUpdate(
    eventId,
    { $pull: { attendees: userId } },
    { new: true }
  );
};

const getAttendees = async (eventId) => {
  if (!eventId) {
    throw new Error("Event ID is required");
  }

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
