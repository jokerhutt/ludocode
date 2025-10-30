import { z } from "zod";
import { ExerciseSnapSchema } from "./ExerciseSnapSchema";

const nonEmpty = z.string().trim().min(1, "Required");

export const LessonSnapSchema = z
  .object({
    id: z.string().uuid().nullable(),
    tempId: z.string().uuid(),
    title: nonEmpty,
    exercises: z.array(ExerciseSnapSchema),
    orderIndex: z.number().int().positive(),
  })
  .superRefine((v, ctx) => {
    // Existing lessons: tempId must equal id
    if (v.id && v.tempId !== v.id) {
      ctx.addIssue({
        code: "custom",
        path: ["tempId"],
        message: "For existing lessons, tempId must equal id",
      });
    }
    // New lessons: id must be null
    if (!v.id && v.tempId) {
      // fine, tempId acts as client placeholder
    }
  });
