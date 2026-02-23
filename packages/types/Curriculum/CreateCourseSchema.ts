import { z } from "zod";
import type { CourseType } from "@ludocode/types";

export const createCourseSchema = z.object({
  courseTitle: z.string().min(1, "Title is required"),
  courseSubjectId: z.number().min(1, "Subject is required"),
  languageId: z.number().nullable().optional(),
  courseType: z.union([z.literal("COURSE"), z.literal("SKILL_PATH")]),
});
