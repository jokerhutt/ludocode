import type {
  ExerciseAttempt,
  ExerciseSubmission,
} from "../../Types/Exercise/LessonSubmissionTypes";
import type { LudoExercise } from "../../Types/Exercise/LudoExercise";

export function findLastAttempt(
  submissions: ExerciseSubmission[],
  exerciseId: string
): ExerciseAttempt | null {
  const sub = submissions.find((s) => s.exerciseId === exerciseId);
  if (!sub) return null;
  return sub.attempts.slice().reverse().find(a => a.isCorrect) ?? null;
}

export function areAllFilled(buffer: string[]) {
  return buffer.every((slot) => slot.trim() !== "");
}

export function areAllValid(buffer: string[], exercise: LudoExercise) {
  return buffer.every((slot) => {
    return exercise.exerciseOptions
      .map((option) => option.content)
      .includes(slot.trim());
  });
}

export function checkCorrect(buffer: string[], exercise: LudoExercise): boolean {
  const correctOptions = exercise.exerciseOptions
    .filter(o => o.answerOrder !== null);

  const expected = correctOptions
    .sort((a, b) => a.answerOrder! - b.answerOrder!)
    .map(o => o.content.trim());

  const candidate = buffer.map(s => (s ?? "").trim());

  if (candidate.length !== expected.length) return false;

  if (candidate.some(s => s === "")) return false;

  const correctContents = new Set(correctOptions.map(o => o.content.trim()));
  if (candidate.some(s => !correctContents.has(s))) return false;

  return candidate.every((s, i) => s === expected[i]);
}
