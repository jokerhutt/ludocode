import type {
  ExerciseAttempt,
  ExerciseAttemptRequest,
  ExerciseSubmission,
  LessonSubmissionRequest,
} from "@ludocode/types/Exercise/LessonSubmissions.ts";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";

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

function convertAttemptToRequest(
  attempt: ExerciseAttempt,
  interactionType: "SELECT" | "CLOZE" | null | undefined,
): ExerciseAttemptRequest {
  if (!interactionType) {
    return { answer: { type: "SELECT", pickedValue: "INFO" } };
  }
  if (interactionType === "SELECT") {
    return { answer: { type: "SELECT", pickedValue: attempt.answer[0].value } };
  }
  return {
    answer: {
      type: "CLOZE",
      valuesByBlank: attempt.answer.map((t) => t.value),
    },
  };
}

export function convertToLessonSubmission(
  courseId: string,
  lessonId: string,
  submissions: ExerciseSubmission[],
  exercises: LudoExercise[],
): LessonSubmissionRequest {
  return {
    submissionId: crypto.randomUUID(),
    courseId,
    lessonId,
    exercises: submissions.map((sub) => {
      const exercise = exercises.find((e) => e.id === sub.exerciseId);
      const interactionType = exercise?.interaction?.type ?? null;
      return {
        exerciseId: sub.exerciseId,
        version: sub.version,
        attempts: sub.attempts.map((attempt) =>
          convertAttemptToRequest(attempt, interactionType),
        ),
      };
    }),
  };
}

export function createInfoExerciseAttempt(exId: string): ExerciseAttempt {
  return {
    exerciseId: exId,
    isCorrect: true,
    answer: [{ id: crypto.randomUUID(), value: "INFO" }],
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
