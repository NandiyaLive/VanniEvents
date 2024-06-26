"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _event = require("../controllers/event");
var _auth = require("../middlewares/auth");
var _validate = _interopRequireDefault(require("../middlewares/validate"));
var _event2 = require("../validations/event");
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var event = _express["default"].Router();
event.get("/", _event.eventController.getEvents);
event.post("/", _auth.authenticate, _auth.clubAdminProtect, (0, _validate["default"])(_event2.eventSchema), _event.eventController.createEvent);
event.get("/:id", _event.eventController.getEventById);
event.patch("/:id", _auth.authenticate, _auth.clubAdminProtect, _event.eventController.updateEvent);
event["delete"]("/:id", _auth.authenticate, _auth.clubAdminProtect, _event.eventController.deleteEvent);
event.post("/:id/attendees", _auth.authenticate, _event.eventController.addAttendee);
event.get("/:id/attendees", _auth.authenticate, _auth.clubAdminProtect, _event.eventController.getAttendees);
event["delete"]("/:id/attendees/:userId", _auth.authenticate, _auth.clubAdminProtect, _event.eventController.removeAttendee);
var _default = exports["default"] = event;