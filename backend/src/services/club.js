import Club from "@/models/club";
import { userService } from "./user";
import { eventService } from "./event";

const createClub = async (payload) => {
  try {
    const club = await Club.create(payload);

    const clubWithAdmins = await Club.findById(club.id).populate("admins");

    return clubWithAdmins;
  } catch (error) {
    console.error("Error creating club:", error);
    throw error;
  }
};

const getClubs = async () => {
  return await Club.find().populate("admins");
};

const getClubById = async (id) => {
  return await Club.findById(id).populate("admins");
};

const getClubBySlug = async (slug) => {
  return await Club.findOne({
    slug,
  }).populate("admins");
};

const updateClub = async (id, club) => {
  return await Club.findByIdAndUpdate(id, club, { new: true }).populate(
    "admins"
  );
};

const deleteClub = async (id) => {
  return await Club.findByIdAndDelete(id);
};

const addAdmin = async (clubId, userId) => {
  const isAdmin = userService.checkUserRole(userId, "admin");

  if (!isAdmin) {
    throw new Error("User is not an admin");
  }

  return await Club.findByIdAndUpdate(
    clubId,
    { $push: { admins: userId } },
    { new: true }
  ).populate("admins");
};

const getAdmins = async (clubId) => {
  const data = await Club.findById(clubId).populate("admins");
  const admins = data.admins.map((admin) => ({
    id: admin._id.toString(),
    name: admin.name,
    username: admin.username,
    email: admin.email,
  }));

  return admins;
};

const checkAdmin = async (clubId, userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  if (!clubId) {
    throw new Error("Club ID is required");
  }

  const admins = await getAdmins(clubId);

  if (!admins) {
    throw new Error("No admins found");
  }

  const isAdmin = admins.find((admin) => admin.id == userId);

  return isAdmin;
};

const removeAdmin = async (clubId, userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  if (!clubId) {
    throw new Error("Club ID is required");
  }

  const isAdmin = await getAdmins(clubId).includes(userId);

  if (!isAdmin) {
    throw new Error("User is not an admin");
  }

  return await Club.findByIdAndUpdate(
    clubId,
    { $pull: { admins: userId } },
    { new: true }
  ).populate("admins");
};

const addEvent = async (clubId, eventId) => {
  const event = await eventService.getEventById(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  return await Club.findByIdAndUpdate(
    clubId,
    { $push: { events: eventId } },
    { new: true }
  );
};

const getEvents = async (clubId) => {
  return await Club.findById(clubId).populate("events");
};

const removeEvent = async (clubId, eventId) => {
  return await Club.findByIdAndUpdate(
    clubId,
    { $pull: { events: eventId } },
    { new: true }
  );
};

export const clubService = {
  createClub,
  getClubs,
  getClubById,
  getClubBySlug,
  updateClub,
  deleteClub,
  addAdmin,
  getAdmins,
  checkAdmin,
  removeAdmin,
  addEvent,
  getEvents,
  removeEvent,
};
