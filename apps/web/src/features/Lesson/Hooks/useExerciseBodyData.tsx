import type { LudoExercise } from "../../../../../../packages/types/Exercise/LudoExercise.ts";
import type { useExerciseInputResponse } from "./useExerciseInput.tsx";
import { useMemo } from "react";
import { shuffleArray } from "../Util/shuffleUtil.ts";

export function useExerciseBodyData(
  currentExercise: LudoExercise,
  inputState: useExerciseInputResponse
) {
  const { prompt, correctOptions, distractors } = currentExercise;

  const mergedOptions = useMemo(
    () => [...correctOptions, ...distractors],
    [currentExercise.id]
  );

  const options = useMemo(() => shuffleArray(mergedOptions), [mergedOptions]);

  const {
    currentExerciseInputs,
    clearExerciseInputs,
    popLastAnswer,
    isEmpty,
    replaceAnswerAt,
    setAnswerAt,
  } = inputState;

  return {
    prompt,
    options,
    popLastAnswer,
    isEmpty,
    currentExerciseInputs,
    clearExerciseInputs,
    replaceAnswerAt,
    setAnswerAt,
  };
}
