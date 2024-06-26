"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clubSchema = void 0;
var _zod = require("zod");
var clubSchema = exports.clubSchema = _zod.z.object({
  name: _zod.z.string().min(1, {
    message: "Event name is required"
  }),
  slug: _zod.z.string().min(1, {
    message: "Slug is required"
  }).regex(/^[a-z0-9-]+$/, {
    message: "Slug must only contain lowercase letters, numbers, and hyphens"
  }),
  description: _zod.z.string().optional(),
  logo: _zod.z.string().optional(),
  cover: _zod.z.string().optional(),
  admins: _zod.z.array(_zod.z.string()).optional(),
  events: _zod.z.array(_zod.z.string()).optional()
});