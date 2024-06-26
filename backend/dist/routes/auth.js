"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _auth = require("../controllers/auth");
var _validate = _interopRequireDefault(require("../middlewares/validate"));
var _auth2 = require("../validations/auth");
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var auth = _express["default"].Router();
auth.post("/register", (0, _validate["default"])(_auth2.registrationSchema), _auth.authController.register);
auth.post("/login", (0, _validate["default"])(_auth2.loginSchema), _auth.authController.login);
var _default = exports["default"] = auth;