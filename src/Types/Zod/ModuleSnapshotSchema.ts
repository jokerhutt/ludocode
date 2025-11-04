import { LessonSnapSchema } from "./LessonSnapSchema";
import { z } from "zod";

const nonEmpty = z.string().trim().min(1, "Required");

export const ModuleSnapshotSchema = z
  .object({
    moduleId: z.string().uuid().nullable(), // backend ID
    title: nonEmpty,
    lessons: z
      .array(LessonSnapSchema)
      .min(1, "Module must contain at least one lesson"),
  })
  .superRefine((m, ctx) => {


    // --- Lesson ID and tempId uniqueness ---
    const ids = m.lessons.map((l) => l.id).filter(Boolean) as string[];

    const dup = (arr: string[]) => {
      const seen = new Set<string>();
      for (const v of arr) {
        if (seen.has(v)) return v;
        seen.add(v);
      }
      return null;
    };

    const dupId = dup(ids);
    if (dupId)
      ctx.addIssue({
        code: "custom",
        path: ["lessons"],
        message: `Duplicate lesson id: ${dupId}`,
      });

  });

export function validateModuleSnapshot(payload: unknown) {
  const res = ModuleSnapshotSchema.safeParse(payload);
  return res.success
    ? { ok: true as const, value: res.data }
    : { ok: false as const, errors: res.error.issues };
}
