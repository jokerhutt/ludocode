import { useCallback, useMemo, useState } from "react";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import type { AnswerToken } from "@ludocode/types";

type Args = { currentExercise: LudoExercise };

export type useExerciseInputResponse = {
  currentExerciseInputs: AnswerToken[];
  setAnswerAt: (token: AnswerToken) => void;
  popLastAnswer: () => void;
  isEmpty: boolean;
  replaceAnswerAt: (index: number, token: AnswerToken) => void;
  clearExerciseInputs: () => void;
  initializeInputs: (inputs: AnswerToken[] | null) => void;
};

const makeEmpty = (): AnswerToken => ({ id: undefined, value: "" });

export function useExerciseInput({
  currentExercise,
}: Args): useExerciseInputResponse {
  const gapCount = getGapCount(currentExercise);

  const [currentExerciseInputs, setCurrentExerciseInputs] = useState<
    AnswerToken[]
  >(Array.from({ length: gapCount }, makeEmpty));

  const isEmpty = useMemo(
    () => currentExerciseInputs.every((t) => t.value === ""),
    [currentExerciseInputs],
  );

  const initializeInputs = useCallback(
    (inputs: AnswerToken[] | null) => {
      if (inputs) {
        setCurrentExerciseInputs(
          inputs.map((token) => ({
            id: token.id,
            value: token.value ?? "",
          })),
        );
      } else {
        setCurrentExerciseInputs(Array.from({ length: gapCount }, makeEmpty));
      }
    },
    [gapCount],
  );

  const popLastAnswer = useCallback(() => {
    setCurrentExerciseInputs((prev) => {
      const next = prev.slice();
      const lastFilled = [...next].reverse().findIndex((t) => t.value !== "");
      if (lastFilled !== -1) {
        const realIndex = next.length - 1 - lastFilled;
        next[realIndex] = makeEmpty();
      }
      return next;
    });
  }, []);

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
    popLastAnswer,
    isEmpty,
    replaceAnswerAt,
    clearExerciseInputs,
    initializeInputs,
  };
}

const getGapCount = (exercise: LudoExercise): number => {
  if (exercise.interaction?.type === "CLOZE") {
    return exercise.interaction.blanks.length;
  }
  if (exercise.interaction?.type === "SELECT") {
    return 1;
  }
  return 0;
};
