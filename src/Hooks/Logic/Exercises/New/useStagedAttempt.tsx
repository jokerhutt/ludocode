import type { ExerciseAttempt } from "@/Types/Exercise/LessonSubmissionTypes";
import { useCallback, useState } from "react";
import type { AnswerToken } from "../useExerciseFlow";
import type { LudoExercise } from "@/Types/Exercise/LudoExercise";
import { areAllFilled, areAllValid, checkCorrect } from "../exerciseHelpers";
import { playSound } from "@/Sounds/soundManager";
import type { ExercisePhase } from "@/components/Molecules/Footer/LessonFooter";

type useStagedAttemptProps = {
  currentExerciseInputs: AnswerToken[];
  currentExercise: LudoExercise;
};

export type useStagedAttemptResponse = {
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
    currentExercise.exerciseType == "INFO" ||
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

  return {
    currentlyStagedAttempt,
    stageAttempt,
    clearStaged: clearCurrentlyStagedAttempt,
    phase,
    hasStaged,
  };
}
