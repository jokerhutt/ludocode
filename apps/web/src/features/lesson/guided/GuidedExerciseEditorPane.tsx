import { stripFileName } from "@/features/project/util/filenameUtil";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext";
import { ProjectEditor } from "@/features/project/workbench/editor/ProjectEditor";
import { cn } from "@ludocode/design-system/cn-utils";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoTab } from "@ludocode/design-system/primitives/tab";
import { Workbench } from "@ludocode/design-system/widgets/Workbench";
import type { ExercisePhase } from "../zones/LessonFooter";
import { GuidedProjectFeedbackPopover } from "./GuidedProjectFeedbackPopover";
import { RotateCcwIcon } from "lucide-react";

type GuidedExerciseEditorPaneProps = {
  runOrAdvance: () => void;
  isRunning: boolean;
  phase: ExercisePhase;
  runnerEnabled: boolean;
  incorrectFeedbackOpen: boolean;
  incorrectFeedbackMessage: string | null;
  onDismissIncorrectFeedback: () => void;
  canGoBack: boolean;
  onGoBack: () => void;
  onReset: () => void;
  canReset: boolean;
  isEditorReadOnly: boolean;
};

export function GuidedExerciseEditorPane({
  runOrAdvance,
  isRunning,
  phase,
  runnerEnabled,
  incorrectFeedbackOpen,
  incorrectFeedbackMessage,
  onDismissIncorrectFeedback,
  canGoBack,
  onGoBack,
  onReset,
  canReset,
  isEditorReadOnly,
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

      <ProjectEditor
        onExecuteAction={runOrAdvance}
        isMarkedForDeletion={isEditorReadOnly}
      />

      {(showCorrectFeedback || showIncorrectFeedback) && (
        <GuidedProjectFeedbackPopover
          showCorrectFeedback={showCorrectFeedback}
          showIncorrectFeedback={showIncorrectFeedback}
          incorrectFeedbackMessage={incorrectFeedbackMessage}
          onDismissIncorrectFeedback={onDismissIncorrectFeedback}
        />
      )}

      <div className="absolute bottom-10 w-full px-10 z-10 flex items-center justify-between gap-2">
        <div className="flex gap-4 items-center h-10">
          <LudoButton
            type="button"
            variant="default"
            shadow={false}
            disabled={!canGoBack}
            onClick={onGoBack}
            className="h-10 px-4"
          >
            BACK
          </LudoButton>

          <LudoButton
            type="button"
            variant="default"
            shadow={false}
            disabled={isRunning || !canReset}
            onClick={onReset}
            className="h-10 px-4"
          >
            <RotateCcwIcon className="h-4 w-4"/>
          </LudoButton>
        </div>
        <div className="h-10 flex items-center">
          <LudoButton
            data-testid="guided-run-code-button"
            onClick={runOrAdvance}
            isLoading={isRunning}
            variant="alt"
            shadow={false}
            disabled={buttonDisabled}
            className={cn(
              "h-10 py-0.5 px-4 min-w-34",
              phase !== "DEFAULT" && "",
            )}
          >
            {buttonText}
          </LudoButton>
        </div>
      </div>
    </Workbench.Pane>
  );
}
