import type {
  ExerciseAttempt,
  ExerciseSubmission,
  LessonSubmission,
} from "@ludocode/types/Exercise/LessonSubmissions.ts";

export function convertStagedAttemptIntoExerciseSubmission(
  attempt: ExerciseAttempt,
  version: number,
): ExerciseSubmission {
  return {
    exerciseId: attempt.exerciseId,
    attempts: [attempt],
    version,
  };
}

export function convertToLessonSubmission(
  lessonId: string,
  submissions: ExerciseSubmission[],
): LessonSubmission {
  return {
    submissionId: crypto.randomUUID(),
    lessonId: lessonId,
    submissions: submissions,
  };
}

export function createInfoExerciseAttempt(exId: string): ExerciseAttempt {
  return {
    exerciseId: exId,
    isCorrect: true,
    answer: [{ id: crypto.randomUUID(), value: "I" }],
  };
}

export function mergeStagedAttemptIntoExerciseSubmissions(
  subs: ExerciseSubmission[],
  attempt: ExerciseAttempt,
  version: number,
): ExerciseSubmission[] {
  const i = subs.findIndex((s) => s.exerciseId === attempt.exerciseId);

  if (i === -1) {
    return [
      ...subs,
      convertStagedAttemptIntoExerciseSubmission(attempt, version),
    ];
  }

  const next = subs.slice();
  next[i] = { ...next[i], attempts: [...next[i].attempts, attempt] };
  return next;
}
