import { useCallback, useState } from "react";
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
import { playSound } from "@/Sounds/soundManager";
import type { ExercisePhase } from "@/components/Molecules/Footer/LessonFooter";

type Args = {
  exercises: LudoExercise[];
  lesson: LudoLesson;
  position: number;
};

export type AnswerToken = { id?: string; value: string };

export function useExerciseFlow({
  exercises,
  lesson,
  position,
}: Args): ExerciseFlowResponse {
  const index = position - 1;

  const [stagedAttempt, setStagedAttempt] =
    useState<ExerciseAttempt | null>(null);

  const [commitedExerciseSubmissions, setCommittedExerciseSubmissions] = useState<
    ExerciseSubmission[]
  >([]);

  const clearStagedAttempt = () => setStagedAttempt(null);
  const mergeExerciseSubmissions = (merged: ExerciseSubmission[]) =>
    setCommittedExerciseSubmissions(merged);

  const currentExercise = exercises[index];
  const version = currentExercise.version;
  const gapCount = getGapCount(currentExercise);

  const bufferState = useAttemptBuffer({
    exerciseId: currentExercise.id,
    gapCount: gapCount,
    submissions: commitedExerciseSubmissions,
  });

  const { buffer, clear } = bufferState;

  const allSlotsFilled = areAllFilled(buffer);
  const allSlotsValid =
    currentExercise.exerciseType == "INFO" ||
    (allSlotsFilled && areAllValid(buffer, currentExercise));

  const submitAttemptBuffer = useCallback(() => {
    if (!allSlotsValid) return;
    const isCorrect = checkCorrect(buffer, currentExercise);
    if (isCorrect) {
      playSound("correct");
    } else {
      playSound("wrong");
    }
    setStagedAttempt({
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
    submissionBuffer: stagedAttempt,
    clearSubmissionBuffer: clearStagedAttempt,
    exerciseSubmissions: commitedExerciseSubmissions,
    mergeExerciseSubmissions,
    version,
  });

  const hasStaged = stagedAttempt != null;

  const phase: ExercisePhase = !hasStaged
    ? "DEFAULT"
    : stagedAttempt.isCorrect
    ? "CORRECT"
    : "INCORRECT";
  const isLocked = stagedAttempt !== null;

  return {
    currentExercise,
    bufferState,
    isLocked,
    clearSubmissionBuffer: clearStagedAttempt,
    submissionBuffer: stagedAttempt,
    submitAttemptBuffer,
    commitAttempt,
    canSubmit: allSlotsValid,
    phase: phase,
  };
}

export type ExerciseFlowResponse = {
  currentExercise: LudoExercise;
  bufferState: AttemptBufferResponse;
  isLocked: boolean;
  clearSubmissionBuffer: () => void;
  submissionBuffer: ExerciseAttempt | null;
  submitAttemptBuffer: () => void;
  commitAttempt: (info?: boolean) => void;
  canSubmit: boolean;
  phase: ExercisePhase;
};
