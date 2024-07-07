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
event.get("/:id", _event.eventController.getEventById);
event.post("/", _auth.validateToken, _auth.validateClubAdmin, (0, _validate["default"])(_event2.eventSchema), _event.eventController.createEvent);
event.patch("/:id", _auth.validateToken, _auth.validateClubAdmin, _event.eventController.updateEvent);
event["delete"]("/:id", _auth.validateToken, _auth.validateClubAdmin, _event.eventController.deleteEvent);
var _default = exports["default"] = event;