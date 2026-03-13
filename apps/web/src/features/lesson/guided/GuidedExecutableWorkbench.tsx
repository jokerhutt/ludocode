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
    stageExecutableAttempt,
    commitExecutableAttempt,
    handleExerciseButtonClick,
  } = useLessonContext();
  const { project, files, entryFileId } = useProjectContext();
  const { runCode, outputInfo } = useCodeRunnerContext();
  const runnerFeature = useFeatureEnabledCheck({ feature: "isPistonEnabled" });
  const { isRunning, outputLog } = outputInfo;

  const [awaitingValidation, setAwaitingValidation] = useState(false);
  const [incorrectFeedbackOpen, setIncorrectFeedbackOpen] = useState(false);
  const [incorrectFeedbackMessage, setIncorrectFeedbackMessage] = useState<
    string | null
  >(null);
  const outputCountBeforeRunRef = useRef(0);

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

  return (
    <div className="grid col-span-full min-h-0 grid-cols-12">
      <GuidedExerciseTreePane
        currentExercise={currentExercise}
        showBlockOutput={showBlockOutput}
      />

      <GuidedExerciseEditorPane
        runOrAdvance={runOrAdvance}
        isRunning={isRunning}
        phase={phase}
        runnerEnabled={runnerFeature.enabled == true}
        incorrectFeedbackOpen={incorrectFeedbackOpen}
        incorrectFeedbackMessage={incorrectFeedbackMessage}
        onDismissIncorrectFeedback={() => setIncorrectFeedbackOpen(false)}
      />

      <WorkbenchOutputPane successColorVariant="alt"/>
    </div>
  );
}
