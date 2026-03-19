import { stripFileName } from "@/features/project/util/filenameUtil";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext";
import { ProjectEditor } from "@/features/project/workbench/editor/ProjectEditor";
import { LudoTab } from "@ludocode/design-system/primitives/tab";
import { Workbench } from "@ludocode/design-system/widgets/Workbench";
import { GuidedProjectFeedbackPopover } from "./GuidedProjectFeedbackPopover";
import type { ReactNode } from "react";
import { cn } from "@ludocode/design-system/cn-utils";

type GuidedExerciseEditorPaneProps = {
  runOrAdvance: () => void;
  isComplete: boolean;
  isIncorrect: boolean;
  incorrectFeedbackMessage: string | null;
  onDismissIncorrectFeedback: () => void;
  isEditorReadOnly: boolean;
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

      <div className="absolute bottom-16 lg:bottom-10 w-full px-6 lg:px-10 z-10 flex items-center justify-between gap-2">
        {children}
      </div>
    </Workbench.Pane>
  );
}
