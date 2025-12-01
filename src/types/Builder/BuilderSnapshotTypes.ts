import type { Info } from "lucide-react";
import type { CourseSnapSchema } from "../Zod/SnapshotSchema/CourseSnapSchema";
import type {
    Analyze,
    Cloze,
  ExerciseSnapSchema,
  OptionSnap,
  Trivia,
} from "../Zod/SnapshotSchema/ExerciseSnapSchema";
import type { LessonSnapSchema } from "../Zod/SnapshotSchema/LessonSnapSchema";
import type { ModuleSnapshotSchema } from "../Zod/SnapshotSchema/ModuleSnapshotSchema";
import { z } from "zod";

export type ExerciseSnap = z.infer<typeof ExerciseSnapSchema>;
export type LessonSnap = z.infer<typeof LessonSnapSchema>;
export type ModuleSnap = z.infer<typeof ModuleSnapshotSchema>;
export type CourseSnap = z.infer<typeof CourseSnapSchema>;
export type OptionSnap = z.infer<typeof OptionSnap>;

export type ClozeSnap = z.infer<typeof Cloze>;
export type AnalyzeSnap = z.infer<typeof Analyze>;
export type TriviaSnap = z.infer<typeof Trivia>;
export type InfoSnap = z.infer<typeof Info>;
