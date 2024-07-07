"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = require("../controllers/user");
var _auth = require("../middlewares/auth");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var user = _express["default"].Router();
user.get("/", (0, _auth.validateUserRoles)(["superadmin"]), _user.userController.getAllUsers);
user.get("/:id", _user.userController.getUserById);
user.patch("/:id", _user.userController.updateUser);
user["delete"]("/:id", _user.userController.deleteUser);
user.post("/:id/change-password", _user.userController.changePassword);
var _default = exports["default"] = user;