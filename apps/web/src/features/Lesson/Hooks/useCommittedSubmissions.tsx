import {
  type ExerciseAttempt,
  type ExerciseSubmission,
} from "@ludocode/types/Exercise/LessonSubmissions.ts";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import { useCallback, useState } from "react";
import {
  convertToLessonSubmission,
  createInfoExerciseAttempt,
  mergeStagedAttemptIntoExerciseSubmissions,
} from "@/features/Lesson/Util/submissionUtil.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { useRouter } from "@tanstack/react-router";

type Args = {
  currentExercise: LudoExercise;
  clearExerciseInputs: () => void;
  clearStaged: () => void;
  position: number;
  exercises: LudoExercise[];
  lessonId: string;
};

export function useCommittedSubmissions({
  currentExercise,
  position,
  exercises,
  clearExerciseInputs,
  clearStaged,
  lessonId,
}: Args) {
  const router = useRouter();
  const [committedExerciseSubmissions, setCommittedExerciseSubmissions] =
    useState<ExerciseSubmission[]>([]);
  const handleLastExercise = (merged: ExerciseSubmission[]) => {
    const lessonSubmission = convertToLessonSubmission(lessonId, merged);
    router.navigate(
      ludoNavigation.completion.toSyncPage(lessonId, lessonSubmission)
    );
  };
  const handleCorrectAttempt = () =>
    router.navigate(ludoNavigation.lesson.toNextExercise(position));

  const isInfoExercise = currentExercise.exerciseType === "INFO";
  const isLastExercise = position === exercises.length;

  const commitStagedAttemptIntoSubmissions = useCallback(
    (staged: ExerciseAttempt | null) => {
      if (staged == null && currentExercise.exerciseType !== "INFO") return;

      const filteredStagedAttempt =
        staged && !isInfoExercise
          ? staged
          : createInfoExerciseAttempt(currentExercise.id);

      //Convert the attempt into an exercise submission
      //Merge the attempt into the exercise submissions
      const merged = mergeStagedAttemptIntoExerciseSubmissions(
        committedExerciseSubmissions,
        filteredStagedAttempt,
        currentExercise.version
      );
      setCommittedExerciseSubmissions(merged);

      //Navigate based on result
      if (isLastExercise && (filteredStagedAttempt.isCorrect || isInfoExercise)) {
        handleLastExercise(merged);
      } else if (filteredStagedAttempt.isCorrect) {
        handleCorrectAttempt();
      }

      //Clear Components
      clearExerciseInputs();
      clearStaged();

      return;
    },
    [
      isInfoExercise,
      currentExercise.id,
      currentExercise.version,
      committedExerciseSubmissions,
      isLastExercise,
      handleLastExercise,
      handleCorrectAttempt,
      clearExerciseInputs,
      clearStaged,
    ]
  );

  return { commitStagedAttemptIntoSubmissions };
}
