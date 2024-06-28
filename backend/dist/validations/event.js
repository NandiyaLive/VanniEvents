"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventSchema = void 0;
var _zod = require("zod");
// Check if any required field is undefined and return the error message
var eventSchema = exports.eventSchema = _zod.z.object({
  name: _zod.z.string().min(1, {
    message: "Name is required"
  }),
  slug: _zod.z.string().min(1, {
    message: "Slug is required"
  }),
  description: _zod.z.string().min(1, {
    message: "Description is required"
  }),
  guidelines: _zod.z.string().optional(),
  date: _zod.z.string().min(1, {
    message: "Date is required"
  }),
  time: _zod.z.string().min(1, {
    message: "Time is required"
  }),
  venue: _zod.z.string().min(1, {
    message: "Venue is required"
  }),
  seats: _zod.z.number()["int"]().min(1, {
    message: "Seats is required"
  }),
  crietrias: _zod.z.array(_zod.z.object({
    crietria: _zod.z.string().min(1, {
      message: "Crietria is required"
    }),
    values: _zod.z.array(_zod.z.string().min(1, {
      message: "Values are required"
    }))
  })),
  reg_start: _zod.z.string().min(1, {
    message: "Registartion start date is required"
  }),
  deadline: _zod.z.string().min(1, {
    message: "Deadline is required"
  }),
  enabled: _zod.z["boolean"]()["default"](true),
  attendees: _zod.z.array(_zod.z.string()).optional(),
  partners: _zod.z.array(_zod.z.string()).optional(),
  clubId: _zod.z.string().min(1, {
    message: "Club ID is required"
  })
});