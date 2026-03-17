import { useExerciseInputContext } from "@/features/lesson/context/useExerciseInputContext.tsx";
import {
  useLessonEvaluation,
  useLessonExercise,
  useLessonSubmission,
} from "@/features/lesson/context/useLessonContext.tsx";
import { createInfoExerciseAttempt } from "@/features/lesson/util/submissionUtil.ts";
import { useCallback, useMemo } from "react";

export function useExerciseActionState() {
  const { currentExercise } = useLessonExercise();
  const { isComplete, isIncorrect, dismissIncorrectFeedback } =
    useLessonEvaluation();
  const { continueToNextExercise, submitAttempt } = useLessonSubmission();
  const inputState = useExerciseInputContext();

  const canSubmit = useMemo(() => {
    return (
      isComplete ||
      isIncorrect ||
      !currentExercise.interaction ||
      inputState.canSubmit
    );
  }, [currentExercise.interaction, inputState.canSubmit, isComplete, isIncorrect]);

  const submit = useCallback(() => {
    if (isComplete) {
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
    isComplete,
    isIncorrect,
    submitAttempt,
  ]);

  return {
    canSubmit,
    submit,
    isCorrect: isComplete,
    isIncorrect,
  };
}
