import type { LudoLesson } from "@/types/Catalog/LudoLesson";
import type { LudoExercise } from "@/types/Exercise/LudoExercise";
import { useChangeExercise } from "./useChangeExercise";

import { useCallback } from "react";
import type { ExerciseAttempt } from "@/types/Exercise/LessonSubmissions.ts";
import { useStagedAttempt } from "./useStagedAttempt";
import { useExerciseInput, type useExerciseInputResponse } from "./useExerciseInput";
import { useCommittedSubmissions } from "./useCommittedSubmissions";
import type { ExercisePhase } from "@/features/Exercise/UI/Footer/LessonFooter";

export type AnswerToken = { id?: string; value: string };

type Args = { exercises: LudoExercise[]; lesson: LudoLesson; position: number };

export function useExercise({
  exercises,
  lesson,
  position,
}: Args): useExerciseResponse {
  const index = position - 1;
  const currentExercise = exercises[index];
  const currentExerciseId = currentExercise.id;
  const lessonId = lesson.id;
  const isInfo = currentExercise.exerciseType === "INFO";

  const exerciseInput = useExerciseInput({ currentExercise });
  const { currentExerciseInputs, clearExerciseInputs, initializeInputs } =
    exerciseInput;

  const stagedAttempt = useStagedAttempt({
    currentExerciseInputs,
    currentExercise,
  });
  const {
    stageAttempt,
    clearStaged,
    phase,
    currentlyStagedAttempt,
    canSubmit,
    hasStaged,
  } = stagedAttempt;

  const { commitStagedAttemptIntoSubmissions } = useCommittedSubmissions({
    currentExercise,
    position,
    exercises,
    clearExerciseInputs,
    clearStaged,
    lessonId,
  });

  useChangeExercise({ initializeInputs, currentExerciseId, submissions: [] });

  const handleExerciseButtonClick = useCallback(() => {
    if (!canSubmit) return;
    if (isInfo || hasStaged) {
      commitStagedAttemptIntoSubmissions(currentlyStagedAttempt);
    } else {
      stageAttempt();
    }
  }, [
    canSubmit,
    currentExercise.exerciseType,
    hasStaged,
    currentlyStagedAttempt,
    commitStagedAttemptIntoSubmissions,
    stageAttempt,
  ]);

  return {
    phase,
    canSubmit,
    currentExercise,
    currentlyStagedAttempt,
    handleExerciseButtonClick,
    inputState: exerciseInput,
  };
}

export type useExerciseResponse = {
  currentExercise: LudoExercise;
  canSubmit: boolean;
  phase: ExercisePhase;
  currentlyStagedAttempt: ExerciseAttempt | null;
  handleExerciseButtonClick: () => void;
  inputState: useExerciseInputResponse;
};
