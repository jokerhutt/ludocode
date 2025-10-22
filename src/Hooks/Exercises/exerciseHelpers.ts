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
  return sub.attempts[sub.attempts.length - 1] ?? null;
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

  if (exercise.exerciseOptions.some(o => o.answerOrder === null)) {
    return false;
  }

  if (!buffer.every(s => s && s.trim() !== "")) {
    return false;
  }

  const expected = exercise.exerciseOptions
    .slice()
    .sort((a, b) => a.answerOrder! - b.answerOrder!)
    .map(o => o.content.trim());

  return (
    JSON.stringify(buffer.map(s => s.trim())) === JSON.stringify(expected)
  );
}
