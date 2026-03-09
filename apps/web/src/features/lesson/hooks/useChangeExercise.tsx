import type {
  ExerciseAttempt,
  ExerciseSubmission,
} from "@ludocode/types/Exercise/LessonSubmissions.ts";
import { useEffect } from "react";

type Args = {
  initializeInputs: (attempt: ExerciseAttempt | null) => void;
  clearStaged: () => void;
  restoreStaged: (attempt: ExerciseAttempt) => void;
  currentExerciseId: string;
  submissions: ExerciseSubmission[];
};

export function useChangeExercise({
  initializeInputs,
  clearStaged,
  restoreStaged,
  currentExerciseId,
  submissions,
}: Args) {
  useEffect(() => {
    clearStaged();
    const lastAttempt = findLastAttempt(submissions, currentExerciseId);
    initializeInputs(lastAttempt);
    if (lastAttempt) {
      restoreStaged(lastAttempt);
    }
  }, [currentExerciseId]);
}

function findLastAttempt(
  submissions: ExerciseSubmission[],
  exerciseId: string,
): ExerciseAttempt | null {
  const sub = submissions.find((s) => s.exerciseId === exerciseId);
  if (!sub) return null;
  return (
    sub.attempts
      .slice()
      .reverse()
      .find((a) => a.isCorrect) ?? null
  );
}
