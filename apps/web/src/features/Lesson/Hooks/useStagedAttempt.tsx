import type { ExerciseAttempt } from "../../../../../../packages/types/Exercise/LessonSubmissions.ts";
import { useCallback, useState } from "react";
import type { LudoExercise } from "../../../../../../packages/types/Exercise/LudoExercise.ts";
import { areAllFilled, areAllValid, checkCorrect } from "../Util/validationUtil.ts";
import { playSound } from "@/sound/soundManager.ts";
import type { ExercisePhase } from "@/features/Lesson/Components/Zone/LessonFooter.tsx";
import type { AnswerToken } from "@ludocode/types";

type useStagedAttemptProps = {
  currentExerciseInputs: AnswerToken[];
  currentExercise: LudoExercise;
};

export type useStagedAttemptResponse = {
  canSubmit: boolean;
  currentlyStagedAttempt: ExerciseAttempt | null;
  stageAttempt: () => void;
  clearStaged: () => void;
  phase: ExercisePhase;
  hasStaged: boolean;
};

export function useStagedAttempt({
  currentExerciseInputs,
  currentExercise,
}: useStagedAttemptProps): useStagedAttemptResponse {
  
  const allSlotsFilled = areAllFilled(currentExerciseInputs);
  const allSlotsValid =
    currentExercise.exerciseType === "INFO" ||
    (allSlotsFilled && areAllValid(currentExerciseInputs, currentExercise));

  const [currentlyStagedAttempt, setCurrentlyStagedAttempt] =
    useState<ExerciseAttempt | null>(null);
  const clearCurrentlyStagedAttempt = useCallback(
    () => setCurrentlyStagedAttempt(null),
    []
  );

  const stageAttempt = useCallback(() => {
    if (!allSlotsValid) return;
    const isCorrect = checkCorrect(currentExerciseInputs, currentExercise);
    if (isCorrect) {
      playSound("correct");
    } else {
      playSound("wrong");
    }
    setCurrentlyStagedAttempt({
      exerciseId: currentExercise.id,
      isCorrect,
      answer: [...currentExerciseInputs],
    });
  }, [allSlotsValid, currentExerciseInputs, currentExercise]);

  const hasStaged = currentlyStagedAttempt != null;

  const phase: ExercisePhase = !hasStaged
    ? "DEFAULT"
    : currentlyStagedAttempt.isCorrect
    ? "CORRECT"
    : "INCORRECT";

  const canSubmit = allSlotsValid;

  return {
    canSubmit,
    currentlyStagedAttempt,
    stageAttempt,
    clearStaged: clearCurrentlyStagedAttempt,
    phase,
    hasStaged,
  };
}
