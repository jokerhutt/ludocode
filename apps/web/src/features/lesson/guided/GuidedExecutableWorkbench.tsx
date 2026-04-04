import { getRouteApi } from "@tanstack/react-router";
import { useHotkeys, useIsMobile } from "@ludocode/hooks";
import {
  useLessonEvaluation,
  useLessonExercise,
  useLessonSubmission,
} from "@/features/lesson/context/useLessonContext";
import { useExerciseNavigation } from "@/features/lesson/hooks/useExerciseNavigation";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import { useCodeRunnerContext } from "@/features/project/workbench/context/CodeRunnerContext.tsx";
import { useFeatureEnabledCheck } from "@/features/auth/hooks/useFeatureEnabledCheck";
import { WorkbenchOutputPane } from "@/features/project/workbench/zones/WorkbenchOutputPane";
import { stripFileName } from "@/features/project/util/filenameUtil.ts";
import {
  evaluateExecutableTests,
  getFirstFailedExecutableTestFeedback,
} from "../util/executableTestUtil";
import { GuidedExerciseTreePane } from "./components/GuidedExerciseTreePane";
import { GuidedExerciseEditorPane } from "./components/GuidedExerciseEditorPane";
import type { ExecutableTest, ExerciseAttempt } from "@ludocode/types";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGuidedExerciseReviewState } from "./hooks/useGuidedExerciseReviewState";
import { cn } from "@ludocode/design-system/cn-utils";
import { buildProjectSystemPrompt } from "@ludocode/design-system/widgets/chatbot/chatbotSystemPrompts";
import { useGuidedExercise } from "@/features/lesson/guided/context/useGuidedExerciseContext.tsx";
import { GuidedLessonActions } from "./components/GuidedLessonActions";
import { MobileTabs, useMobileTabs } from "@/components/MobileTabs";

type GuidedMobilePane = "instructions" | "code" | "output";

