import {
  findLastCorrectAttempt,
  getProjectSnapshotFromAttempt,
} from "@/features/lesson/hooks/useExerciseHistory.tsx";
import type { ExerciseSubmission } from "@ludocode/types/Exercise/LessonSubmissions.ts";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Args = {
  courseId: string;
  lessonId: string;
  currentExercise: LudoExercise;
  exercises: LudoExercise[];
  position: number;
  submissionHistory: ExerciseSubmission[];
  lessonProjectSnapshot?: ProjectSnapshot | null;
};

function cloneSnapshot(snapshot: ProjectSnapshot): ProjectSnapshot {
  return {
    ...snapshot,
    files: snapshot.files.map((file) => ({ ...file })),
  };
}

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
  }
}

function removeSessionStorageItem(key: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(key);
  } catch {
  }
}

export function useGuidedExerciseState({
  courseId,
  lessonId,
  currentExercise,
  exercises,
  position,
  submissionHistory,
  lessonProjectSnapshot,
}: Args) {
  const storageKey = `lesson-guided-working-snapshots:${courseId}:${lessonId}`;

  const [workingSnapshotsByExerciseId, setWorkingSnapshotsByExerciseId] =
    useState<Record<string, ProjectSnapshot>>(() => {
      if (typeof window === "undefined") return {};

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
        return {};
      }

      const stored = getSessionStorageItem(storageKey);
      if (!stored) return {};

      try {
        return JSON.parse(stored) as Record<string, ProjectSnapshot>;
      } catch {
        removeSessionStorageItem(storageKey);
        return {};
      }
    });
  const stateStorageKeyRef = useRef(storageKey);

  useEffect(() => {
    if (stateStorageKeyRef.current === storageKey) return;
    removeSessionStorageItem(stateStorageKeyRef.current);
    removeSessionStorageItem(storageKey);
    stateStorageKeyRef.current = storageKey;
    setWorkingSnapshotsByExerciseId({});
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (stateStorageKeyRef.current !== storageKey) return;

    if (Object.keys(workingSnapshotsByExerciseId).length === 0) {
      removeSessionStorageItem(storageKey);
      return;
    }

    setSessionStorageItem(
      storageKey,
      JSON.stringify(workingSnapshotsByExerciseId),
    );
  }, [storageKey, workingSnapshotsByExerciseId]);

  const reviewSubmissionSnapshot = useMemo(() => {
    return getProjectSnapshotFromAttempt(
      findLastCorrectAttempt(submissionHistory, currentExercise.id),
    );
  }, [currentExercise.id, submissionHistory]);

  const workingSnapshot = useMemo(() => {
    return workingSnapshotsByExerciseId[currentExercise.id] ?? null;
  }, [currentExercise.id, workingSnapshotsByExerciseId]);

  const setWorkingSnapshot = useCallback(
    (snapshot: ProjectSnapshot) => {
      setWorkingSnapshotsByExerciseId((prev) => ({
        ...prev,
        [currentExercise.id]: cloneSnapshot(snapshot),
      }));
    },
    [currentExercise.id],
  );

  const resetSnapshot = useMemo(() => {
    const previousExerciseId = exercises[position - 2]?.id;
    if (!previousExerciseId) {
      return lessonProjectSnapshot ?? null;
    }

    return (
      getProjectSnapshotFromAttempt(
        findLastCorrectAttempt(submissionHistory, previousExerciseId),
      ) ??
      lessonProjectSnapshot ??
      null
    );
  }, [exercises, lessonProjectSnapshot, position, submissionHistory]);

  return {
    reviewSubmissionSnapshot,
    workingSnapshot,
    setWorkingSnapshot,
    resetSnapshot,
  };
}
