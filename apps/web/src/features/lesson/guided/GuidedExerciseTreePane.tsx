import { BlockRenderer } from "@ludocode/design-system/widgets/exercise/BlockRenderer";
import { Workbench } from "@ludocode/design-system/widgets/Workbench";
import type { LudoExercise } from "@ludocode/types";
import { cn } from "@ludocode/design-system/cn-utils";

type GuidedExerciseTreePaneProps = {
  showBlockOutput?: boolean;
  currentExercise: LudoExercise;
  className?: string;
};

export function GuidedExerciseTreePane({
  showBlockOutput = true,
  currentExercise,
  className,
}: GuidedExerciseTreePaneProps) {
  return (
    <Workbench.Pane
      dataTestId="guided-project-aside-left"
      className={cn(
        "col-span-12 lg:border-r-2 border-r-ludo-surface lg:col-span-3",
        className,
      )}
    >
      <Workbench.Pane.Winbar className="hidden lg:block">
        <p className="text-sm font-medium tracking-wide">Instructions</p>
      </Workbench.Pane.Winbar>
      <Workbench.Pane.Content>
        <div className="flex flex-col pl-2 gap-4 items-start lg:items-center">
          {currentExercise.blocks.map((block, index) => (
            <BlockRenderer
              lessonType="GUIDED"
              key={index}
              block={block}
              showOutput={showBlockOutput}
              mobile={false}
            />
          ))}
        </div>
      </Workbench.Pane.Content>
    </Workbench.Pane>
  );
}
