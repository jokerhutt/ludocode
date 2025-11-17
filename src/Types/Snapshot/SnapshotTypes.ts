import type { ExerciseType } from "../Exercise/ExerciseType";
import type { CourseSnapSchema } from "../Zod/SnapshotSchema/CourseSnapSchema";
import type { ExerciseSnapSchema, OptionSnap } from "../Zod/SnapshotSchema/ExerciseSnapSchema";
import type { LessonSnapSchema } from "../Zod/SnapshotSchema/LessonSnapSchema";
import type { ModuleSnapshotSchema } from "../Zod/SnapshotSchema/ModuleSnapshotSchema";
import { z } from "zod";

export type ExerciseSnap = z.infer<typeof ExerciseSnapSchema>;
export type LessonSnap = z.infer<typeof LessonSnapSchema>;
export type ModuleSnap = z.infer<typeof ModuleSnapshotSchema>;
export type CourseSnap = z.infer<typeof CourseSnapSchema>;
export type OptionSnap = z.infer<typeof OptionSnap>;
