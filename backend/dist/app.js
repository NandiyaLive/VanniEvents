"use strict";

var _config = _interopRequireDefault(require("./database/config"));
var _seed = _interopRequireDefault(require("./database/seed"));
var _config2 = require("./utils/config");
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _compression = _interopRequireDefault(require("compression"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _routes = _interopRequireDefault(require("./routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: "*",
  methods: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(_bodyParser["default"].json());
app.use((0, _cookieParser["default"])());
app.use((0, _compression["default"])());
app.use("/api", _routes["default"]);
app.listen(_config2.PORT, function () {
  console.log("Server is running on port", _config2.PORT);
});
(0, _config["default"])();
(0, _seed["default"])();