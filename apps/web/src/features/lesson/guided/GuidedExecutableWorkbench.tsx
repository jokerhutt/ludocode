import { useHotkeys, useIsMobile } from "@ludocode/hooks";
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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GuidedLessonActions } from "./GuidedLessonActions";
import { useGuidedExerciseNavigation } from "./hooks/useGuidedExerciseNavigation";
import { useGuidedExerciseReviewState } from "./hooks/useGuidedExerciseReviewState";
import { cn } from "@ludocode/design-system/cn-utils";
import { buildProjectSystemPrompt } from "@ludocode/design-system/widgets/chatbot/chatbotSystemPrompts";

type GuidedMobilePane = "instructions" | "code" | "output";

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
    stageExecutableAttempt,
    commitExecutableAttempt,
    handleExerciseButtonClick,
  } = useLessonContext();
  const { project, files, entryFileId, updateContent } = useProjectContext();
  const { runCode, stopCode, outputInfo } = useCodeRunnerContext();
  const runnerFeature = useFeatureEnabledCheck({ feature: "isPistonEnabled" });
  const isMobile = useIsMobile({});
  const { isRunning, outputLog } = outputInfo;

  const [awaitingValidation, setAwaitingValidation] = useState(false);
  const [incorrectAttemptCount, setIncorrectAttemptCount] = useState(0);
  const [incorrectFeedbackOpen, setIncorrectFeedbackOpen] = useState(false);
  const [incorrectFeedbackMessage, setIncorrectFeedbackMessage] = useState<
    string | null
  >(null);
  const [mobilePane, setMobilePane] =
    useState<GuidedMobilePane>("instructions");
  const outputCountBeforeRunRef = useRef(0);
  const { isEditorReadOnly } = useGuidedExerciseReviewState();

  // Reset incorrect count when moving to a new exercise
  useEffect(() => {
    setIncorrectAttemptCount(0);
  }, [currentExercise.id]);

  useEffect(() => {
    if (isMobile) {
      setMobilePane("instructions");
    }
  }, [currentExercise.id, isMobile]);

  const systemPrompt = useMemo(
    () => buildProjectSystemPrompt(currentExercise, project),
    [currentExercise, project],
  );

  useEffect(() => {
    if (!awaitingValidation || isRunning) return;
    if (outputLog.length <= outputCountBeforeRunRef.current) return;

    const latest = outputLog[outputLog.length - 1];
    const output = latest.outputText;
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
      setIncorrectAttemptCount((c) => c + 1);
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
    if (phase !== "DEFAULT") {
      handleExerciseButtonClick();
      return;
    }

    if (!runnerFeature.enabled) return;

    if (isRunning) {
      setAwaitingValidation(false);
      stopCode();
      return;
    }

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
    stopCode,
    outputLog.length,
    runCode,
  ]);

  useHotkeys({
    EXECUTE_ACTION: runOrAdvance,
  });

  const interaction = currentExercise.interaction;
  const solution =
    interaction?.type === "EXECUTABLE" ? interaction.solution : "";
  const currentCode = files[0]?.content ?? "";
  const languageId = files[0]?.language.editorId ?? "plaintext";
  const showSolutionHint =
    !isReviewing && phase === "DEFAULT" && incorrectAttemptCount >= 2;

  const { canGoBack, onGoBack, canReset, onReset } =
    useGuidedExerciseNavigation({
      isRunning,
      isEditorReadOnly,
      onAfterReset: () => {
        setIncorrectFeedbackOpen(false);
        setIncorrectFeedbackMessage(null);
      },
    });

  return (
    <div className="flex flex-col lg:flex-row min-h-0 w-full col-span-full">
      <GuidedExerciseTreePane
        currentExercise={currentExercise}
        showBlockOutput={showBlockOutput}
        systemPrompt={systemPrompt}
        className={cn(
          mobilePane === "instructions" ? "flex-1" : "hidden",
          "transform-none transition-none animate-none",
          "lg:flex lg:flex-col lg:flex-1",
        )}
      />

      <GuidedExerciseEditorPane
        runOrAdvance={runOrAdvance}
        phase={phase}
        incorrectFeedbackOpen={incorrectFeedbackOpen}
        incorrectFeedbackMessage={incorrectFeedbackMessage}
        onDismissIncorrectFeedback={() => setIncorrectFeedbackOpen(false)}
        isEditorReadOnly={isEditorReadOnly}
        className={cn(
          mobilePane === "code" ? "flex-[2]" : "hidden",
          "transform-none transition-none animate-none",
          "lg:flex lg:flex-col lg:flex-[2]",
        )}
      >
        <GuidedLessonActions
          canGoBack={canGoBack}
          onGoBack={onGoBack}
          canReset={canReset}
          onReset={onReset}
          runOrAdvance={runOrAdvance}
          runnerEnabled={runnerFeature.enabled == true}
          phase={phase}
          isRunning={isRunning}
          solutionHint={
            showSolutionHint
              ? {
                  currentCode,
                  solution,
                  languageId,
                  onApplySolution: () => updateContent(solution),
                }
              : null
          }
        />
      </GuidedExerciseEditorPane>

      <WorkbenchOutputPane
        successColorVariant="alt"
        className={cn(
          mobilePane === "output" ? "flex-1" : "hidden",
          "transform-none transition-none animate-none",
          "lg:flex lg:flex-1",
        )}
      />

      <div className="lg:hidden px-4 py-2 border-t border-ludo-surface">
        <div className="flex items-center justify-between gap-2">
          {(
            [
              ["instructions", "Instructions"],
              ["code", "Code"],
              ["output", "Output"],
            ] as const
          ).map(([pane, label]) => {
            const isActive = mobilePane === pane;
            return (
              <button
                key={pane}
                type="button"
                onClick={() => setMobilePane(pane)}
                className={cn(
                  "h-8 rounded-md px-3 flex-1 text-sm font-semibold",
                  isActive
                    ? "bg-ludo-surface text-ludo-white-bright"
                    : "bg-transparent text-ludo-white/90",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
