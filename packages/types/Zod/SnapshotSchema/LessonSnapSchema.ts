import { z } from "zod";
import { ExerciseSnapSchema } from "./ExerciseSnapSchema";

const nonEmpty = z.string().trim().min(1, "Required");

export const LessonSnapSchema = z
  .object({
    id: z.string(),
    title: nonEmpty,
    exercises: z.array(ExerciseSnapSchema),
    orderIndex: z.number().int().positive(),
  })
  .superRefine((v, ctx) => {
    let hasError = false;

    if (!v.title) {
      hasError = true;
      ctx.addIssue({
        code: "custom",
        path: ["title"],
        message: "Title required",
      });
    }

    const invalidIndexes: number[] = [];

    v.exercises.forEach((ex, idx) => {
      const parsed = ExerciseSnapSchema.safeParse(ex);
      if (!parsed.success) {
        invalidIndexes.push(idx);
      }
    });

    if (invalidIndexes.length > 0) {
      hasError = true;
      ctx.addIssue({
        code: "custom",
        path: ["exercises"],
        message: `Invalid exercise indexes: [${invalidIndexes.join(", ")}]`,
      });
    }

    if (hasError) {
      ctx.addIssue({
        code: "custom",
        path: [],
        message: "Module has validation errors.",
      });
    }
  });
