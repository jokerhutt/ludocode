import type { ExerciseSubmission } from "@ludocode/types/Exercise/LessonSubmissions.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main";
import { useCallback } from "react";

type Args = {
  position: number;
  exerciseCount: number;
  submitLesson: (submissions?: ExerciseSubmission[]) => unknown;
};

export function useExerciseProgression({
  position,
  exerciseCount,
  submitLesson,
}: Args) {
  const isLastExercise = position >= exerciseCount;

  const continueToNextExercise = useCallback(
    (submissions?: ExerciseSubmission[]) => {
      if (isLastExercise) {
        submitLesson(submissions);
        return;
      }

      router.navigate(ludoNavigation.lesson.toNextExercise(position));
    },
    [isLastExercise, position, submitLesson],
  );

  return {
    continueToNextExercise,
  };
}
