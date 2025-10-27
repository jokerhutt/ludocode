import type { ExerciseType } from "./ExerciseType";
import type { LudoExerciseOption } from "./LudoExerciseOption";

export type LudoExercise = {
  id: string;
  lessonId: string;
  title: string;
  prompt?: string;
  exerciseType: ExerciseType;
  exerciseOptions: LudoExerciseOption[];
  version: number
};
