import { useCallback, useMemo } from "react";
import { useLessonContext } from "@/features/lesson/context/useLessonContext";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext";

type Args = {
  isRunning: boolean;
  isEditorReadOnly: boolean;
  onAfterReset?: () => void;
};

export function useGuidedExerciseNavigation({
  isRunning,
  isEditorReadOnly,
  onAfterReset,
}: Args) {
  const { canGoBack, goBack, resetSnapshot, setWorkingSnapshot } =
    useLessonContext();
  const { resetToSnapshot } = useProjectContext();

  const canReset = useMemo(() => {
    return !!resetSnapshot && !isEditorReadOnly && !isRunning;
  }, [resetSnapshot, isEditorReadOnly, isRunning]);

  const onGoBack = useCallback(() => {
    if (!canGoBack) return;
    goBack();
  }, [canGoBack, goBack]);

  const onReset = useCallback(() => {
    if (!resetSnapshot || isEditorReadOnly || isRunning) return;

    resetToSnapshot(resetSnapshot);
    setWorkingSnapshot({
      ...resetSnapshot,
      files: resetSnapshot.files.map((file) => ({ ...file })),
    });

    onAfterReset?.();
  }, [
    resetSnapshot,
    isEditorReadOnly,
    isRunning,
    resetToSnapshot,
    setWorkingSnapshot,
    onAfterReset,
  ]);

  return {
    canGoBack,
    onGoBack,
    canReset,
    onReset,
  };
}
