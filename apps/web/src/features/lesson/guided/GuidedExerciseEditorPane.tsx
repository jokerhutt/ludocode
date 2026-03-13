import { stripFileName } from "@/features/project/util/filenameUtil";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext";
import { ProjectEditor } from "@/features/project/workbench/editor/ProjectEditor";
import { cn } from "@ludocode/design-system/cn-utils";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoTab } from "@ludocode/design-system/primitives/tab";
import { Workbench } from "@ludocode/design-system/widgets/Workbench";
import type { ExercisePhase } from "../zones/LessonFooter";

type GuidedExerciseEditorPaneProps = {
  runOrAdvance: () => void;
  isRunning: boolean;
  phase: ExercisePhase;
  runnerEnabled: boolean;
};

export function GuidedExerciseEditorPane({
  runOrAdvance,
  isRunning,
  phase,
  runnerEnabled,
}: GuidedExerciseEditorPaneProps) {
  const { files, current, setCurrent } = useProjectContext();

  const buttonText =
    phase === "DEFAULT"
      ? "RUN ⌘+⏎"
      : phase === "INCORRECT"
        ? "TRY AGAIN"
        : "CONTINUE";

  const buttonDisabled = isRunning || (phase === "DEFAULT" && !runnerEnabled);

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
