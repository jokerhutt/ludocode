import type {
  ExerciseAttempt,
  ExerciseSubmission,
} from "../../../Types/Exercise/LessonSubmissionTypes";
import type { LudoExercise } from "../../../Types/Exercise/LudoExercise";

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

export function mergeAttempt(
  subs: ExerciseSubmission[],
  attempt: ExerciseAttempt,
  version: number
): ExerciseSubmission[] {
  const i = subs.findIndex((s) => s.exerciseId === attempt.exerciseId);
  if (i === -1)
    return [...subs, { exerciseId: attempt.exerciseId, attempts: [attempt], version}];
  const next = subs.slice();
  next[i] = { ...next[i], attempts: [...next[i].attempts, attempt] };
  return next;
}


type Opt = { content: string; answerOrder: number | null | undefined };

const norm = (s: string) => (s ?? "").trim();

export const getGapCount = (exercise: LudoExercise) =>
  exercise.exerciseType === "CLOZE"
    ? ((exercise.prompt ?? exercise.title ?? "").match(/___/g) ?? []).length
    : exercise.exerciseType === "INFO"
    ? 0
    : 1;

export function areAllFilled(buffer: string[]) {
  return buffer.every((slot) => norm(slot) !== "");
}

export function areAllValid(buffer: string[], exercise: LudoExercise) {
  const allowed = new Set(
    [...exercise.correctOptions, ...exercise.distractors].map((o) =>
      norm(o.content)
    )
  );
  return buffer.every((slot) => allowed.has(norm(slot)));
}

export function checkCorrect(buffer: string[], exercise: LudoExercise): boolean {
  const correct = exercise.correctOptions
    .slice()
    .sort((a: Opt, b: Opt) => (a.answerOrder ?? 0) - (b.answerOrder ?? 0))
    .map((o) => norm(o.content));

  const candidate = buffer.map(norm);

  if (candidate.length !== correct.length) return false;
  for (let i = 0; i < candidate.length; i++) {
    if (candidate[i] !== correct[i]) return false;
  }
  return true;
}
