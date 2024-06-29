"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _club = require("../controllers/club");
var _auth = require("../middlewares/auth");
var _validate = _interopRequireDefault(require("../middlewares/validate"));
var _club2 = require("../validations/club");
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var club = _express["default"].Router();
club.post("/", _auth.authenticate, _auth.superAdminProtect, (0, _validate["default"])(_club2.clubSchema), _club.clubController.createClub);
club.get("/", _club.clubController.getClubs);
club.patch("/:id", _auth.authenticate, _auth.superAdminProtect, (0, _validate["default"])(_club2.clubSchema), _club.clubController.updateClub);
club["delete"]("/:id", _auth.authenticate, _auth.superAdminProtect, _club.clubController.deleteClub);
club.get("/:id", _club.clubController.getClubById);
club.post("/:id/admins", _auth.authenticate, _auth.superAdminProtect, _club.clubController.addAdmin);
club.get("/:id/admins", _auth.authenticate, _auth.adminProtect, _club.clubController.getAdmins);
club["delete"]("/:clubId/admins/:userId", _auth.authenticate, _auth.superAdminProtect, _club.clubController.removeAdmin);
club.post("/:id/events", _auth.authenticate, _auth.clubAdminProtect, _club.clubController.addEvent);
club.get("/:id/events", _club.clubController.getEvents);
club["delete"]("/:id/events/:eventId", _club.clubController.removeEvent);
var _default = exports["default"] = club;