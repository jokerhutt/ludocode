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
    if (!v.title) {
      ctx.addIssue({
        code: "custom",
        path: ["title"],
        message: "Title required",
      });
    }

    if (v.id && v.tempId !== v.id) {
      ctx.addIssue({
        code: "custom",
        path: ["tempId"],
        message: "For existing lessons, tempId must equal id",
      });
    }
    if (!v.id && v.tempId) {
    }

    const badIdx = v.exercises.findIndex((ex) => !ExerciseSnapSchema.safeParse(ex).success);
    if (badIdx !== -1) {
      ctx.addIssue({
        code: "custom",
        path: ["exercises"],
        message: `Contains an invalid exercise (e.g. item #${badIdx + 1})`,
      });
    }
  });
