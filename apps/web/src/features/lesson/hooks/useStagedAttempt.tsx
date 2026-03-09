import type { ExerciseAttempt } from "@ludocode/types/Exercise/LessonSubmissions.ts";
import { useCallback, useState } from "react";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import {
  areAllFilled,
  areAllValid,
  checkCorrect,
} from "@/features/lesson/util/validationUtil.ts";
import { playSound } from "@/sound/soundManager.ts";
import type { ExercisePhase } from "@/features/lesson/zones/LessonFooter.tsx";
import type { AnswerToken } from "@ludocode/types";

type useStagedAttemptProps = {
  currentExerciseInputs: AnswerToken[];
  currentExercise: LudoExercise;
  playAudio?: boolean;
};

export type useStagedAttemptResponse = {
  canSubmit: boolean;
  currentlyStagedAttempt: ExerciseAttempt | null;
  stageAttempt: () => void;
  clearStaged: () => void;
  restoreStaged: (attempt: ExerciseAttempt) => void;
  phase: ExercisePhase;
  hasStaged: boolean;
};

export function useStagedAttempt({
  currentExerciseInputs,
  currentExercise,
  playAudio = true,
}: useStagedAttemptProps): useStagedAttemptResponse {
  const allSlotsFilled = areAllFilled(currentExerciseInputs);
  const allSlotsValid =
    !currentExercise.interaction ||
    (allSlotsFilled && areAllValid(currentExerciseInputs, currentExercise));

  const [currentlyStagedAttempt, setCurrentlyStagedAttempt] =
    useState<ExerciseAttempt | null>(null);

  const clearCurrentlyStagedAttempt = useCallback(
    () => setCurrentlyStagedAttempt(null),
    [],
  );

  const restoreStaged = useCallback(
    (attempt: ExerciseAttempt) => setCurrentlyStagedAttempt(attempt),
    [],
  );

  const playResultAudio = (isCorrect: boolean) => {
    if (isCorrect) {
      playSound("correct");
    } else {
      playSound("wrong");
    }
  };

  const stageAttempt = useCallback(() => {
    if (!allSlotsValid) return;
    const isCorrect = checkCorrect(currentExerciseInputs, currentExercise);
    if (playAudio) {
      playResultAudio(isCorrect);
    }
    setCurrentlyStagedAttempt({
      exerciseId: currentExercise.id,
      isCorrect,
      answer: [...currentExerciseInputs],
    });
  }, [allSlotsValid, playAudio, currentExerciseInputs, currentExercise]);

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
    restoreStaged,
    phase,
    hasStaged,
  };
}
