import { useCallback, useState } from "react";
import type { LudoExercise } from "@/types/Exercise/LudoExercise";
import { getGapCount } from "./Util/inputUtil";
import type { ExerciseAttempt } from "@/types/Exercise/LessonSubmissions.ts";
import type { AnswerToken } from "./useExercise";

type Args = { currentExercise: LudoExercise };

export type useExerciseInputResponse = {
  currentExerciseInputs: AnswerToken[];
  setAnswerAt: (token: AnswerToken) => void;
  replaceAnswerAt: (index: number, token: AnswerToken) => void;
  clearExerciseInputs: () => void;
  initializeInputs: (attempt: ExerciseAttempt | null) => void;
};

const makeEmpty = (): AnswerToken => ({ id: undefined, value: "" });

export function useExerciseInput({
  currentExercise,
}: Args): useExerciseInputResponse {
  const gapCount = getGapCount(currentExercise);

  const [currentExerciseInputs, setCurrentExerciseInputs] = useState<
    AnswerToken[]
  >(Array.from({ length: gapCount }, makeEmpty));

  const initializeInputs = useCallback(
    (lastAttempt: ExerciseAttempt | null) => {
      if (lastAttempt) {
        const tokens: AnswerToken[] = lastAttempt.answer.map((a: any) =>
          typeof a === "string"
            ? { id: undefined, value: a }
            : { id: a.id, value: a.value ?? "" }
        );
        setCurrentExerciseInputs(tokens);
      } else {
        setCurrentExerciseInputs(Array.from({ length: gapCount }, makeEmpty));
      }
    },
    [gapCount]
  );

  //TODO these names arent fully correct
  const setAnswerAt = useCallback((token: AnswerToken) => {
    setCurrentExerciseInputs((prev) => {
      const next = prev.slice();
      const firstEmpty = next.findIndex((slot) => slot.value === "");
      if (firstEmpty !== -1)
        next[firstEmpty] = { id: token.id, value: token.value };
      return next;
    });
  }, []);

  const replaceAnswerAt = useCallback((index: number, token: AnswerToken) => {
    setCurrentExerciseInputs((prev) => {
      const next = prev.slice();
      next[index] = { id: token.id, value: token.value };
      return next;
    });
  }, []);

  const clearExerciseInputs = useCallback(() => {
    setCurrentExerciseInputs(Array.from({ length: gapCount }, makeEmpty));
  }, [gapCount]);

  return {
    currentExerciseInputs,
    setAnswerAt,
    replaceAnswerAt,
    clearExerciseInputs,
    initializeInputs,
  };
}
