import { FACULTIES, LEVEL, MEAL_PREF } from "@/utils/constants";
import { z } from "zod";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&^()._*?]{8,30}$/;
  
const REG_NO_REGEX = /^[0-9]{4}\/[A-Z]{2,4}\/[0-9]{1,3}$/;

export const registrationSchema = z
  .object({
    name: z.string().min(1),
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().refine((password) => PASSWORD_REGEX.test(password), {
      message:
        "password must contain at least one uppercase letter, one lowercase letter, one number and one special character and must be between 8-30 characters",
    }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password is required" }),
    nic: z.string().min(10, { message: "Invalid NIC number" }),
    reg_no: z.string().refine((reg_no) => REG_NO_REGEX.test(reg_no), {
      message:
        "Invalid registration number, must be in the format 20XX/XXXX/XXX",
    }),
    phone: z.string().min(10, { message: "Invalid phone number" }),
    role: z
      .string()
      .refine((role) => role !== "admin", {
        message: "You are not authorized to create an admin account",
      })
      .optional(),
    level: z.string().refine((level) => LEVEL.includes(level), {
      message: `Invalid level. Must be one of ${LEVEL.join(", ")}`,
    }),
    faculty: z.string().refine((faculty) => FACULTIES.includes(faculty), {
      message: `Invalid faculty. Must be one of ${FACULTIES.join(", ")}`,
    }),
    meal_pref: z.union([
      z.string().refine((meal_pref) => MEAL_PREF.includes(meal_pref), {
        message: `Invalid meal preference. Must be one of ${MEAL_PREF.join(
          ", "
        )}`,
      }),
      z.undefined(),
    ]),
  })
  .superRefine((data) => {
    if (data.password !== data.confirmPassword) {
      return { message: "Passwords do not match" };
    }
  });

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
