import type {
  ExerciseAttempt,
  ExerciseSubmission,
} from "@ludocode/types/Exercise/LessonSubmissions.ts";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import { useCallback, useEffect, useState } from "react";
import { playSound } from "@/sound/soundManager.ts";
import { hasExerciseOutput } from "@/features/lesson/util/exerciseOutputUtil.ts";

type Args = {
  currentExercise: LudoExercise;
  isComplete: boolean;
  audioEnabled: boolean;
  commitSubmission: (
    currentExercise: LudoExercise,
    attempt: ExerciseAttempt | null,
  ) => ExerciseSubmission[];
  continueToNextExercise: (submissions?: ExerciseSubmission[]) => void;
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
  const [isOutputVisible, setIsOutputVisible] = useState(false);

  useEffect(() => {
    setIsIncorrect(false);
    setIncorrectFeedbackMessage(null);
    setIsOutputVisible(false);
  }, [currentExercise.id]);

  const dismissIncorrectFeedback = useCallback(() => {
    setIsIncorrect(false);
    setIncorrectFeedbackMessage(null);
  }, []);

  const submitAttempt = useCallback(
    (attempt: ExerciseAttempt | null, feedbackMessage?: string | null) => {
      const shouldRevealOutput = hasExerciseOutput(currentExercise);
      const hasInteraction = currentExercise.interaction != null;

      if (isComplete) {
        continueToNextExercise();
        return;
      }

      if (!attempt) return;

      if (audioEnabled && hasInteraction) {
        playSound(attempt.isCorrect ? "correct" : "wrong");
      }

      if (!attempt.isCorrect) {
        setIsIncorrect(true);
        setIncorrectFeedbackMessage(feedbackMessage ?? "Not quite!");
      } else {
        setIsIncorrect(false);
        setIncorrectFeedbackMessage(null);
      }

      const committedSubmissions = commitSubmission(currentExercise, attempt);

      if (!attempt.isCorrect) {
        return;
      }

      if (shouldRevealOutput) {
        setIsOutputVisible(true);
        return;
      }

      if (hasInteraction) {
        return;
      }

      continueToNextExercise(committedSubmissions);
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
    isOutputVisible,
    incorrectFeedbackMessage,
    dismissIncorrectFeedback,
    submitAttempt,
  };
}
