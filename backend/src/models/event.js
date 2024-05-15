import { Schema, model } from "mongoose";

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  guidelines: {
    type: String,
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
  seats: {
    type: Number,
    required: true,
  },
  crietrias: {
    type: [
      {
        crietria: {
          type: String,
          enum: ["level", "faculty"],
          required: true,
        },
        values: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
    required: true,
  },
  reg_start: {
    type: Date,
    required: true,
  },
  dealine: {
    type: Date,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  partners: [
    {
      type: Schema.Types.ObjectId,
      ref: "Club",
    } || {
      type: {
        name: String,
        description: String,
        logo: String,
      },
    },
  ],
});

const Event = model("Event", EventSchema);

export default Event;
