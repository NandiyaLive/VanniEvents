"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SALT_ROUNDS = exports.PORT = exports.MONGO_URI = exports.JWT_SECRET = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.configDotenv)();
var PORT = exports.PORT = process.env.PORT || 3000;
var MONGO_URI = exports.MONGO_URI = process.env.MONGO_URI;
var JWT_SECRET = exports.JWT_SECRET = process.env.JWT_SECRET;
var SALT_ROUNDS = exports.SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 12;