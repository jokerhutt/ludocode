import type {
  ExerciseAnswer,
  ExerciseAttempt,
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
  interactionType: "SELECT" | "CLOZE" | "EXECUTABLE" | null | undefined,
): ExerciseAnswer {
  if (!interactionType) {
    return { type: "SELECT", pickedValue: "INFO" };
  }
  if (interactionType === "SELECT") {
    return { type: "SELECT", pickedValue: attempt.answer[0].value };
  }
  if (interactionType === "EXECUTABLE") {
    const raw = attempt.answer[0]?.value ?? "{}";
    try {
      const parsed = JSON.parse(raw) as {
        files?: { name?: string; content?: string }[];
        output?: string;
      };
      return {
        type: "EXECUTABLE",
        files: (parsed.files ?? []).map((file) => ({
          name: file.name ?? "",
          content: file.content ?? "",
        })),
        output: parsed.output ?? "",
      };
    } catch {
      return {
        type: "EXECUTABLE",
        files: [],
        output: raw,
      };
    }
  }
  return {
    type: "CLOZE",
    valuesByBlank: attempt.answer.map((t) => t.value),
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
