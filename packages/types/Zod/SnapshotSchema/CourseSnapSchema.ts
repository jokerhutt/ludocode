import { z } from "zod";
import { ModuleSnapshotSchema } from "./ModuleSnapshotSchema";

export const CourseTypeSchema = z.enum(["COURSE", "SKILL_PATH"]);

export const CourseSubjectSnapSchema = z.object({
  slug: z.string(),
  name: z.string(),
});

export const CourseSnapSchema = z
  .object({
    courseId: z.string().uuid(),
    courseType: CourseTypeSchema,
    courseSubject: CourseSubjectSnapSchema,

    modules: z
      .array(ModuleSnapshotSchema)
      .min(1, "Course must contain at least one module"),
  })
  .superRefine((c, ctx) => {
    const ids = c.modules
      .map((m) => m.moduleId)
      .filter((x): x is string => typeof x === "string");

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
  });

export function validateCourseSnapshot(payload: unknown) {
  const res = CourseSnapSchema.safeParse(payload);
  return res.success
    ? { ok: true as const, value: res.data }
    : { ok: false as const, errors: res.error.issues };
}
