import {
  findLastCorrectAttempt,
  getProjectSnapshotFromAttempt,
} from "@/features/lesson/hooks/useExerciseHistory.tsx";
import type { ExerciseSubmission } from "@ludocode/types/Exercise/LessonSubmissions.ts";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
import { useCallback, useMemo, useState } from "react";

type Args = {
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
  currentExercise,
  exercises,
  position,
  submissionHistory,
  lessonProjectSnapshot,
}: Args) {
  const [workingSnapshotsByExerciseId, setWorkingSnapshotsByExerciseId] =
    useState<Record<string, ProjectSnapshot>>({});

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
