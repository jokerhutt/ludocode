import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";

export function hasExerciseOutput(exercise: LudoExercise): boolean {
  if (exercise.interaction?.type === "CLOZE" && exercise.interaction.output) {
    return true;
  }

  return exercise.blocks.some(
    (block) => block.type === "code" && Boolean(block.output),
  );
}
