"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _auth = require("../middlewares/auth");
var _status = _interopRequireDefault(require("../models/status"));
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _auth2 = _interopRequireDefault(require("./auth"));
var _club = _interopRequireDefault(require("./club"));
var _event = _interopRequireDefault(require("./event"));
var _ticket = _interopRequireDefault(require("./ticket"));
var _user = _interopRequireDefault(require("./user"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("/", function (req, res) {
  var uptime = Math.round(process.uptime()) + "s";
  _status["default"].create({
    status: _mongoose["default"].connection.readyState === 1 ? "UP" : "DOWN"
  });
  res.json({
    message: "Welcome to VanniEvents API",
    version: "1.0.0",
    status: "UP",
    uptime: uptime,
    mongodb: {
      status: _mongoose["default"].connection.readyState === 1 ? "UP" : "DOWN"
    }
  });
});
router.use("/auth", _auth2["default"]);
router.use("/users", _auth.validateToken, _user["default"]);
router.use("/clubs", _club["default"]);
router.use("/events", _event["default"]);
router.use("/tickets", _auth.validateToken, _ticket["default"]);
var _default = exports["default"] = router;