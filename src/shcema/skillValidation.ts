import { z } from "zod";

export const skillValidation = z.object({
  name: z.string().min(1, { message: "Skill name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  category: z.enum(
    [
      "frontend",
      "backend",
      "fullstack",
      "database",
      "devops",
      "tools",
      "other",
    ],
    {
      required_error: "Please select a category",
    }
  ),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 1024 * 1024, {
      message: "Image must be less than 1MB",
    })
    .refine(
      (file) =>
        [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
          "image/svg+xml",
        ].includes(file.type),
      {
        message: "File must be a valid image (JPEG, PNG, GIF, WEBP, or SVG)",
      }
    ),
  proficiencyLevel: z.enum(["beginner", "intermediate", "advanced", "expert"], {
    required_error: "Please select a proficiency level",
  }),
  yearsOfExperience: z.coerce.number().min(0, {
    message: "Years of experience must be a positive number",
  }),
  featured: z.boolean().optional(),
});
