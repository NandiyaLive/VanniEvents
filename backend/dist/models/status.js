"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var StatusSchema = new _mongoose.Schema({
  status: {
    type: String,
    required: true
  }
});
var Status = (0, _mongoose.model)("Status", StatusSchema);
var _default = exports["default"] = Status;