import type {
  CurriculumDraftLessonExercise,
  ExerciseType,
} from "@ludocode/types";

export function getExerciseTitle(
  exercise: CurriculumDraftLessonExercise,
): string {
  const header = exercise.blocks.find((b) => b.type === "header");
  return header ? header.content : "Untitled Exercise";
}

export function deriveExerciseType(
  exercise: CurriculumDraftLessonExercise,
): ExerciseType {
  if (!exercise.interaction) return "INFO";
  return exercise.interaction.type;
}
