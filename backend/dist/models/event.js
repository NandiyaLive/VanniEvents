"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var EventSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  guidelines: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  crietrias: {
    type: [{
      crietria: {
        type: String,
        "enum": ["level", "faculty", "department"]
      },
      values: [{
        type: String
      }]
    }]
  },
  reg_start: {
    type: Date,
    required: true
  },
  dealine: {
    type: Date,
    required: true
  },
  enabled: {
    type: Boolean,
    "default": true
  },
  auto_approve: {
    type: Boolean,
    "default": false
  },
  organizer: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true
  },
  partners: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Club"
  } || {
    type: {
      name: String,
      description: String,
      logo: String
    }
  }]
});
var Event = (0, _mongoose.model)("Event", EventSchema);
var _default = exports["default"] = Event;