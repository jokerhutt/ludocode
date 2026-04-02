import { BlockRenderer } from "@ludocode/design-system/widgets/exercise/BlockRenderer";
import { Workbench } from "@ludocode/design-system/widgets/workbench";
import type { LudoExercise } from "@ludocode/types";
import { cn } from "@ludocode/design-system/cn-utils";
import { useIsMobile } from "@ludocode/hooks";
import { testIds } from "@ludocode/util/test-ids";

type GuidedExerciseTreePaneProps = {
  showBlockOutput?: boolean;
  currentExercise: LudoExercise;
  systemPrompt: string;
  className?: string;
};

export function GuidedExerciseTreePane({
  showBlockOutput = true,
  currentExercise,
  className,
}: GuidedExerciseTreePaneProps) {
  const isMobile = useIsMobile({});
  const instructionBlocks = currentExercise.blocks.filter(
    (block) => block.type === "instructions",
  );

  return (
    <Workbench.Pane
      dataTestId={testIds.guided.asideLeft}
      className={cn("lg:border-r-2 border-r-ludo-surface", className)}
    >
      <Workbench.Pane.Winbar className="hidden lg:block">
        <p className="text-sm font-medium tracking-wide">Learn</p>
      </Workbench.Pane.Winbar>
      <Workbench.Pane.Content>
        <div className="w-full px-2 pb-4 overflow-y-auto scrollbar-ludo-accent">
          {instructionBlocks.length > 0 && (
            <section className="mt-2 w-full rounded-xl border border-ludo-border bg-ludo-surface/40 p-4 lg:p-5">
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-ludo-border/60 pb-3">
                <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-ludo-accent-muted">
                  Exercise Instructions
                </p>
              </div>

              <div className="flex flex-col gap-4 items-start">
                {instructionBlocks.map((block, index) => (
                  <BlockRenderer
                    key={`instruction-${index}`}
                    lessonType="GUIDED"
                    block={block}
                    showOutput={showBlockOutput}
                    mobile={isMobile}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </Workbench.Pane.Content>
    </Workbench.Pane>
  );
}
