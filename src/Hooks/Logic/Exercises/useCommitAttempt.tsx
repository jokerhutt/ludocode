import { useCallback, useState } from "react";
import type {
  ExerciseAttempt,
  ExerciseSubmission,
  LessonSubmission,
} from "../../../Types/Exercise/LessonSubmissionTypes";
import type { LudoExercise } from "../../../Types/Exercise/LudoExercise";
import type { LudoLesson } from "../../../Types/Catalog/LudoLesson";
import { mergeAttempt } from "./exerciseHelpers";
import { v4 as uuidv4 } from "uuid";
import { router } from "../../../routes/router";
import { ludoNavigation } from "../../../routes/ludoNavigation";

type Args = {
  position: number;
  exercises: LudoExercise[];
  lesson: LudoLesson;
  clear: () => void;
  submissionBuffer: ExerciseAttempt | null;
  clearSubmissionBuffer: () => void;
  exerciseSubmissions: ExerciseSubmission[];
  mergeExerciseSubmissions: (merged: ExerciseSubmission[]) => void;
};

export function useCommitAttempt({
  position,
  exercises,
  lesson,
  clear,
  submissionBuffer,
  clearSubmissionBuffer,
  exerciseSubmissions,
  mergeExerciseSubmissions,
}: Args) {
  const commitAttempt = useCallback(() => {
    if (!submissionBuffer) return;

    const isLast = position === exercises.length;
    const merged = mergeAttempt(exerciseSubmissions, submissionBuffer);

    mergeExerciseSubmissions(merged);
    clearSubmissionBuffer();

    //INCORRECT -> NO NAVIGATION
    if (!submissionBuffer.isCorrect) {
      clear();
      return;
    }

    //LAST -> CONSTRUCT AND NAVIGATE TO SYNC
    if (isLast) {
      const lessonSubmission: LessonSubmission = {
        id: uuidv4(),
        lessonId: lesson.id,
        submissions: merged,
      };
      router.navigate(
        ludoNavigation.lesson.toSyncPage(lesson.id, lessonSubmission)
      );
      return;
    }

    //CORRECT -> NAVIGATE TO NEXT EXERCISE
    router.navigate(ludoNavigation.lesson.toNextExercise(lesson.id, position));

    return;
  }, [
    submissionBuffer,
    exerciseSubmissions,
    position,
    exercises.length,
    lesson.id,
    clear,
    mergeExerciseSubmissions,
    clearSubmissionBuffer,
  ]);

  return {commitAttempt}


}

export type useCommitAttemptResponse = {
  commitAttempt: () => void;
};
