import type { LudoExercise } from "@/types/Exercise/LudoExercise.ts";
import type { AnswerToken } from "../Hooks/useExercise.tsx";

const norm = (s: string) => (s ?? "").trim();

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
