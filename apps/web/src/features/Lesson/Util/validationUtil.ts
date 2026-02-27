import type { AnswerToken } from "@ludocode/types";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";

const norm = (s: string) => (s ?? "").trim();

export function areAllFilled(buffer: AnswerToken[]) {
  return buffer.every((t) => norm(t.value) !== "");
}

export function areAllValid(buffer: AnswerToken[], exercise: LudoExercise) {
  if (!exercise.interaction) return false;

  const allowed = new Set<string>();

  if (exercise.interaction.type === "CLOZE") {
    for (const opt of exercise.interaction.options) {
      allowed.add(norm(opt));
    }
  } else if (exercise.interaction.type === "SELECT") {
    for (const item of exercise.interaction.items) {
      allowed.add(norm(item));
    }
  }

  return buffer.every((t) => allowed.has(norm(t.value)));
}

export function checkCorrect(
  buffer: AnswerToken[],
  exercise: LudoExercise,
): boolean {
  if (!exercise.interaction) return false;

  if (exercise.interaction.type === "CLOZE") {
    const blanks = exercise.interaction.blanks
      .slice()
      .sort((a, b) => a.index - b.index);

    if (buffer.length !== blanks.length) return false;

    return blanks.every((blank, i) =>
      blank.correctOptions.map(norm).includes(norm(buffer[i].value)),
    );
  }

  if (exercise.interaction.type === "SELECT") {
    if (buffer.length !== 1) return false;
    return norm(buffer[0].value) === norm(exercise.interaction.correctValue);
  }

  return false;
}
