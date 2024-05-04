import { ROLES, LEVEL, FACULTIES, MEAL_PREF } from "@/utils/constants";
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
    },
    reg_no: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ROLES,
      default: "user",
    },
    level: {
      type: String,
      enum: LEVEL,
    },
    faculty: {
      type: String,
      enum: FACULTIES,
    },
    meal_pref: {
      type: String,
      enum: MEAL_PREF,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const User = model("User", UserSchema);

export default User;
