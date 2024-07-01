import { clubService } from "@/services/club";
import { eventService } from "@/services/event";
import errorHandler from "@/utils/error-handler";

const createClub = async (req, res) => {
  const payload = req.body;

  try {
    const club = await clubService.createClub(payload);
    res.json(club);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getClubs = async (req, res) => {
  const { slug } = req.query;
  const { userId } = req.query;

  try {
    if (slug) {
      const club = await clubService.getClubBySlug(slug);
      return res.json(club);
    }

    if (userId) {
      const club = await clubService.getClubByUserId(userId);
      return res.json(club);
    }

    const clubs = await clubService.getClubs();
    res.json(clubs);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getClubById = async (req, res) => {
  const { id } = req.params;
  try {
    const club = await clubService.getClubById(id);
    res.json(club);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getClubBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const club = await clubService.getClubBySlug(slug);
    res.json(club);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateClub = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const club = await clubService.updateClub(id, payload);
    res.json(club);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteClub = async (req, res) => {
  const { id } = req.params;
  try {
    await clubService.deleteClub(id);
    res.status(204).json({ message: "Club deleted successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addAdmin = async (req, res) => {
  const { id: clubId } = req.params;
  const { userId } = req.body;

  try {
    const club = await clubService.addAdmin(clubId, userId);
    res.json(club);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAdmins = async (req, res) => {
  const { id: clubId } = req.params;

  try {
    const club = await clubService.getAdmins(clubId);

    const admins = club.admins.map((admin) => ({
      id: admin._id,
      name: admin.name,
      email: admin.email,
    }));

    res.json(admins);
  } catch (error) {
    errorHandler(error, res);
  }
};

const checkAdmin = async (req, res) => {
  const { id: clubId } = req.params;
  const { userId } = req.body;

  try {
    const club = await clubService.checkAdmin(clubId, userId);
    res.json(club);
  } catch (error) {
    errorHandler(error, res);
  }
};

const removeAdmin = async (req, res) => {
  const { clubId, userId } = req.params;

  try {
    const club = await clubService.removeAdmin(clubId, userId);
    res.json(club);
  } catch (error) {
    errorHandler(error, res);
  }
};

const addEvent = async (req, res) => {
  const { id: clubId } = req.params;
  const { eventId } = req.body;

  try {
    const club = await clubService.addEvent(clubId, eventId);
    res.json(club);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getEvents = async (req, res) => {
  const { id: clubId } = req.params;
  try {
    const club = await eventService.getEventsByClubId(clubId);

    res.json(club);
  } catch (error) {
    errorHandler(error, res);
  }
};

const removeEvent = async (req, res) => {
  const { id: clubId } = req.params;
  const { eventId } = req.body;

  try {
    const club = await clubService.removeEvent(clubId, eventId);
    res.json(club);
  } catch (error) {
    errorHandler(error, res);
  }
};

export const clubController = {
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
