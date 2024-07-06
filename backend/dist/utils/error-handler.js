"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var errorHandler = function errorHandler(err, res) {
  console.log(err);
  if (err.name === "ZodError") {
    var errorMessages = err.errors.map(function (issue) {
      return {
        error: "Validation Error",
        field: issue.path.join("."),
        message: issue.message
      };
    });
    res.status(400).json({
      error: "Validation Error",
      messages: errorMessages
    });
  } else if (err.name === "MongoServerError" && err.code === 11000) {
    var key = Object.keys(err.keyValue)[0];
    res.status(400).json({
      error: "Duplicate Field Error",
      message: "Duplicate field value entered: ".concat(key)
    });
  } else {
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message
    });
  }
};
var _default = exports["default"] = errorHandler;