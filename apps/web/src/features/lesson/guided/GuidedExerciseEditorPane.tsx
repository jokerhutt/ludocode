import { stripFileName } from "@/features/project/util/filenameUtil";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext";
import { ProjectEditor } from "@/features/project/workbench/editor/ProjectEditor";
import { cn } from "@ludocode/design-system/cn-utils";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoTab } from "@ludocode/design-system/primitives/tab";
import { Workbench } from "@ludocode/design-system/widgets/Workbench";
import { X } from "lucide-react";
import type { ExercisePhase } from "../zones/LessonFooter";

type GuidedExerciseEditorPaneProps = {
  runOrAdvance: () => void;
  isRunning: boolean;
  phase: ExercisePhase;
  runnerEnabled: boolean;
  incorrectFeedbackOpen: boolean;
  onDismissIncorrectFeedback: () => void;
};

export function GuidedExerciseEditorPane({
  runOrAdvance,
  isRunning,
  phase,
  runnerEnabled,
  incorrectFeedbackOpen,
  onDismissIncorrectFeedback,
}: GuidedExerciseEditorPaneProps) {
  const { files, current, setCurrent } = useProjectContext();

  const buttonText = phase === "CORRECT" ? "CONTINUE" : "SUBMIT ⌘+⏎";

  const buttonDisabled = isRunning || (phase === "DEFAULT" && !runnerEnabled);
  const showCorrectFeedback = phase === "CORRECT";
  const showIncorrectFeedback = incorrectFeedbackOpen;

  return (
    <Workbench.Pane className="col-span-12 relative flex flex-col lg:col-span-6 gap-4 items-stretch justify-start min-w-0">
      <Workbench.Pane.Winbar>
        <LudoTab.Group>
          {files.map((file, index) => {
            const id = file.id ?? file.tempId ?? `${file.path}-${index}`;
            return (
              <LudoTab.Item
                key={id}
                isActive={index === current}
                onClick={() => setCurrent(index)}
              >
                <p>{stripFileName(file.path)}</p>
              </LudoTab.Item>
            );
          })}
        </LudoTab.Group>
      </Workbench.Pane.Winbar>

      <ProjectEditor />

      {(showCorrectFeedback || showIncorrectFeedback) && (
        <div
          className={cn(
            "absolute z-10 bottom-22 right-10 w-56 rounded-lg border bg-ludo-surface px-3 py-2",
            showCorrectFeedback
              ? "border-ludo-correct"
              : "border-ludo-incorrect",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-ludo-white-bright">
              {showCorrectFeedback ? "Great work!" : "Not quite!"}
            </p>
            {showIncorrectFeedback && (
              <button
                type="button"
                onClick={onDismissIncorrectFeedback}
                className="rounded p-1 text-ludo-white/70 hover:text-ludo-white hover:bg-ludo-background"
                aria-label="Close feedback"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      <LudoButton
        data-testid="guided-run-code-button"
        onClick={runOrAdvance}
        isLoading={isRunning}
        variant="alt"
        disabled={buttonDisabled}
        className={cn(
          "absolute text-lg font-bold z-10 w-48 h-10 max-w-48 min-w-48 py-0.5 px-8 bottom-10 right-10",
          phase !== "DEFAULT" && "w-56 max-w-56 min-w-56",
        )}
      >
        {buttonText}
      </LudoButton>
    </Workbench.Pane>
  );
}
