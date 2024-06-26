"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _config = require("../utils/config");
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var connectDB = function connectDB() {
  _mongoose["default"].connect(_config.MONGO_URI, {
    connectTimeoutMS: 3000
  })["catch"](function (err) {
    return console.log("Error connecting to DB: ".concat(err));
  });
  _mongoose["default"].connection.on("connected", function () {
    console.log("Connected to DB");
  });
  _mongoose["default"].connection.on("error", function () {
    console.log("Error connecting to DB");
  });
};
var _default = exports["default"] = connectDB;