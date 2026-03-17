import {
  type ExerciseAttempt,
  type ExerciseSubmission,
  type LessonSubmissionRequest,
} from "@ludocode/types/Exercise/LessonSubmissions.ts";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import { useCallback, useRef, useState } from "react";
import {
  convertToLessonSubmission,
  createInfoExerciseAttempt,
  mergeAttemptIntoExerciseSubmissions,
} from "@/features/lesson/util/submissionUtil.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main";

type Args = {
  exercises: LudoExercise[];
  courseId: string;
  lessonId: string;
};

export function useCommittedSubmissions({
  exercises,
  courseId,
  lessonId,
}: Args) {
  const [committedExerciseSubmissions, setCommittedExerciseSubmissions] =
    useState<ExerciseSubmission[]>([]);
  const queuedLessonSubmissionRef = useRef<LessonSubmissionRequest | null>(null);
  const hasSubmittedLessonRef = useRef(false);

  const submitLesson = useCallback(
    (submissions: ExerciseSubmission[] = committedExerciseSubmissions) => {
      if (hasSubmittedLessonRef.current) {
        return queuedLessonSubmissionRef.current;
      }

      const lessonSubmission =
        queuedLessonSubmissionRef.current ??
        convertToLessonSubmission(courseId, lessonId, submissions, exercises);

      queuedLessonSubmissionRef.current = lessonSubmission;
      hasSubmittedLessonRef.current = true;

      router.navigate(
        ludoNavigation.completion.toSyncPage(lessonId, lessonSubmission),
      );

      return lessonSubmission;
    },
    [committedExerciseSubmissions, courseId, lessonId, exercises],
  );

  const commitSubmission = useCallback(
    (currentExercise: LudoExercise, attempt: ExerciseAttempt | null) => {
      if (attempt == null && currentExercise.interaction) {
        return committedExerciseSubmissions;
      }

      const committedAttempt =
        attempt ?? createInfoExerciseAttempt(currentExercise.id);
      const merged = mergeAttemptIntoExerciseSubmissions(
        committedExerciseSubmissions,
        committedAttempt,
        currentExercise.version,
      );

      queuedLessonSubmissionRef.current = null;
      hasSubmittedLessonRef.current = false;
      setCommittedExerciseSubmissions(merged);
      return merged;
    },
    [committedExerciseSubmissions],
  );

  return {
    submissionHistory: committedExerciseSubmissions,
    commitSubmission,
    submitLesson,
  };
}
