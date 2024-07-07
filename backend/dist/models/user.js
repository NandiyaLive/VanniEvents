"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("../utils/constants");
var _mongoose = require("mongoose");
var UserSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  nic: {
    type: String
  },
  reg_no: {
    type: String
  },
  phone: {
    type: String
  },
  role: {
    type: String,
    "enum": _constants.ROLES,
    "default": "user"
  },
  level: {
    type: String,
    "enum": _constants.LEVEL
  },
  faculty: {
    type: String,
    "enum": _constants.FACULTIES.map(function (faculty) {
      return faculty.name;
    })
  },
  department: {
    type: String,
    "enum": _constants.FACULTIES.reduce(function (acc, faculty) {
      return acc.concat(faculty.departments);
    }, []).map(function (department) {
      return department;
    })
  },
  meal_pref: {
    type: String,
    "enum": _constants.MEAL_PREF
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});
var User = (0, _mongoose.model)("User", UserSchema);
var _default = exports["default"] = User;