"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registrationSchema = exports.loginSchema = void 0;
var _constants = require("../utils/constants");
var _zod = require("zod");
var PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&^()._*?]{8,30}$/;
var REG_NO_REGEX = /^[0-9]{4}\/[A-Z]{2,4}\/[0-9]{1,3}$/;
var registrationSchema = exports.registrationSchema = _zod.z.object({
  name: _zod.z.string().min(1),
  username: _zod.z.string().min(1),
  email: _zod.z.string().email(),
  password: _zod.z.string().refine(function (password) {
    return PASSWORD_REGEX.test(password);
  }, {
    message: "password must contain at least one uppercase letter, one lowercase letter, one number and one special character and must be between 8-30 characters"
  }),
  confirmPassword: _zod.z.string().min(8, {
    message: "Confirm password is required"
  }),
  nic: _zod.z.string().min(10, {
    message: "Invalid NIC number"
  }),
  reg_no: _zod.z.string().refine(function (reg_no) {
    return REG_NO_REGEX.test(reg_no);
  }, {
    message: "Invalid registration number, must be in the format 20XX/XXXX/XXX"
  }),
  phone: _zod.z.string().min(10, {
    message: "Invalid phone number"
  }),
  role: _zod.z.string().refine(function (role) {
    return role !== "admin";
  }, {
    message: "You are not authorized to create an admin account"
  }).optional(),
  level: _zod.z.string().refine(function (level) {
    return _constants.LEVEL.includes(level);
  }, {
    message: "Invalid level. Must be one of ".concat(_constants.LEVEL.join(", "))
  }),
  faculty: _zod.z.string().min(1, {
    message: "Faculty is required"
  }),
  department: _zod.z.string().min(1, {
    message: "Department is required"
  }),
  meal_pref: _zod.z.union([_zod.z.string().refine(function (meal_pref) {
    return _constants.MEAL_PREF.includes(meal_pref);
  }, {
    message: "Invalid meal preference. Must be one of ".concat(_constants.MEAL_PREF.join(", "))
  }), _zod.z.undefined()])
}).superRefine(function (data, ctx) {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      path: ["confirmPassword"],
      message: "Passwords do not match"
    });
  }
  var FAC = data.faculty;
  var DEPS = _constants.FACULTIES.find(function (f) {
    return f.name === FAC;
  }).departments;
  if (!DEPS.includes(data.department)) {
    ctx.addIssue({
      path: ["department"],
      message: "Invalid department. Must be one of ".concat(DEPS.join(", "))
    });
  }
});
var loginSchema = exports.loginSchema = _zod.z.object({
  email: _zod.z.string().email().min(1, {
    message: "Email is required"
  }),
  password: _zod.z.string().min(1, {
    message: "Password is required"
  })
});