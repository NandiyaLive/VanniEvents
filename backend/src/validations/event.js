import { z } from "zod";

// Check if any required field is undefined and return the error message
export const eventSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  guidelines: z.string().optional(),
  date: z.date().min(new Date(), { message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  venue: z.string().min(1, { message: "Venue is required" }),
  seats: z.number().int().min(1, { message: "Seats is required" }),
  crietria: z.array(
    z.object({
      crietria: z.string().min(1, { message: "Crietria is required" }),
      values: z.array(z.string().min(1, { message: "Values is required" })),
    })
  ),
  reg_start: z
    .date()
    .min(new Date(), { message: "Registartion start date is required" }),
  dealine: z.date().min(new Date(), { message: "Deadline is required" }),
  enabled: z.boolean().default(true),
  attendees: z.array(z.string()),
  organizer: z.string().min(1, { message: "Organizer is required" }),
});
