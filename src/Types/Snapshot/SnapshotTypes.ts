import type { ExerciseType } from "../Exercise/ExerciseType";
import type { CourseSnapSchema } from "../Zod/CourseSnapSchema";
import type { ExerciseSnapSchema } from "../Zod/ExerciseSnapSchema";
import type { LessonSnapSchema } from "../Zod/LessonSnapSchema";
import type { ModuleSnapshotSchema } from "../Zod/ModuleSnapshotSchema";
import {z} from "zod"

export type ExerciseSnap = z.infer<typeof ExerciseSnapSchema>;
export type LessonSnap   = z.infer<typeof LessonSnapSchema>;
export type ModuleSnap   = z.infer<typeof ModuleSnapshotSchema>;
export type CourseSnap   = z.infer<typeof CourseSnapSchema>;