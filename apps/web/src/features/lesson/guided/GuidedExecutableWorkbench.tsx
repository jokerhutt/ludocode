import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { LudoTab } from "@ludocode/design-system/primitives/tab.tsx";
import { cn } from "@ludocode/design-system/cn-utils";
import { BlockRenderer } from "@ludocode/design-system/widgets/exercise/BlockRenderer";
import { Workbench } from "@ludocode/design-system/widgets/Workbench";
import { useHotkeys } from "@ludocode/hooks";
import { qo } from "@/queries/definitions/queries.ts";
import { useLessonContext } from "@/features/lesson/context/useLessonContext";
import { ProjectProvider } from "@/features/project/workbench/context/ProjectContext.tsx";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import { CodeRunnerProvider } from "@/features/project/workbench/context/CodeRunnerContext.tsx";
import { useCodeRunnerContext } from "@/features/project/workbench/context/CodeRunnerContext.tsx";
import { useFeatureEnabledCheck } from "@/features/auth/hooks/useFeatureEnabledCheck";
import { ProjectEditor } from "@/features/project/workbench/editor/ProjectEditor.tsx";
import { WorkbenchOutputPane } from "@/features/project/workbench/output/WorkbenchOutputPane.tsx";
import { stripFileName } from "@/features/project/util/filenameUtil.ts";
import { evaluateExecutableTests } from "../util/executableTestUtil";
import { GuidedExerciseTreePane } from "./GuidedExerciseTreePane";
import { GuidedExerciseEditorPane } from "./GuidedExerciseEditorPane";
import type { ExecutableTest, ExerciseAttempt } from "@ludocode/types";
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
    handleExerciseButtonClick,
  } = useLessonContext();
  const { files, current, setCurrent } = useProjectContext();
  const { runCode, outputInfo } = useCodeRunnerContext();
  const runnerFeature = useFeatureEnabledCheck({ feature: "isPistonEnabled" });
  const { isRunning, outputLog } = outputInfo;

  const [awaitingValidation, setAwaitingValidation] = useState(false);
  const outputCountBeforeRunRef = useRef(0);

  useEffect(() => {
    if (!awaitingValidation || isRunning) return;
    if (outputLog.length <= outputCountBeforeRunRef.current) return;

    const latest = outputLog[outputLog.length - 1];
    const output = latest.output.join("\n");
    const filesPayload = files.map((file) => ({
      name: stripFileName(file.path),
      content: file.content,
    }));
    const isCorrect = evaluateExecutableTests({
      tests,
      output,
      status: latest.status,
      files: filesPayload,
    });

    const attempt: ExerciseAttempt = {
      exerciseId: currentExercise.id,
      isCorrect,
      answer: [
        {
          value: JSON.stringify({ files: filesPayload, output }),
        },
      ],
    };

    stageExecutableAttempt(attempt);
    setAwaitingValidation(false);
  }, [
    awaitingValidation,
    isRunning,
    outputLog,
    files,
    tests,
    currentExercise.id,
    stageExecutableAttempt,
  ]);

  const runOrAdvance = useCallback(() => {
    if (isRunning) return;

    if (phase !== "DEFAULT") {
      handleExerciseButtonClick();
      return;
    }

    if (!runnerFeature.enabled) return;

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
      />

      <WorkbenchOutputPane />
    </div>
  );
}
