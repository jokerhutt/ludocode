import { useCallback, useState } from "react";
import type { AnswerToken } from "../useExerciseFlow";
import type { LudoExercise } from "@/Types/Exercise/LudoExercise";
import { getGapCount } from "../exerciseHelpers";
import type { ExerciseAttempt } from "@/Types/Exercise/LessonSubmissionTypes";

type Args = { currentExercise: LudoExercise };

export type useExerciseInputResponse = {
  currentExerciseInputs: AnswerToken[];
  addClickedAnswer: (token: AnswerToken) => void;
  addKeyboardAnswer: (index: number, token: AnswerToken) => void;
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

  const addClickedAnswer = useCallback((token: AnswerToken) => {
    setCurrentExerciseInputs((prev) => {
      const next = prev.slice();
      const firstEmpty = next.findIndex((slot) => slot.value === "");
      if (firstEmpty !== -1)
        next[firstEmpty] = { id: token.id, value: token.value };
      return next;
    });
  }, []);

  const addKeyboardAnswer = useCallback((index: number, token: AnswerToken) => {
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
    addClickedAnswer,
    addKeyboardAnswer,
    clearExerciseInputs,
    initializeInputs,
  };
}
