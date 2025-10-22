import { useCallback, useEffect, useState } from "react";
import type { LudoLesson } from "../../Types/Catalog/LudoLesson";
import type { LudoExercise } from "../../Types/Exercise/LudoExercise";
import type {
  ExerciseAttempt,
  ExerciseSubmission,
} from "../../Types/Exercise/LessonSubmissionTypes";
import { areAllFilled, areAllValid, checkCorrect } from "./exerciseHelpers";
import {
  useAttemptBuffer,
  type AttemptBufferResponse,
} from "./useAttemptBuffer";
import { getGapCount, router } from "../../routes/router";
import { ludoNavigation } from "../../routes/ludoNavigation";

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
  const [exerciseSubmissions, setExerciseSubmissions] = useState<
    ExerciseSubmission[]
  >([]);

  const index = position - 1;

  const [submissionBuffer, setSubmissionBuffer] =
    useState<ExerciseAttempt | null>(null);

  const currentExercise = exercises[index];
  const gapCount = getGapCount(currentExercise);

  const bufferState = useAttemptBuffer({
    exerciseId: currentExercise.id,
    gapCount: gapCount,
    submissions: exerciseSubmissions,
  });

  const { buffer, clear } = bufferState;

  const addAttempt = useCallback((attempt: ExerciseAttempt) => {
    const exerciseId = attempt.exerciseId;
    setExerciseSubmissions((prev) => {
      const existing = prev.find((s) => s.exerciseId === exerciseId);
      if (!existing) {
        return [...prev, { exerciseId, attempts: [attempt] }];
      }
      return prev.map((s) =>
        s.exerciseId === exerciseId
          ? { ...s, attempts: [...s.attempts, attempt] }
          : s
      );
    });
  }, []);

  const allSlotsFilled = areAllFilled(buffer);
  const allSlotsValid = allSlotsFilled && areAllValid(buffer, currentExercise);

  const submitAttemptBuffer = useCallback(() => {
    if (!allSlotsValid) return;
    const isCorrect = checkCorrect(buffer, currentExercise);
    setSubmissionBuffer({
      exerciseId: currentExercise.id,
      isCorrect,
      answer: [...buffer],
    });
  }, [allSlotsValid, buffer, currentExercise]);

  const commitAttempt = useCallback(() => {
    if (!submissionBuffer) return;
    addAttempt(submissionBuffer);

    if (submissionBuffer.isCorrect) {
      setSubmissionBuffer(null);
      router.navigate(ludoNavigation.nextExercise(lesson.id, position));
    } else {
      clear();
      setSubmissionBuffer(null);
    }
  }, [submissionBuffer, addAttempt, lesson.id, position, clear]);

  return {
    currentExercise,
    bufferState,
    submitAttemptBuffer,
    commitAttempt,
    canSubmit: allSlotsValid,
  };
}

export type ExerciseFlowResponse = {
    currentExercise: LudoExercise;
  bufferState: AttemptBufferResponse;
  submitAttemptBuffer: () => void;
  commitAttempt: () => void;
  canSubmit: boolean;
};
