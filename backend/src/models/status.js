import { model } from "mongoose";
import { Schema } from "mongoose";

const StatusSchema = new Schema({
  status: {
    type: String,
    required: true,
  },
});

const Status = model("Status", StatusSchema);

export default Status;
