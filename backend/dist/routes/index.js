"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _auth = require("../middlewares/auth");
var _express = _interopRequireDefault(require("express"));
var _auth2 = _interopRequireDefault(require("./auth"));
var _user = _interopRequireDefault(require("./user"));
var _club = _interopRequireDefault(require("./club"));
var _event = _interopRequireDefault(require("./event"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("/", function (req, res) {
  var uptime = Math.round(process.uptime()) + "s";
  res.json({
    message: "Welcome to VanniEvents API",
    version: "1.0.0",
    status: "UP",
    uptime: uptime
  });
});
router.use("/auth", _auth2["default"]);
router.use("/users", _auth.authenticate, _user["default"]);
router.use("/clubs", _auth.authenticate, _auth.superAdminProtect, _club["default"]);
router.use("/events", _event["default"]);
var _default = exports["default"] = router;