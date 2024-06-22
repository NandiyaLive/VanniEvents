import { z } from "zod";

// Check if any required field is undefined and return the error message
export const eventSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  guidelines: z.string().optional(),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  venue: z.string().min(1, { message: "Venue is required" }),
  seats: z.number().int().min(1, { message: "Seats is required" }),
  crietrias: z.array(
    z.object({
      crietria: z.string().min(1, { message: "Crietria is required" }),
      values: z.array(z.string().min(1, { message: "Values are required" })),
    })
  ),
  reg_start: z
    .string()
    .min(1, { message: "Registartion start date is required" }),
  dealine: z.string().min(1, { message: "Deadline is required" }),
  enabled: z.boolean().default(true),
  attendees: z.array(z.string()).optional(),
  partners: z.array(z.string()).optional(),
  clubId: z.string().min(1, { message: "Club ID is required" }),
});
