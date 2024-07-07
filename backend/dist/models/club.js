"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _require = require("mongoose"),
  Schema = _require.Schema,
  model = _require.model;
var ClubSchema = Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  logo: {
    type: String
  },
  cover: {
    type: String
  },
  admins: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
    required: true
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});
var Club = model("Club", ClubSchema);
var _default = exports["default"] = Club;