import type { LudoExercise } from "../../../../../../packages/types/Exercise/LudoExercise.ts";

export const getGapCount = (exercise: LudoExercise) =>
  exercise.exerciseType === "CLOZE"
    ? ((exercise.prompt ?? exercise.title ?? "").match(/___/g) ?? []).length
    : exercise.exerciseType === "INFO"
    ? 0
    : 1;

export const splitPromptGaps = (prompt: string, blankField: string) => {
  return prompt.split(blankField);
};

export const findNextEmptyIndex = (index: number, from: string[]) => {
  return from.findIndex((value, idx) => idx > index && value === "");
};
