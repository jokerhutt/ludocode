import { BlockRenderer } from "@ludocode/design-system/widgets/exercise/BlockRenderer";
import { Workbench } from "@ludocode/design-system/widgets/Workbench";
import type { LudoExercise } from "@ludocode/types";

type GuidedExerciseTreePaneProps = {
  showBlockOutput?: boolean;
  currentExercise: LudoExercise;
};

export function GuidedExerciseTreePane({
  showBlockOutput = true,
  currentExercise,
}: GuidedExerciseTreePaneProps) {
  return (
    <Workbench.Pane
      dataTestId="guided-project-aside-left"
      className="col-span-12 border-r-2 border-r-ludo-surface lg:col-span-3"
    >
      <Workbench.Pane.Winbar>
        <p className="text-sm font-medium tracking-wide">Instructions</p>
      </Workbench.Pane.Winbar>
      <Workbench.Pane.Content>
        <div className="flex flex-col pl-2 gap-4 items-center">
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
