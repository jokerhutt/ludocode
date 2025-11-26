import type { LudoExercise } from "@/Types/Exercise/LudoExercise";
import type { useExerciseInputResponse } from "./useExerciseInput";

export function useExerciseBodyData(
  currentExercise: LudoExercise,
  inputState: useExerciseInputResponse
) {
  const { prompt, correctOptions, distractors } = currentExercise;
  const options = [...correctOptions, ...distractors];
  const { currentExerciseInputs, replaceAnswerAt, setAnswerAt } = inputState;

  return {
    prompt,
    options,
    currentExerciseInputs,
    replaceAnswerAt,
    setAnswerAt,
  };
}
