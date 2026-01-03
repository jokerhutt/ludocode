import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import type { useExerciseInputResponse } from "@/features/Lesson/Hooks/useExerciseInput.tsx";
import { useMemo } from "react";
import { shuffleArray } from "@/features/Lesson/Util/shuffleUtil.ts";

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
