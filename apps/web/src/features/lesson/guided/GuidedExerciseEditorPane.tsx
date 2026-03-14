import { stripFileName } from "@/features/project/util/filenameUtil";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext";
import { ProjectEditor } from "@/features/project/workbench/editor/ProjectEditor";
import { LudoTab } from "@ludocode/design-system/primitives/tab";
import { Workbench } from "@ludocode/design-system/widgets/Workbench";
import type { ExercisePhase } from "../zones/LessonFooter";
import { GuidedProjectFeedbackPopover } from "./GuidedProjectFeedbackPopover";
import type { ReactNode } from "react";
import { cn } from "@ludocode/design-system/cn-utils";

type GuidedExerciseEditorPaneProps = {
  runOrAdvance: () => void;
  phase: ExercisePhase;
  incorrectFeedbackOpen: boolean;
  incorrectFeedbackMessage: string | null;
  onDismissIncorrectFeedback: () => void;
  isEditorReadOnly: boolean;
  children: ReactNode;
  className?: string;
};

export function GuidedExerciseEditorPane({
  runOrAdvance,
  phase,
  incorrectFeedbackOpen,
  incorrectFeedbackMessage,
  onDismissIncorrectFeedback,
  isEditorReadOnly,
  children,
  className,
}: GuidedExerciseEditorPaneProps) {
  const { files, current, setCurrent } = useProjectContext();

  const showCorrectFeedback = phase === "CORRECT";
  const showIncorrectFeedback = incorrectFeedbackOpen;

  return (
    <Workbench.Pane
      className={cn(
        "col-span-12 relative flex flex-col lg:col-span-6 gap-4 items-stretch justify-start min-w-0",
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
        {children}
      </div>
    </Workbench.Pane>
  );
}
