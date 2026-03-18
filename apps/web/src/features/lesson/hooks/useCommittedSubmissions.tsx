import {
  type ExerciseAttempt,
  type ExerciseSubmission,
  type LessonSubmissionRequest,
} from "@ludocode/types/Exercise/LessonSubmissions.ts";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const storageKey = `lesson-submission-history:${courseId}:${lessonId}`;

  const [committedExerciseSubmissions, setCommittedExerciseSubmissions] =
    useState<ExerciseSubmission[]>(() => {
      if (typeof window === "undefined") return [];

      const navEntry = window.performance
        ?.getEntriesByType?.("navigation")
        ?.[0] as PerformanceNavigationTiming | undefined;

      if (navEntry?.type !== "reload") {
        window.sessionStorage.removeItem(storageKey);
        return [];
      }

      const stored = window.sessionStorage.getItem(storageKey);
      if (!stored) return [];

      try {
        return JSON.parse(stored) as ExerciseSubmission[];
      } catch {
        window.sessionStorage.removeItem(storageKey);
        return [];
      }
    });
  const queuedLessonSubmissionRef = useRef<LessonSubmissionRequest | null>(null);
  const hasSubmittedLessonRef = useRef(false);
  const stateStorageKeyRef = useRef(storageKey);

  useEffect(() => {
    if (stateStorageKeyRef.current === storageKey) return;
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(stateStorageKeyRef.current);
      window.sessionStorage.removeItem(storageKey);
    }
    queuedLessonSubmissionRef.current = null;
    hasSubmittedLessonRef.current = false;
    stateStorageKeyRef.current = storageKey;
    setCommittedExerciseSubmissions([]);
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (stateStorageKeyRef.current !== storageKey) return;

    if (committedExerciseSubmissions.length === 0) {
      window.sessionStorage.removeItem(storageKey);
      return;
    }

    window.sessionStorage.setItem(
      storageKey,
      JSON.stringify(committedExerciseSubmissions),
    );
  }, [committedExerciseSubmissions, storageKey]);

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
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(storageKey);
        window.sessionStorage.removeItem(
          `lesson-guided-working-snapshots:${courseId}:${lessonId}`,
        );
      }

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
