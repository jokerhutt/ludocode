import { useHotkeys } from "@ludocode/hooks";
import { useLessonContext } from "@/features/lesson/context/useLessonContext";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import { useCodeRunnerContext } from "@/features/project/workbench/context/CodeRunnerContext.tsx";
import { useFeatureEnabledCheck } from "@/features/auth/hooks/useFeatureEnabledCheck";
import { WorkbenchOutputPane } from "@/features/project/workbench/output/WorkbenchOutputPane.tsx";
import { stripFileName } from "@/features/project/util/filenameUtil.ts";
import {
  evaluateExecutableTests,
  getFirstFailedExecutableTestFeedback,
} from "../util/executableTestUtil";
import { GuidedExerciseTreePane } from "./GuidedExerciseTreePane";
import { GuidedExerciseEditorPane } from "./GuidedExerciseEditorPane";
import type { ExecutableTest, ExerciseAttempt } from "@ludocode/types";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot";
import { useCallback, useEffect, useRef, useState } from "react";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { RotateCcwIcon } from "lucide-react";
import { cn } from "@ludocode/design-system/cn-utils";
import { GuidedLessonActions } from "./GuidedLessonActions";

export function GuidedExecutableWorkbench({
  tests,
  showBlockOutput,
}: {
  tests: ExecutableTest[];
  showBlockOutput: boolean;
}) {
  const {
    currentExercise,
    phase,
    isReviewing,
    reviewSubmissionSnapshot,
    workingSnapshot,
    setWorkingSnapshot,
    resetSnapshot,
    canGoBack,
    goBack,
    stageExecutableAttempt,
    commitExecutableAttempt,
    handleExerciseButtonClick,
  } = useLessonContext();
  const { project, files, entryFileId, resetToSnapshot } = useProjectContext();
  const { runCode, outputInfo } = useCodeRunnerContext();
  const runnerFeature = useFeatureEnabledCheck({ feature: "isPistonEnabled" });
  const { isRunning, outputLog } = outputInfo;

  const [awaitingValidation, setAwaitingValidation] = useState(false);
  const [incorrectFeedbackOpen, setIncorrectFeedbackOpen] = useState(false);
  const [incorrectFeedbackMessage, setIncorrectFeedbackMessage] = useState<
    string | null
  >(null);
  const [isEditorReadOnly, setIsEditorReadOnly] = useState(false);
  const outputCountBeforeRunRef = useRef(0);
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
    if (isReviewing) return;
    setWorkingSnapshot(buildCurrentSnapshot());
  }, [isReviewing, buildCurrentSnapshot, setWorkingSnapshot]);

  useEffect(() => {
    if (isReviewing && reviewSubmissionSnapshot) {
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
    isReviewing,
    reviewSubmissionSnapshot,
    resetToSnapshot,
    currentExercise.id,
    workingSnapshot,
  ]);

  useEffect(() => {
    if (!awaitingValidation || isRunning) return;
    if (outputLog.length <= outputCountBeforeRunRef.current) return;

    const latest = outputLog[outputLog.length - 1];
    const output = latest.output.join("\n");
    const isCorrect = evaluateExecutableTests({
      tests,
      output,
      status: latest.status,
      files: files.map((file) => ({
        name: stripFileName(file.path),
        content: file.content,
      })),
    });
    const failedFeedback = getFirstFailedExecutableTestFeedback({
      tests,
      output,
      status: latest.status,
      files: files.map((file) => ({
        name: stripFileName(file.path),
        content: file.content,
      })),
    });

    const projectSnapshotAttempt: ProjectSnapshot = {
      ...project,
      files: files.map((file) => ({ ...file })),
      entryFileId,
    };

    const attempt: ExerciseAttempt = {
      exerciseId: currentExercise.id,
      isCorrect,
      answer: { submission: projectSnapshotAttempt },
    };

    if (isCorrect) {
      setIncorrectFeedbackOpen(false);
      setIncorrectFeedbackMessage(null);
      stageExecutableAttempt(attempt);
    } else {
      commitExecutableAttempt(attempt);
      setIncorrectFeedbackMessage(failedFeedback);
      setIncorrectFeedbackOpen(true);
    }
    setAwaitingValidation(false);
  }, [
    awaitingValidation,
    isRunning,
    outputLog,
    project,
    files,
    entryFileId,
    tests,
    currentExercise.id,
    stageExecutableAttempt,
    commitExecutableAttempt,
  ]);

  const runOrAdvance = useCallback(() => {
    if (isRunning) return;

    if (phase !== "DEFAULT") {
      handleExerciseButtonClick();
      return;
    }

    if (!runnerFeature.enabled) return;

    setIncorrectFeedbackOpen(false);
    setIncorrectFeedbackMessage(null);
    outputCountBeforeRunRef.current = outputLog.length;
    setAwaitingValidation(true);
    runCode();
  }, [
    isRunning,
    phase,
    handleExerciseButtonClick,
    runnerFeature.enabled,
    outputLog.length,
    runCode,
  ]);

  useHotkeys({
    EXECUTE_ACTION: runOrAdvance,
  });

  const resetToPreviousSnapshot = useCallback(() => {
    if (!resetSnapshot) return;
    resetToSnapshot(resetSnapshot);
    setWorkingSnapshot({
      ...resetSnapshot,
      files: resetSnapshot.files.map((file) => ({ ...file })),
    });
    setIncorrectFeedbackOpen(false);
    setIncorrectFeedbackMessage(null);
  }, [resetSnapshot, resetToSnapshot, setWorkingSnapshot]);

  return (
    <div className="grid col-span-full min-h-0 grid-cols-12">
      <GuidedExerciseTreePane
        currentExercise={currentExercise}
        showBlockOutput={showBlockOutput}
      />

      <GuidedExerciseEditorPane
        runOrAdvance={runOrAdvance}
        phase={phase}
        incorrectFeedbackOpen={incorrectFeedbackOpen}
        incorrectFeedbackMessage={incorrectFeedbackMessage}
        onDismissIncorrectFeedback={() => setIncorrectFeedbackOpen(false)}
        isEditorReadOnly={isEditorReadOnly}
      >
        <GuidedLessonActions
          canGoBack={canGoBack}
          goBack={goBack}
          resetSnapshot={resetSnapshot}
          resetToPreviousSnapshot={resetToPreviousSnapshot}
          runOrAdvance={runOrAdvance}
          isReadOnly={isEditorReadOnly}
          runnerEnabled={runnerFeature.enabled == true}
          phase={phase}
          isRunning={isRunning}
        />
      </GuidedExerciseEditorPane>

      <WorkbenchOutputPane successColorVariant="alt" />
    </div>
  );
}
