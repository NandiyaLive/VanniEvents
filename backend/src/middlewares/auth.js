import User from "@/models/user";
import { clubService } from "@/services/club";
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

const validateToken = async (req, res, next) => {
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

const validateUserRoles = (roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        user: {
          id: req.user._id,
          email: req.user.email,
          role: req.user.role,
        },
        message: `You have to be a ${roles.join(
          " or "
        )} to access this resource`,
      });
    }

    next();
  };
};

const validateClubAdmin = async (req, res, next) => {
  const { clubId } = req.body;

  if (!clubId) {
    return res.status(400).json({ message: "Club ID is required" });
  }

  if (!req.user.role || req.user.role !== "admin") {
    return res.status(403).json({
      user: {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role,
      },
      message: "You have to be an admin of the club to access this resource",
    });
  }

  const userId = req.user._id;

  const isClubAdmin = await clubService.checkAdmin(clubId, userId);

  if (!isClubAdmin) {
    return res.status(403).json({
      user: {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role,
      },
      message: "You have to be an admin of the club to access this resource",
    });
  }

  next();
};

export { validateToken, validateUserRoles, validateClubAdmin };
