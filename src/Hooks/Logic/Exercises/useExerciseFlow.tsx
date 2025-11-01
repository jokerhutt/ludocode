import { useCallback, useEffect, useRef, useState } from "react";
import {
  areAllFilled,
  areAllValid,
  checkCorrect,
  getGapCount,
} from "./exerciseHelpers";
import {
  useAttemptBuffer,
  type AttemptBufferResponse,
} from "./useAttemptBuffer";
import type {
  ExerciseAttempt,
  ExerciseSubmission,
} from "../../../Types/Exercise/LessonSubmissionTypes";
import type { LudoExercise } from "../../../Types/Exercise/LudoExercise";
import type { LudoLesson } from "../../../Types/Catalog/LudoLesson";
import { useCommitAttempt } from "./useCommitAttempt";

type Args = {
  exercises: LudoExercise[];
  lesson: LudoLesson;
  position: number;
};

export function useExerciseFlow({
  exercises,
  lesson,
  position,
}: Args): ExerciseFlowResponse {
  const index = position - 1;

  const [submissionBuffer, setSubmissionBuffer] =
    useState<ExerciseAttempt | null>(null);

  const [exerciseSubmissions, setExerciseSubmissions] = useState<
    ExerciseSubmission[]
  >([]);

  const clearSubmissionBuffer = () => setSubmissionBuffer(null);
  const mergeExerciseSubmissions = (merged: ExerciseSubmission[]) =>
    setExerciseSubmissions(merged);

  const currentExercise = exercises[index];
  const version = currentExercise.version
  const gapCount = getGapCount(currentExercise);

  const bufferState = useAttemptBuffer({
    exerciseId: currentExercise.id,
    gapCount: gapCount,
    submissions: exerciseSubmissions,
  });

  const { buffer, clear } = bufferState;

  const allSlotsFilled = areAllFilled(buffer);
  const allSlotsValid = (currentExercise.exerciseType == "INFO") || allSlotsFilled && areAllValid(buffer, currentExercise);

  const submitAttemptBuffer = useCallback(() => {
    if (!allSlotsValid) return;
    const isCorrect = checkCorrect(buffer, currentExercise);
    setSubmissionBuffer({
      exerciseId: currentExercise.id,
      isCorrect,
      answer: [...buffer],
    });
  }, [allSlotsValid, buffer, currentExercise]);

  const { commitAttempt } = useCommitAttempt({
    position,
    exercises,
    exerciseId: currentExercise.id,
    lesson,
    clear,
    submissionBuffer,
    clearSubmissionBuffer,
    exerciseSubmissions,
    mergeExerciseSubmissions,
    version
  });

  return {
    currentExercise,
    bufferState,
    submissionBuffer,
    submitAttemptBuffer,
    commitAttempt,
    canSubmit: allSlotsValid,
  };
}

export type ExerciseFlowResponse = {
  currentExercise: LudoExercise;
  bufferState: AttemptBufferResponse;
  submissionBuffer: ExerciseAttempt | null;
  submitAttemptBuffer: () => void;
  commitAttempt: (info?: boolean) => void;
  canSubmit: boolean;
};
