import type {
  ExerciseAttempt,
  ExerciseSubmission,
  LessonSubmission,
} from "../../../Types/Exercise/LessonSubmissionTypes";
import type { LudoExercise } from "../../../Types/Exercise/LudoExercise";
import type { AnswerToken } from "./useExerciseFlow";

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

export function convertStagedAttemptIntoExerciseSubmission(
  attempt: ExerciseAttempt,
  version: number
): ExerciseSubmission {
  return {
    exerciseId: attempt.exerciseId,
    attempts: [attempt],
    version,
  };
}

export function convertToLessonSubmission(
  lessonId: string,
  submissions: ExerciseSubmission[]
): LessonSubmission {
  return {
    id: crypto.randomUUID(),
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
  version: number
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

const norm = (s: string) => (s ?? "").trim();

export const getGapCount = (exercise: LudoExercise) =>
  exercise.exerciseType === "CLOZE"
    ? ((exercise.prompt ?? exercise.title ?? "").match(/___/g) ?? []).length
    : exercise.exerciseType === "INFO"
    ? 0
    : 1;

export function areAllFilled(buffer: AnswerToken[]) {
  return buffer.every((t) => norm(t.value) !== "");
}

export function areAllValid(buffer: AnswerToken[], exercise: LudoExercise) {
  const allowed = new Set(
    [...exercise.correctOptions, ...exercise.distractors].map((o) =>
      norm(o.content)
    )
  );
  return buffer.every((t) => allowed.has(norm(t.value)));
}

export function checkCorrect(
  buffer: AnswerToken[],
  exercise: LudoExercise
): boolean {
  const correct = exercise.correctOptions
    .slice()
    .sort((a, b) => a.answerOrder! - b.answerOrder!)
    .map((o) => norm(o.content));

  const candidate = buffer.map((t) => norm(t.value));

  if (candidate.length !== correct.length) return false;
  return candidate.every((c, i) => c === correct[i]);
}
