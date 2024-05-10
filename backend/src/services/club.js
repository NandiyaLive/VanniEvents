import Club from "@/models/club";
import { userService } from "./user";

const createClub = async (club) => {
  return await Club.create(club);
};

const getClubs = async () => {
  return await Club.find();
};

const getClubById = async (id) => {
  return await Club.findById(id);
};

const getClubBySlug = async (slug) => {
  return await Club.findOne({
    slug,
  });
};

const updateClub = async (id, club) => {
  return await Club.findByIdAndUpdate(id, club, { new: true });
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
  );
};

const getAdmins = async (clubId) => {
  return await Club.findById(clubId).populate("admins");
};

const removeAdmin = async (clubId, userId) => {
  return await Club.findByIdAndUpdate(
    clubId,
    { $pull: { admins: userId } },
    { new: true }
  );
};

const addEvent = async (clubId, eventId) => {
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
  removeAdmin,
  addEvent,
  getEvents,
  removeEvent,
};