export function GuidedExecutableWorkbench({
  tests,
  showBlockOutput,
}: {
  tests: ExecutableTest[];
  showBlockOutput: boolean;
}) {
  const lessonPageRoute = getRouteApi(
    "/app/lesson/$courseId/$moduleId/$lessonId/",
  );
  const { exercise } = lessonPageRoute.useSearch();
  const position = Number(exercise ?? 1);
  const { currentExercise } = useLessonExercise();
  const {
    isComplete,
    isIncorrect,
    incorrectFeedbackMessage,
    dismissIncorrectFeedback,
  } = useLessonEvaluation();
  const { submitAttempt, continueToNextExercise } = useLessonSubmission();
  const { resetSnapshot, setWorkingSnapshot } = useGuidedExercise();
  const { canGoBack, goBack } = useExerciseNavigation({ position });
  const {
    project,
    files,
    active,
    entryFileId,
    updateContent,
    resetToSnapshot,
  } = useProjectContext();
  const { runCode, stopCode, outputInfo } = useCodeRunnerContext();
  const runnerFeature = useFeatureEnabledCheck({ feature: "isPistonEnabled" });
  const isMobile = useIsMobile({});
  const { isRunning, outputLog } = outputInfo;

  const [awaitingValidation, setAwaitingValidation] = useState(false);
  const [incorrectAttemptCount, setIncorrectAttemptCount] = useState(0);
  const { activeTab: mobilePane, selectTab: setMobilePane } =
    useMobileTabs<GuidedMobilePane>("instructions");
  const outputCountBeforeRunRef = useRef(0);
  const { isEditorReadOnly } = useGuidedExerciseReviewState();

  useEffect(() => {
    setIncorrectAttemptCount(0);
  }, [currentExercise.id]);

  useEffect(() => {
    if (isMobile) {
      setMobilePane("instructions");
    }
  }, [currentExercise.id, isMobile]);

  useEffect(() => {
    if (isMobile && isRunning) {
      setMobilePane("output");
    }
  }, [isMobile, isRunning, setMobilePane]);

  const systemPrompt = useMemo(
    () => buildProjectSystemPrompt(currentExercise, project),
    [currentExercise, project],
  );
  const filesSignature = useMemo(
    () => files.map((file) => `${file.path}:${file.content}`).join("::"),
    [files],
  );

  const previousFilesSignatureRef = useRef(filesSignature);

  useEffect(() => {
    if (previousFilesSignatureRef.current === filesSignature) return;

    previousFilesSignatureRef.current = filesSignature;

    if (!isIncorrect) return;

    dismissIncorrectFeedback();
  }, [dismissIncorrectFeedback, filesSignature, isIncorrect]);

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
      entryFilePath: entryFileId,
    };

    const attempt: ExerciseAttempt = {
      exerciseId: currentExercise.id,
      isCorrect,
      answer: { submission: projectSnapshotAttempt },
    };

    if (isCorrect) {
      dismissIncorrectFeedback();
    } else {
      setIncorrectAttemptCount((count) => count + 1);
    }

    submitAttempt(attempt, failedFeedback);
    setAwaitingValidation(false);
  }, [
    awaitingValidation,
    currentExercise.id,
    dismissIncorrectFeedback,
    entryFileId,
    files,
    isRunning,
    outputLog,
    project,
    submitAttempt,
    tests,
  ]);

  const runOnly = useCallback(() => {
    if (!runnerFeature.enabled) return;

    if (isRunning) {
      stopCode();
      return;
    }

    runCode();
  }, [isRunning, runCode, runnerFeature.enabled, stopCode]);

  const runOrAdvance = useCallback(() => {
    if (isComplete) {
      continueToNextExercise();
      return;
    }

    if (!runnerFeature.enabled) return;

    if (isRunning) {
      dismissIncorrectFeedback();
      setAwaitingValidation(false);
      stopCode();
      return;
    }

    dismissIncorrectFeedback();
    outputCountBeforeRunRef.current = outputLog.length;
    setAwaitingValidation(true);
    runCode();
  }, [
    continueToNextExercise,
    dismissIncorrectFeedback,
    isComplete,
    isRunning,
    outputLog.length,
    runCode,
    runnerFeature.enabled,
    stopCode,
  ]);

  useHotkeys({
    EXECUTE_ACTION: runOrAdvance,
  });

  const interaction = currentExercise.interaction;
  const solution =
    interaction?.type === "EXECUTABLE" ? interaction.solution : "";
  const currentCode = active?.content ?? "";
  const languageId = active?.language ?? "plaintext";
  const showSolutionHint = !isComplete && incorrectAttemptCount >= 2;
  const canReset = useMemo(() => {
    return !!resetSnapshot && !isEditorReadOnly && !isRunning;
  }, [isEditorReadOnly, isRunning, resetSnapshot]);

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

    dismissIncorrectFeedback();
  }, [
    dismissIncorrectFeedback,
    isEditorReadOnly,
    isRunning,
    resetSnapshot,
    resetToSnapshot,
    setWorkingSnapshot,
  ]);

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
        isComplete={isComplete}
        isIncorrect={isIncorrect}
        incorrectFeedbackMessage={incorrectFeedbackMessage}
        onDismissIncorrectFeedback={dismissIncorrectFeedback}
        isEditorReadOnly={isEditorReadOnly}
        canReset={canReset}
        onReset={onReset}
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
        className={cn(
          mobilePane === "code" ? "flex-2" : "hidden",
          "transform-none transition-none animate-none",
          "lg:flex lg:flex-col lg:flex-2",
        )}
      >
        <GuidedLessonActions
          canGoBack={canGoBack}
          onGoBack={onGoBack}
          canReset={canReset}
          onReset={onReset}
          runOnly={runOnly}
          runOrAdvance={runOrAdvance}
          runnerEnabled={runnerFeature.enabled == true}
          isComplete={isComplete}
          isIncorrect={isIncorrect}
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

      <div className="lg:hidden border-t border-ludo-surface">
        <div className="px-4 py-2">
          <MobileTabs
            value={mobilePane}
            onValueChange={(value) => setMobilePane(value as GuidedMobilePane)}
          >
            <MobileTabs.Tab value="instructions">Instructions</MobileTabs.Tab>
            <MobileTabs.Tab value="code">Code</MobileTabs.Tab>
            <MobileTabs.Tab value="output">Output</MobileTabs.Tab>
          </MobileTabs>
        </div>
        <div className="px-4 w-full flex items-center justify-between gap-2 pb-3 pt-1">
          <GuidedLessonActions
            canGoBack={canGoBack}
            onGoBack={onGoBack}
            canReset={canReset}
            onReset={onReset}
            runOnly={runOnly}
            runOrAdvance={runOrAdvance}
            runnerEnabled={runnerFeature.enabled == true}
            isComplete={isComplete}
            isIncorrect={isIncorrect}
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
        </div>
      </div>
    </div>
  );
}
