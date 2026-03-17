import { useCallback, useEffect, useMemo, useState } from "react";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import type { AnswerToken } from "@ludocode/types";
import type { ExerciseAttempt } from "@ludocode/types/Exercise/LessonSubmissions.ts";
import {
  areAllFilled,
  areAllValid,
  checkCorrect,
} from "@/features/lesson/util/validationUtil.ts";

type Args = {
  currentExercise: LudoExercise;
  correctInputs?: AnswerToken[] | null;
  onInputInteraction?: () => void;
};

export type useExerciseInputResponse = {
  currentExerciseInputs: AnswerToken[];
  setAnswerAt: (token: AnswerToken) => void;
  popLastAnswer: () => void;
  isEmpty: boolean;
  replaceAnswerAt: (index: number, token: AnswerToken) => void;
  clearExerciseInputs: () => void;
  initializeInputs: (inputs: AnswerToken[] | null) => void;
  canSubmit: boolean;
  buildAttemptFromInput: () => ExerciseAttempt | null;
};

const makeEmpty = (): AnswerToken => ({ id: undefined, value: "" });

export function useExerciseInput({
  currentExercise,
  correctInputs = null,
  onInputInteraction,
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
        return;
      }

      setCurrentExerciseInputs(Array.from({ length: gapCount }, makeEmpty));
    },
    [gapCount],
  );

  useEffect(() => {
    initializeInputs(correctInputs);
  }, [correctInputs, currentExercise.id, initializeInputs]);

  const notifyInteraction = useCallback(() => {
    onInputInteraction?.();
  }, [onInputInteraction]);

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
      if (firstEmpty !== -1) {
        next[firstEmpty] = { id: token.id, value: token.value };
      }
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

  const canSubmit = useMemo(() => {
    if (
      !currentExercise.interaction ||
      currentExercise.interaction.type === "EXECUTABLE"
    ) {
      return false;
    }

    const allSlotsFilled = areAllFilled(currentExerciseInputs);
    return allSlotsFilled && areAllValid(currentExerciseInputs, currentExercise);
  }, [currentExercise, currentExerciseInputs]);

  const buildAttemptFromInput = useCallback((): ExerciseAttempt | null => {
    if (
      !currentExercise.interaction ||
      currentExercise.interaction.type === "EXECUTABLE" ||
      !canSubmit
    ) {
      return null;
    }

    return {
      exerciseId: currentExercise.id,
      isCorrect: checkCorrect(currentExerciseInputs, currentExercise),
      answer: currentExerciseInputs.map((token) => ({ ...token })),
    };
  }, [canSubmit, currentExercise, currentExerciseInputs]);

  return useMemo(
    () => ({
      currentExerciseInputs,
      isEmpty,
      initializeInputs,
      canSubmit,
      buildAttemptFromInput,
      setAnswerAt: (token: AnswerToken) => {
        notifyInteraction();
        setAnswerAt(token);
      },
      popLastAnswer: () => {
        notifyInteraction();
        popLastAnswer();
      },
      replaceAnswerAt: (slotIndex: number, token: AnswerToken) => {
        notifyInteraction();
        replaceAnswerAt(slotIndex, token);
      },
      clearExerciseInputs: () => {
        notifyInteraction();
        clearExerciseInputs();
      },
    }),
    [
      buildAttemptFromInput,
      canSubmit,
      clearExerciseInputs,
      currentExerciseInputs,
      initializeInputs,
      isEmpty,
      notifyInteraction,
      popLastAnswer,
      replaceAnswerAt,
      setAnswerAt,
    ],
  );
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
