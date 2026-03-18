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

function getSessionStorageItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function setSessionStorageItem(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Soft persistence should never break lesson flow.
  }
}

function removeSessionStorageItem(key: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // Soft persistence should never break lesson flow.
  }
}

export function useCommittedSubmissions({
  exercises,
  courseId,
  lessonId,
}: Args) {
  const storageKey = `lesson-submission-history:${courseId}:${lessonId}`;

  const [committedExerciseSubmissions, setCommittedExerciseSubmissions] =
    useState<ExerciseSubmission[]>(() => {
      if (typeof window === "undefined") return [];

      let isReload = false;
      try {
        const navEntry = window.performance
          ?.getEntriesByType?.("navigation")
          ?.[0] as PerformanceNavigationTiming | undefined;
        isReload = navEntry?.type === "reload";
      } catch {
        isReload = false;
      }

      if (!isReload) {
        removeSessionStorageItem(storageKey);
        return [];
      }

      const stored = getSessionStorageItem(storageKey);
      if (!stored) return [];

      try {
        return JSON.parse(stored) as ExerciseSubmission[];
      } catch {
        removeSessionStorageItem(storageKey);
        return [];
      }
    });
  const queuedLessonSubmissionRef = useRef<LessonSubmissionRequest | null>(null);
  const hasSubmittedLessonRef = useRef(false);
  const stateStorageKeyRef = useRef(storageKey);

  useEffect(() => {
    if (stateStorageKeyRef.current === storageKey) return;
    removeSessionStorageItem(stateStorageKeyRef.current);
    removeSessionStorageItem(storageKey);
    queuedLessonSubmissionRef.current = null;
    hasSubmittedLessonRef.current = false;
    stateStorageKeyRef.current = storageKey;
    setCommittedExerciseSubmissions([]);
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (stateStorageKeyRef.current !== storageKey) return;

    if (committedExerciseSubmissions.length === 0) {
      removeSessionStorageItem(storageKey);
      return;
    }

    setSessionStorageItem(
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
      removeSessionStorageItem(storageKey);
      removeSessionStorageItem(
        `lesson-guided-working-snapshots:${courseId}:${lessonId}`,
      );

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
