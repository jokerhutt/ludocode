import { z } from "zod";

export const createCourseSchema = z.object({
  courseTitle: z.string().min(1, "Title is required"),
  courseIcon: z.string().min(1, "Icon required"),
  languageId: z.number().nullable().optional(),
  courseType: z.union([z.literal("COURSE"), z.literal("SKILL_PATH")]),
});
