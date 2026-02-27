import type {
  ExerciseAttempt,
  ExerciseSubmission,
} from "@ludocode/types/Exercise/LessonSubmissions.ts";
import { useEffect } from "react";

type Args = {
  initializeInputs: (attempt: ExerciseAttempt | null) => void;
  currentExerciseId: string;
  submissions: ExerciseSubmission[];
};

export function useChangeExercise({
  initializeInputs,
  currentExerciseId,
  submissions,
}: Args) {
  useEffect(() => {
    const lastAttempt = findLastAttempt(submissions, currentExerciseId);
    initializeInputs(lastAttempt);
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
