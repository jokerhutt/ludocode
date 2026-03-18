import { useExerciseInputContext } from "@/features/lesson/context/useExerciseInputContext.tsx";
import {
  useLessonEvaluation,
  useLessonExercise,
  useLessonSubmission,
} from "@/features/lesson/context/useLessonContext.tsx";
import { useExerciseHistory } from "@/features/lesson/hooks/useExerciseHistory.tsx";
import { createInfoExerciseAttempt } from "@/features/lesson/util/submissionUtil.ts";
import { useCallback, useMemo } from "react";

export function useExerciseActionState() {
  const { currentExercise } = useLessonExercise();
  const { isIncorrect, isOutputVisible, dismissIncorrectFeedback } =
    useLessonEvaluation();
  const { continueToNextExercise, submitAttempt, submissionHistory } =
    useLessonSubmission();
  const inputState = useExerciseInputContext();
  const { isComplete } = useExerciseHistory({
    currentExercise,
    submissionHistory,
  });
  const isCorrect = isComplete || isOutputVisible;

  const canSubmit = useMemo(() => {
    return (
      isCorrect ||
      isIncorrect ||
      !currentExercise.interaction ||
      inputState.canSubmit
    );
  }, [currentExercise.interaction, inputState.canSubmit, isCorrect, isIncorrect]);

  const submit = useCallback(() => {
    if (isCorrect) {
      continueToNextExercise();
      return;
    }

    if (isIncorrect) {
      inputState.clearExerciseInputs();
      dismissIncorrectFeedback();
      return;
    }

    if (!currentExercise.interaction) {
      submitAttempt(createInfoExerciseAttempt(currentExercise.id));
      return;
    }

    submitAttempt(inputState.buildAttemptFromInput());
  }, [
    continueToNextExercise,
    currentExercise,
    dismissIncorrectFeedback,
    inputState,
    isCorrect,
    isIncorrect,
    submitAttempt,
  ]);

  return {
    canSubmit,
    submit,
    isCorrect,
    isIncorrect,
  };
}
