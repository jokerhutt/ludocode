import { z } from "zod";
import { ModuleSnapshotSchema } from "./ModuleSnapshotSchema";

export const CourseSnapSchema = z
  .object({
    courseId: z.string().uuid(),
    modules: z
      .array(ModuleSnapshotSchema)
      .min(1, "Course must contain at least one module"),
  })
  .superRefine((c, ctx) => {
    // filter out nulls (new modules)
    const ids = c.modules
      .map((m) => m.moduleId)
      .filter((x): x is string => typeof x === "string");

    // --- check duplicate moduleIds ---
    const seen = new Set<string>();
    for (const id of ids) {
      if (seen.has(id)) {
        ctx.addIssue({
          code: "custom",
          path: ["modules"],
          message: `Duplicate moduleId: ${id}`,
        });
        break;
      }
      seen.add(id);
    }

    // --- check duplicates within tempIds only ---
    const temps = c.modules.map((m) => m.tempId);
    const dupTemp = (() => {
      const seen = new Set<string>();
      for (const t of temps) {
        if (seen.has(t)) return t;
        seen.add(t);
      }
      return null;
    })();
    if (dupTemp) {
      ctx.addIssue({
        code: "custom",
        path: ["modules"],
        message: `Duplicate module tempId: ${dupTemp}`,
      });
    }

    // 🟢 remove old “collision” check:
    // don't flag if a tempId matches an existing moduleId
    // (expected during sync between new and persisted)
  });

export function validateCourseSnapshot(payload: unknown) {
  const res = CourseSnapSchema.safeParse(payload);
  return res.success
    ? { ok: true as const, value: res.data }
    : { ok: false as const, errors: res.error.issues };
}