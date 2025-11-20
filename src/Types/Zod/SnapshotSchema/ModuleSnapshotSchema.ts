import { LessonSnapSchema } from "./LessonSnapSchema";
import { z } from "zod";

const nonEmpty = z.string().trim().min(1, "Required");

export const ModuleSnapshotSchema = z
  .object({
    moduleId: z.string(),
    title: nonEmpty,
    isExpanded: z.boolean().optional().nullable(),
    lessons: z
      .array(LessonSnapSchema)
      .min(1, "Module must contain at least one lesson"),
  })
  .superRefine((m, ctx) => {
    let hasError = false;

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
    if (dupId) {
      hasError = true;
      ctx.addIssue({
        code: "custom",
        path: ["lessons"],
        message: `Duplicate lesson id: ${dupId}`,
      });
    }

    const badLesson = m.lessons.findIndex(
      (lesson) => !LessonSnapSchema.safeParse(lesson).success
    );
    if (badLesson !== -1) {
      hasError = true;
      ctx.addIssue({
        code: "custom",
        path: ["lessons"],
        message: `Contains an invalid lesson (e.g. item #${badLesson + 1})`,
      });
    }

    if (hasError) {
      ctx.addIssue({
        code: "custom",
        path: [],
        message: ``
      })
    }

  });

export function validateModuleSnapshot(payload: unknown) {
  const res = ModuleSnapshotSchema.safeParse(payload);
  return res.success
    ? { ok: true as const, value: res.data }
    : { ok: false as const, errors: res.error.issues };
}
