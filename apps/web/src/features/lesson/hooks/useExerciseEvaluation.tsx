import type { ExerciseAttempt } from "@ludocode/types/Exercise/LessonSubmissions.ts";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import { useCallback, useEffect, useState } from "react";
import { playSound } from "@/sound/soundManager.ts";

type Args = {
  currentExercise: LudoExercise;
  isComplete: boolean;
  audioEnabled: boolean;
  commitSubmission: (
    currentExercise: LudoExercise,
    attempt: ExerciseAttempt | null,
  ) => unknown;
  continueToNextExercise: () => void;
};

export function useExerciseEvaluation({
  currentExercise,
  isComplete,
  audioEnabled,
  commitSubmission,
  continueToNextExercise,
}: Args) {
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [incorrectFeedbackMessage, setIncorrectFeedbackMessage] =
    useState<string | null>(null);

  useEffect(() => {
    setIsIncorrect(false);
    setIncorrectFeedbackMessage(null);
  }, [currentExercise.id]);

  const dismissIncorrectFeedback = useCallback(() => {
    setIsIncorrect(false);
    setIncorrectFeedbackMessage(null);
  }, []);

  const submitAttempt = useCallback(
    (attempt: ExerciseAttempt | null, feedbackMessage?: string | null) => {
      if (isComplete) {
        continueToNextExercise();
        return;
      }

      if (!attempt) return;

      if (audioEnabled) {
        playSound(attempt.isCorrect ? "correct" : "wrong");
      }

      if (!attempt.isCorrect) {
        setIsIncorrect(true);
        setIncorrectFeedbackMessage(feedbackMessage ?? "Not quite!");
      } else {
        setIsIncorrect(false);
        setIncorrectFeedbackMessage(null);
      }

      commitSubmission(currentExercise, attempt);
    },
    [
      audioEnabled,
      commitSubmission,
      continueToNextExercise,
      currentExercise,
      isComplete,
    ],
  );

  return {
    isComplete,
    isIncorrect,
    incorrectFeedbackMessage,
    dismissIncorrectFeedback,
    submitAttempt,
  };
}
