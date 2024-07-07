"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _ticket = require("../controllers/ticket");
var _auth = require("../middlewares/auth");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ticket = _express["default"].Router();
ticket.get("/", (0, _auth.validateUserRoles)(["superadmin", "admin"]), _ticket.ticketController.getAllTickets);
ticket.get("/:id", _ticket.ticketController.getTicketById);
ticket.post("/", _ticket.ticketController.createTicket);
ticket.patch("/:id", _ticket.ticketController.updateTicket);
ticket["delete"]("/:id", _ticket.ticketController.deleteTicket);
var _default = exports["default"] = ticket;