import { Schema, model } from "mongoose";

const ticketSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    utilized: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = model("Ticket", ticketSchema);

export default Ticket;
