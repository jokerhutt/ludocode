import { useCallback, useEffect, useState } from "react";
import { findLastAttempt } from "./exerciseHelpers";
import type { ExerciseSubmission } from "../../Types/Exercise/LessonSubmissionTypes";

type Args = {
  exerciseId: string;
  gapCount: number;
  submissions: ExerciseSubmission[];
};

export function useAttemptBuffer({
  exerciseId,
  gapCount,
  submissions,
}: Args): AttemptBufferResponse {
  const [buffer, setBuffer] = useState<string[]>(() =>
    Array(gapCount).fill("")
  );

  const changeBufferExercise = useCallback(() => {
    const lastAttempt = findLastAttempt(submissions, exerciseId);
    if (lastAttempt != null) {
      setBuffer([...lastAttempt.answer]);
    } else {
      setBuffer(Array(gapCount).fill(""));
    }
  }, [exerciseId, gapCount, submissions]);

  useEffect(() => {
    changeBufferExercise();
  }, [changeBufferExercise]);

  const addAnswer = useCallback((value: string) => {
    const trimmed = value.trim();
    setBuffer((prev) => {
      const tempArray = [...prev];
      const firstSlot = tempArray.findIndex((slot) => slot === "");
      if (firstSlot === -1) return tempArray;
      tempArray[firstSlot] = trimmed;
      return tempArray;
    });
  }, []);

  const replaceAnswer = useCallback((index: number, value: string) => {
    const trimmed = value.trim();
    setBuffer((prev) => {
      const copy = [...prev];
      copy[index] = trimmed;
      return copy;
    });
  }, []);

  const clear = useCallback(() => {
    setBuffer(Array(gapCount).fill(""));
  }, [gapCount]);

  return { buffer, addAnswer, replaceAnswer, clear };
}

export type AttemptBufferResponse = {
  buffer: string[];
  addAnswer: (value: string) => void;
  replaceAnswer: (index: number, value: string) => void;
  clear: () => void;
};
