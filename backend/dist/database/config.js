"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _config = require("../utils/config");
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var connectWithRetry = function connectWithRetry() {
  console.log("MongoDB connection with retry");
  return _mongoose["default"].connect(_config.MONGO_URI, {
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })["catch"](function (error) {
    console.error("MongoDB connection unsuccessful, retry after 5 seconds.", error);
    setTimeout(connectWithRetry, 5000);
  });
};
var connectDB = function connectDB() {
  connectWithRetry();
  _mongoose["default"].connection.on("connected", function () {
    console.log("Connected to database successfully");
  });
  _mongoose["default"].connection.on("error", function (error) {
    console.log("Error connecting to database: ".concat(error));
  });
  _mongoose["default"].connection.on("disconnected", function () {
    console.log("Disconnected from database");
  });
};
var _default = exports["default"] = connectDB;