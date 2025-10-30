import { LessonSnapSchema } from "./LessonSnapSchema";
import { z } from "zod";

const nonEmpty = z.string().trim().min(1, "Required");

export const ModuleSnapshotSchema = z
  .object({
    moduleId: z.string().uuid().nullable(), // backend ID
    tempId: z.string().uuid(), // always required
    title: nonEmpty,
    lessons: z
      .array(LessonSnapSchema)
      .min(1, "Module must contain at least one lesson"),
  })
  .superRefine((m, ctx) => {
    // --- ID consistency ---
    if (m.moduleId && m.tempId !== m.moduleId) {
      ctx.addIssue({
        code: "custom",
        path: ["tempId"],
        message: "For existing modules, tempId must equal moduleId",
      });
    }

    // --- lesson orderIndex ---
    const orders = m.lessons.map((l) => l.orderIndex);
    const set = new Set(orders);
    if (set.size !== orders.length) {
      ctx.addIssue({
        code: "custom",
        path: ["lessons"],
        message: "Each lesson must have a unique orderIndex",
      });
    }

    const max = Math.max(...orders);
    const min = Math.min(...orders);
    if (min !== 1 || max !== m.lessons.length) {
      ctx.addIssue({
        code: "custom",
        path: ["lessons"],
        message: "orderIndex must be contiguous from 1 to lessons.length",
      });
    }

    // --- Lesson ID and tempId uniqueness ---
    const ids = m.lessons.map((l) => l.id).filter(Boolean) as string[];
    const tempIds = m.lessons.map((l) => l.tempId);

    // Allow overlap where id === tempId (same lesson)
    const normalizedTempIds = tempIds.filter(
      (t) => !ids.includes(t) // ignore identical pairs
    );

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

    const dupTemp = dup(normalizedTempIds);
    if (dupTemp)
      ctx.addIssue({
        code: "custom",
        path: ["lessons"],
        message: `Duplicate lesson tempId: ${dupTemp}`,
      });
  });

export function validateModuleSnapshot(payload: unknown) {
  const res = ModuleSnapshotSchema.safeParse(payload);
  return res.success
    ? { ok: true as const, value: res.data }
    : { ok: false as const, errors: res.error.issues };
}