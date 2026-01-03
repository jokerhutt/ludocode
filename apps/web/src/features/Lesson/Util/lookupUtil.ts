import type { ExerciseAttempt, ExerciseSubmission } from "@ludocode/types/Exercise/LessonSubmissions.ts";

export function findLastAttempt(
  submissions: ExerciseSubmission[],
  exerciseId: string
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