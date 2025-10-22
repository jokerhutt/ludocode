import { useEffect, useState } from "react";
import { findLastAttempt } from "./exerciseHelpers";
import type { ExerciseSubmission } from "../../Types/Exercise/LessonSubmissionTypes";

type Args = {
  exerciseId: string;
  gapCount: number;
  submissions: ExerciseSubmission[];
};

export function useAttemptBuffer({ exerciseId, gapCount, submissions }: Args) {
  const [buffer, setBuffer] = useState<string[]>(() =>
    Array(gapCount).fill("")
  );

  useEffect(() => {
    changeBufferExercise();
  }, [exerciseId, gapCount]);

  const changeBufferExercise = () => {
    const lastAttempt = findLastAttempt(submissions, exerciseId);
    if (lastAttempt != null) {
      setBuffer([...lastAttempt.answer]);
    } else {
      setBuffer(Array(gapCount).fill(""));
    }
  };

  const addAnswer = (value: string) => {
    const trimmed = value.trim();
    setBuffer((prev) => {
      const tempArray = [...prev];
      const firstSlot = tempArray.findIndex((slot) => slot === "");
      if (firstSlot === -1) return tempArray;
      tempArray[firstSlot] = trimmed;
      return tempArray;
    });
  };

  const replaceAnswer = (index: number, value: string) => {
    const trimmed = value.trim();
    setBuffer((prev) => {
      const copy = [...prev];
      copy[index] = trimmed;
      return copy;
    });
  };

  const clear = () => setBuffer(Array(gapCount).fill(""));

  return { buffer, addAnswer, replaceAnswer, clear };
}
