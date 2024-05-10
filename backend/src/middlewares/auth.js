import Club from "@/models/club";
import User from "@/models/user";
import { JWT_SECRET } from "@/utils/config";
import jwt from "jsonwebtoken";

const extractToken = (req) => {
  return req.headers.authorization
    ? req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization
          .split(" ")[1]
          ?.replace("null", "")
          ?.replace("undefined", "")
      : null
    : null;
};

const authenticate = async (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const superAdminProtect = async (req, res, next) => {
  if (!req.user?.role || req.user.role !== "superadmin") {
    return res
      .status(403)
      .json({ message: "You are not permitted to access this resource" });
  }

  next();
};

const adminProtect = async (req, res, next) => {
  if (!req.user.role || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not permitted to access this resource" });
  }

  next();
};

const clubAdminProtect = async (req, res, next) => {
  if (!req.user.role || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not permitted to access this resource" });
  }

  const clubId = req.params.id;
  const userId = req.user._id;

  const isClubAdmin = await Club.findById(clubId).where("admins").in([userId]);

  if (!isClubAdmin) {
    return res
      .status(403)
      .json({ message: "You are not permitted to access this resource" });
  }

  next();
};

export { adminProtect, authenticate, superAdminProtect, clubAdminProtect };
