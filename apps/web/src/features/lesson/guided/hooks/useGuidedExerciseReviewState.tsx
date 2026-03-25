import { useGuidedExercise } from "@/features/lesson/guided/context/useGuidedExerciseContext";
import {
  useLessonEvaluation,
  useLessonExercise,
} from "@/features/lesson/context/useLessonContext";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot";
import { useCallback, useEffect, useRef, useState } from "react";

export function useGuidedExerciseReviewState() {
  const { currentExercise } = useLessonExercise();
  const { isComplete } = useLessonEvaluation();
  const { reviewSubmissionSnapshot, workingSnapshot, setWorkingSnapshot } =
    useGuidedExercise();
  const { project, files, entryFileId, resetToSnapshot } = useProjectContext();

  const [isEditorReadOnly, setIsEditorReadOnly] = useState(false);
  const appliedReviewSnapshotForExerciseId = useRef<string | null>(null);
  const appliedWorkingSnapshotForExerciseId = useRef<string | null>(null);

  const buildCurrentSnapshot = useCallback((): ProjectSnapshot => {
    return {
      ...project,
      files: files.map((file) => ({ ...file })),
      entryFilePath: entryFileId,
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
    currentExercise.id,
    isComplete,
    resetToSnapshot,
    reviewSubmissionSnapshot,
    workingSnapshot,
  ]);

  return {
    isEditorReadOnly,
  };
}
