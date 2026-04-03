import { stripFileName } from "@/features/project/util/filenameUtil";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext";
import { ProjectEditor } from "@/features/project/workbench/zones/ProjectEditor";
import { LudoTab } from "@ludocode/design-system/primitives/tab";
import { Workbench } from "@ludocode/design-system/widgets/workbench";
import { GuidedProjectFeedbackPopover } from "./GuidedProjectFeedbackPopover";
import { SolutionHintDialog } from "./SolutionHintDialog";
import type { ReactNode } from "react";
import { cn } from "@ludocode/design-system/cn-utils";
import { RotateCcwIcon } from "lucide-react";

type SolutionHint = {
  currentCode: string;
  solution: string;
  languageId: string;
  onApplySolution: () => void;
};

type GuidedExerciseEditorPaneProps = {
  runOrAdvance: () => void;
  isComplete: boolean;
  isIncorrect: boolean;
  incorrectFeedbackMessage: string | null;
  onDismissIncorrectFeedback: () => void;
  isEditorReadOnly: boolean;
  canReset: boolean;
  onReset: () => void;
  solutionHint?: SolutionHint | null;
  children: ReactNode;
  className?: string;
};

export function GuidedExerciseEditorPane({
  runOrAdvance,
  isComplete,
  isIncorrect,
  incorrectFeedbackMessage,
  onDismissIncorrectFeedback,
  isEditorReadOnly,
  canReset,
  onReset,
  solutionHint,
  children,
  className,
}: GuidedExerciseEditorPaneProps) {
  const { files, current, setCurrent } = useProjectContext();

  const showCorrectFeedback = isComplete;
  const showIncorrectFeedback = isIncorrect;

  return (
    <Workbench.Pane
      className={cn(
        "relative flex flex-col gap-4 items-stretch justify-start min-w-0",
        className,
      )}
    >
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
        <div className="flex items-center gap-2 lg:hidden ml-auto">
          {solutionHint && <SolutionHintDialog {...solutionHint} />}
          <button
            type="button"
            disabled={!canReset}
            onClick={onReset}
            className="h-8 w-8 flex items-center justify-center rounded-md bg-ludo-surface hover:bg-ludo-surface-hover text-ludo-white-bright transition-colors disabled:opacity-40 disabled:pointer-events-none"
            title="Reset code"
          >
            <RotateCcwIcon className="h-4 w-4" />
          </button>
        </div>
      </Workbench.Pane.Winbar>

      <ProjectEditor
        onExecuteAction={runOrAdvance}
        readOnly={isEditorReadOnly}
      />

      {(showCorrectFeedback || showIncorrectFeedback) && (
        <GuidedProjectFeedbackPopover
          showCorrectFeedback={showCorrectFeedback}
          showIncorrectFeedback={showIncorrectFeedback}
          incorrectFeedbackMessage={incorrectFeedbackMessage}
          onDismissIncorrectFeedback={onDismissIncorrectFeedback}
        />
      )}

      <div className="absolute bottom-16 lg:bottom-10 w-full px-6 lg:px-10 z-10 hidden lg:flex items-center justify-between gap-2">
        {children}
      </div>
    </Workbench.Pane>
  );
}
