import { z } from "zod";

export const clubSchema = z.object({
  name: z.string().min(1, { message: "Event name is required" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug must only contain lowercase letters, numbers, and hyphens",
    }),
  description: z.string().optional(),
  logo: z.string().optional(),
  cover: z.string().optional(),
  admins: z.array(z.string()).optional(),
  events: z.array(z.string()).optional(),
});
