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
  version: number
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
  version
}: Args) {
  const commitAttempt = useCallback(() => {
    if (!submissionBuffer) return;

    const isLast = position === exercises.length;
    const merged = mergeAttempt(exerciseSubmissions, submissionBuffer, version);
    mergeExerciseSubmissions(merged);

    clearSubmissionBuffer();

    //INCORRECT -> NO NAVIGATION
    if (!submissionBuffer.isCorrect) {
      handleIncorrectAttempt()
      return;
    }

    //LAST -> CONSTRUCT AND NAVIGATE TO SYNC
    if (isLast) {
      handleLastExercise(merged)
      return;
    }

    //CORRECT -> NAVIGATE TO NEXT EXERCISE
    handleCorrectAttempt()
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

  const handleLastExercise = (merged: ExerciseSubmission[]) => {
      const lessonSubmission: LessonSubmission = {
        id: uuidv4(),
        lessonId: lesson.id,
        submissions: merged,
      };
      router.navigate(
        ludoNavigation.lesson.toSyncPage(lesson.id, lessonSubmission)
      );
  }

  const handleIncorrectAttempt = () => clear()

  const handleCorrectAttempt = () => router.navigate(ludoNavigation.lesson.toNextExercise(lesson.id, position))

  return { commitAttempt };
}

export type useCommitAttemptResponse = {
  commitAttempt: () => void;
};
