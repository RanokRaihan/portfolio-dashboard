import { z } from "zod";

export const createProjectValidation = z.object({
  title: z.string().min(2, { message: "Title is required" }),
  summary: z.string().min(2, { message: "Summary is required" }),
  description: z.string().min(2, { message: "Description is required" }),
  challenges: z.string(),
  technologies: z.string(),
  backendRepo: z.string().url().optional().or(z.literal("")),
  frontendRepo: z.string().url().optional().or(z.literal("")),
  backendLive: z.string().url().optional().or(z.literal("")),
  frontendLive: z.string().url().optional().or(z.literal("")),
  thumbnail: z.array(z.any()).max(1, { message: "Max 1 images" }),
  images: z.array(z.any()).max(5, { message: "Max 5 images" }).optional(),
  isFeatured: z.boolean(),
  keyFeatures: z.string(),
  status: z.enum(["completed", "in-progress", "planned"]),
});
