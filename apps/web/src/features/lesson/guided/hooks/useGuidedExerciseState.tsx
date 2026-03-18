import {
  findLastCorrectAttempt,
  getProjectSnapshotFromAttempt,
} from "@/features/lesson/hooks/useExerciseHistory.tsx";
import type { ExerciseSubmission } from "@ludocode/types/Exercise/LessonSubmissions.ts";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
import { useCallback, useEffect, useMemo, useState } from "react";

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

      const navEntry = window.performance
        ?.getEntriesByType?.("navigation")
        ?.[0] as PerformanceNavigationTiming | undefined;

      if (navEntry?.type !== "reload") {
        window.sessionStorage.removeItem(storageKey);
        return {};
      }

      const stored = window.sessionStorage.getItem(storageKey);
      if (!stored) return {};

      try {
        return JSON.parse(stored) as Record<string, ProjectSnapshot>;
      } catch {
        window.sessionStorage.removeItem(storageKey);
        return {};
      }
    });

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (Object.keys(workingSnapshotsByExerciseId).length === 0) {
      window.sessionStorage.removeItem(storageKey);
      return;
    }

    window.sessionStorage.setItem(
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
