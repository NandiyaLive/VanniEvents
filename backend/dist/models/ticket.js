"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var ticketSchema = new _mongoose.Schema({
  reference: {
    type: String,
    required: true,
    unique: true
  },
  event: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  owner: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  approved: {
    type: Boolean,
    "default": false
  },
  approvedBy: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  utilized: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});
var Ticket = (0, _mongoose.model)("Ticket", ticketSchema);
var _default = exports["default"] = Ticket;