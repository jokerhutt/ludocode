import type { ExerciseSnap } from "../../../../../../packages/types/Builder/BuilderSnapshotTypes.ts";

export const parseExerciseError = (
  errorEntries: any,
  exercises: ExerciseSnap[]
): Record<string, boolean> => {
  let invalidIndexes: number[] = [];

  for (const err of errorEntries) {
    if (!!err && typeof err.message === "string") {
      const match = err.message.match(/\[(.*?)\]/);
      if (match) {
        const nums = match[1]
          .split(",")
          .map((x: string) => Number(x.trim()))
          .filter((n: number) => !isNaN(n));
        invalidIndexes.push(...nums);
      }
    }
  }

  const errorMap: Record<string, boolean> = {};

  invalidIndexes.forEach((idx) => {
    const ex = exercises[idx];
    if (ex) errorMap[ex.id] = true;
  });

  return errorMap;
};
