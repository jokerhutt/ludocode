import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main";
import { useCallback } from "react";

type Args = {
  position: number;
  exerciseCount: number;
  submitLesson: () => unknown;
};

export function useExerciseProgression({
  position,
  exerciseCount,
  submitLesson,
}: Args) {
  const isLastExercise = position >= exerciseCount;

  const continueToNextExercise = useCallback(() => {
    if (isLastExercise) {
      submitLesson();
      return;
    }

    router.navigate(ludoNavigation.lesson.toNextExercise(position));
  }, [isLastExercise, position, submitLesson]);

  return {
    continueToNextExercise,
  };
}
