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
club.post("/", _auth.validateToken, (0, _auth.validateUserRoles)(["superadmin"]), (0, _validate["default"])(_club2.clubSchema), _club.clubController.createClub);
club.get("/", _club.clubController.getClubs);
club.get("/slugs/:slug", _club.clubController.getClubBySlug);
club.get("/:id", _club.clubController.getClubById);
club.patch("/:id", _auth.validateToken, (0, _auth.validateUserRoles)(["superadmin"]), (0, _validate["default"])(_club2.clubSchema), _club.clubController.updateClub);
club["delete"]("/:id", _auth.validateToken, (0, _auth.validateUserRoles)(["superadmin"]), _club.clubController.deleteClub);
club.get("/:id/admins", _auth.validateToken, (0, _auth.validateUserRoles)(["superadmin", "admin"]), _club.clubController.getAdmins);
club.post("/:id/admins", _auth.validateToken, (0, _auth.validateUserRoles)(["superadmin"]), _club.clubController.addAdmin);
club["delete"]("/:clubId/admins/:userId", _auth.validateToken, (0, _auth.validateUserRoles)(["superadmin"]), _club.clubController.removeAdmin);
var _default = exports["default"] = club;