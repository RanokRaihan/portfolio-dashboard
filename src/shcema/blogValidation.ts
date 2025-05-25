import { z } from "zod";

export const blogValidation = z.object({
  title: z.string().min(2, { message: "Title is required" }),
  summary: z
    .string()
    .min(10, { message: "Summary must be at least 10 characters" }),
  content: z
    .string()
    .min(50, { message: "Content must be at least 50 characters" }),
  thumbnail: z.any().optional(),
  category: z.string().min(1, { message: "Please select a category" }),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  readTime: z.number().optional(),
  isFeatured: z.boolean(),
  status: z.enum(["draft", "published"]),
});
