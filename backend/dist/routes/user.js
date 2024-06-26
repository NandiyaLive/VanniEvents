"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = require("../controllers/user");
var _validate = _interopRequireDefault(require("../middlewares/validate"));
var _auth = require("../validations/auth");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var user = _express["default"].Router();
user.get("/", _user.userController.getAllUsers);
user.get("/:id", _user.userController.getUserById);
user.patch("/:id", _user.userController.updateUser);
user["delete"]("/:id", _user.userController.deleteUser);
var _default = exports["default"] = user;