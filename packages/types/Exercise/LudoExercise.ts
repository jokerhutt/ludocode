import type { ExerciseType } from "./ExerciseType";
import type { LudoExerciseOption } from "./LudoExerciseOption";

export type LudoExercise = {
  id: string;
  lessonId: string;
  title: string;
  subtitle?: string;
  exerciseMedia?: string;
  prompt?: string;
  exerciseType: ExerciseType;
  correctOptions: LudoExerciseOption[];
  distractors: LudoExerciseOption[];
  version: number;
  orderIndex: number;
};
