import { Schema, model } from "mongoose";

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  club: {
    type: Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Event = model("Event", EventSchema);

export default Event;
