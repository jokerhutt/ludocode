import {
  type ExerciseAttempt,
  type ExerciseSubmission,
} from "@/Types/Exercise/LessonSubmissionTypes";
import type { LudoExercise } from "@/Types/Exercise/LudoExercise";
import { useCallback, useState } from "react";
import {
  convertToLessonSubmission,
  createInfoExerciseAttempt,
  mergeStagedAttemptIntoExerciseSubmissions,
} from "../exerciseHelpers";
import { router } from "@/routes/router";
import { ludoNavigation } from "@/routes/ludoNavigation";

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
  const [committedExerciseSubmissions, setCommittedExerciseSubmissions] =
    useState<ExerciseSubmission[]>([]);
  const handleLastExercise = (merged: ExerciseSubmission[]) => {
    const lessonSubmission = convertToLessonSubmission(lessonId, merged);
    router.navigate(
      ludoNavigation.lesson.toSyncPage(lessonId, lessonSubmission)
    );
  };
  const handleCorrectAttempt = () =>
    router.navigate(ludoNavigation.lesson.toNextExercise(lessonId, position));

  const isInfoExercise = currentExercise.exerciseType === "INFO";
  const isLastExercise = position === exercises.length;

  const commitStagedAttemptIntoSubmissions = useCallback(
    (staged: ExerciseAttempt | null) => {
      if (staged == null) return;

      // If the answer is info, create a dummy attempt
      const filteredStagedAttempt = isInfoExercise
        ? createInfoExerciseAttempt(currentExercise.id)
        : staged;

      //Convert the attempt into an exercise submission
      //Merge the attempt into the exercise submissions
      const merged = mergeStagedAttemptIntoExerciseSubmissions(
        committedExerciseSubmissions,
        filteredStagedAttempt,
        currentExercise.version
      );
      setCommittedExerciseSubmissions(merged);

      //Navigate based on result
      if (isLastExercise) {
        handleLastExercise(merged);
      } else if (filteredStagedAttempt.isCorrect) {
        handleCorrectAttempt();
      }

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
