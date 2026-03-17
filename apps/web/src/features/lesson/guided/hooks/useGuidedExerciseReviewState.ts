import { useLessonContext } from "@/features/lesson/context/useLessonContext";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot";
import { useCallback, useEffect, useRef, useState } from "react";

export function useGuidedExerciseReviewState() {
  const {
    currentExercise,
    isComplete,
    reviewSubmissionSnapshot,
    workingSnapshot,
    setWorkingSnapshot,
  } = useLessonContext();
  const { project, files, entryFileId, resetToSnapshot } = useProjectContext();

  const [isEditorReadOnly, setIsEditorReadOnly] = useState(false);
  const appliedReviewSnapshotForExerciseId = useRef<string | null>(null);
  const appliedWorkingSnapshotForExerciseId = useRef<string | null>(null);

  const buildCurrentSnapshot = useCallback((): ProjectSnapshot => {
    return {
      ...project,
      files: files.map((file) => ({ ...file })),
      entryFileId,
    };
  }, [project, files, entryFileId]);

  useEffect(() => {
    if (isComplete) return;
    setWorkingSnapshot(buildCurrentSnapshot());
  }, [isComplete, buildCurrentSnapshot, setWorkingSnapshot]);

  useEffect(() => {
    if (isComplete && reviewSubmissionSnapshot) {
      if (appliedReviewSnapshotForExerciseId.current !== currentExercise.id) {
        resetToSnapshot(reviewSubmissionSnapshot);
        appliedReviewSnapshotForExerciseId.current = currentExercise.id;
      }
      setIsEditorReadOnly(true);
      return;
    }

    if (
      appliedReviewSnapshotForExerciseId.current ||
      appliedWorkingSnapshotForExerciseId.current !== currentExercise.id
    ) {
      if (workingSnapshot) {
        resetToSnapshot(workingSnapshot);
      }
      appliedWorkingSnapshotForExerciseId.current = currentExercise.id;
    }

    appliedReviewSnapshotForExerciseId.current = null;
    setIsEditorReadOnly(false);
  }, [
    isComplete,
    reviewSubmissionSnapshot,
    resetToSnapshot,
    currentExercise.id,
    workingSnapshot,
  ]);

  return {
    isEditorReadOnly,
  };
}
