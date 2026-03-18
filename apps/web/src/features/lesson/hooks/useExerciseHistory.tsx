import type {
  AnswerToken,
  ExerciseAttempt,
  ExerciseSubmission,
} from "@ludocode/types/Exercise/LessonSubmissions.ts";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
import { useMemo } from "react";

type Args = {
  currentExercise: LudoExercise;
  submissionHistory: ExerciseSubmission[];
};

export function findLastCorrectAttempt(
  submissionHistory: ExerciseSubmission[],
  exerciseId: string,
): ExerciseAttempt | null {
  const submission = submissionHistory.find(
    (item) => item.exerciseId === exerciseId,
  );
  if (!submission) return null;

  return (
    submission.attempts
      .slice()
      .reverse()
      .find((attempt) => attempt.isCorrect) ?? null
  );
}

export function getAnswerTokensFromAttempt(
  attempt: ExerciseAttempt | null,
): AnswerToken[] | null {
  if (!attempt || !Array.isArray(attempt.answer)) return null;

  return attempt.answer.map((answer) =>
    typeof answer === "string"
      ? { id: undefined, value: answer }
      : { id: answer.id, value: answer.value ?? "" },
  );
}

export function getProjectSnapshotFromAttempt(
  attempt: ExerciseAttempt | null,
): ProjectSnapshot | null {
  if (!attempt || Array.isArray(attempt.answer)) return null;
  return attempt.answer.submission;
}

export function useExerciseHistory({
  currentExercise,
  submissionHistory,
}: Args) {
  const correctAttempt = useMemo(
    () => findLastCorrectAttempt(submissionHistory, currentExercise.id),
    [submissionHistory, currentExercise.id],
  );

  const correctInputs = useMemo(
    () => getAnswerTokensFromAttempt(correctAttempt),
    [correctAttempt],
  );

  const reviewSnapshot = useMemo(
    () => getProjectSnapshotFromAttempt(correctAttempt),
    [correctAttempt],
  );

  return {
    correctAttempt,
    correctInputs,
    reviewSnapshot,
    isComplete: correctAttempt != null,
  };
}
