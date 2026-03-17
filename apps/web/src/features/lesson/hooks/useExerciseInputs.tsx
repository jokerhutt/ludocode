import { useCallback, useEffect, useMemo } from "react";
import type { ExerciseAttempt } from "@ludocode/types/Exercise/LessonSubmissions.ts";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import type { AnswerToken } from "@ludocode/types";
import {
  useExerciseInput,
  type useExerciseInputResponse,
} from "@/features/lesson/hooks/useExerciseInput.tsx";
import {
  areAllFilled,
  areAllValid,
  checkCorrect,
} from "@/features/lesson/util/validationUtil.ts";

type Args = {
  currentExercise: LudoExercise;
  correctInputs: AnswerToken[] | null;
  onInputInteraction?: () => void;
  setCanSubmit: (canSubmit: boolean) => void;
  setAttemptFactory: (factory: (() => ExerciseAttempt | null) | null) => void;
};

export function useExerciseInputs({
  currentExercise,
  correctInputs,
  onInputInteraction,
  setCanSubmit,
  setAttemptFactory,
}: Args): useExerciseInputResponse {
  const exerciseInput = useExerciseInput({ currentExercise });
  const {
    currentExerciseInputs,
    clearExerciseInputs,
    initializeInputs,
    isEmpty,
    popLastAnswer,
    replaceAnswerAt,
    setAnswerAt,
  } = exerciseInput;

  useEffect(() => {
    initializeInputs(correctInputs);
  }, [currentExercise.id, correctInputs, initializeInputs]);

  const notifyInteraction = useCallback(() => {
    onInputInteraction?.();
  }, [onInputInteraction]);

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

  const createAttempt = useCallback((): ExerciseAttempt | null => {
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

  useEffect(() => {
    setCanSubmit(canSubmit);
    setAttemptFactory(canSubmit ? createAttempt : null);
  }, [canSubmit, createAttempt, setAttemptFactory, setCanSubmit]);

  useEffect(() => {
    return () => {
      setCanSubmit(false);
      setAttemptFactory(null);
    };
  }, [setAttemptFactory, setCanSubmit]);

  return useMemo(
    () => ({
      currentExerciseInputs,
      isEmpty,
      initializeInputs,
      setAnswerAt: (token) => {
        notifyInteraction();
        setAnswerAt(token);
      },
      popLastAnswer: () => {
        notifyInteraction();
        popLastAnswer();
      },
      replaceAnswerAt: (slotIndex, token) => {
        notifyInteraction();
        replaceAnswerAt(slotIndex, token);
      },
      clearExerciseInputs: () => {
        notifyInteraction();
        clearExerciseInputs();
      },
    }),
    [
      currentExerciseInputs,
      isEmpty,
      initializeInputs,
      notifyInteraction,
      setAnswerAt,
      popLastAnswer,
      replaceAnswerAt,
      clearExerciseInputs,
    ],
  );
}
