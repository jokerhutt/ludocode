import { useCallback, useEffect, useState } from "react";
import { findLastAttempt } from "./exerciseHelpers";
import type { ExerciseSubmission } from "../../../Types/Exercise/LessonSubmissionTypes";
import type { AnswerToken } from "./useExerciseFlow";

type Args = {
  exerciseId: string;
  gapCount: number;
  submissions: ExerciseSubmission[];
};

const makeEmpty = (): AnswerToken => ({ id: undefined, value: "" });

export function useAttemptBuffer({
  exerciseId,
  gapCount,
  submissions,
}: Args): AttemptBufferResponse {
  const [buffer, setBuffer] = useState<AnswerToken[]>(() =>
    Array.from({ length: gapCount }, makeEmpty)
  );

  const changeBufferExercise = useCallback(() => {
    const lastAttempt = findLastAttempt(submissions, exerciseId);
    if (lastAttempt) {
      const tokens: AnswerToken[] = lastAttempt.answer.map((a: any) =>
        typeof a === "string"
          ? { id: undefined, value: a }
          : { id: a.id, value: a.value ?? "" }
      );
      setBuffer(tokens);
    } else {
      setBuffer(Array.from({ length: gapCount }, makeEmpty));
    }
  }, [exerciseId, gapCount, submissions]);

  useEffect(() => {
    changeBufferExercise();
  }, [changeBufferExercise]);

  const addAnswer = useCallback((token: AnswerToken) => {
    setBuffer((prev) => {
      const next = prev.slice();
      const firstEmpty = next.findIndex((slot) => slot.value === "");
      if (firstEmpty !== -1)
        next[firstEmpty] = { id: token.id, value: token.value };
      return next;
    });
  }, []);

  const replaceAnswer = useCallback((index: number, token: AnswerToken) => {
    setBuffer((prev) => {
      const next = prev.slice();
      next[index] = { id: token.id, value: token.value };
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setBuffer(Array.from({ length: gapCount }, makeEmpty));
  }, [gapCount]);

  return { buffer, addAnswer, replaceAnswer, clear };
}

export type AttemptBufferResponse = {
  buffer: AnswerToken[];
  addAnswer: (token: AnswerToken) => void;
  replaceAnswer: (index: number, token: AnswerToken) => void;
  clear: () => void;
};
