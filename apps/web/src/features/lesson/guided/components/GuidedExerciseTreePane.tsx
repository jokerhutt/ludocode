import { BlockRenderer } from "@ludocode/design-system/widgets/exercise/BlockRenderer";
import { Workbench } from "@ludocode/design-system/widgets/workbench";
import type { LudoExercise } from "@ludocode/types";
import { cn } from "@ludocode/design-system/cn-utils";
import { useIsMobile } from "@ludocode/hooks";
import { testIds } from "@ludocode/util/test-ids";
import { CheckIcon, ListChecksIcon } from "lucide-react";
import type { CSSProperties } from "react";

type GuidedExerciseTreePaneProps = {
  showBlockOutput?: boolean;
  currentExercise: LudoExercise;
  systemPrompt: string;
  isComplete?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function GuidedExerciseTreePane({
  showBlockOutput = true,
  currentExercise,
  isComplete = false,
  className,
  style,
}: GuidedExerciseTreePaneProps) {
  const isMobile = useIsMobile({});
  const blocks = currentExercise.blocks;

  return (
    <Workbench.Pane
      dataTestId={testIds.guided.asideLeft}
      style={style}
      className={cn("lg:border-r-2 border-r-ludo-surface", className)}
    >
      <Workbench.Pane.Winbar className="hidden lg:block">
        <p className="text-sm font-medium tracking-wide">Learn</p>
      </Workbench.Pane.Winbar>
      <Workbench.Pane.Content className="px-3 lg:pr-3 scrollbar-ludo-accent">
        {blocks.length > 0 && (
          <section
            className={cn(
              "w-full shrink-0 rounded-xl border bg-ludo-surface/25 p-4 lg:p-5 transition-colors duration-200",
              isComplete ? "border-ludo-correct" : "border-ludo-border",
            )}
          >
            <div className="mb-4 flex items-center gap-2.5 border-b border-ludo-border/60 pb-3">
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
                  isComplete
                    ? "bg-ludo-success/15 text-ludo-success"
                    : "bg-ludo-surface text-ludo-accent-muted",
                )}
              >
                {isComplete ? (
                  <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                ) : (
                  <ListChecksIcon className="h-3.5 w-3.5" />
                )}
              </span>
              <p
                className={cn(
                  "text-[11px] font-bold tracking-[0.14em] uppercase",
                  isComplete ? "text-ludo-success" : "text-ludo-accent-muted",
                )}
              >
                {isComplete ? "Task Complete" : "Your Task"}
              </p>
            </div>

            <div className="flex flex-col gap-4 items-start">
              {blocks.map((block, index) => (
                <BlockRenderer
                  key={`block-${index}`}
                  lessonType="GUIDED"
                  block={block}
                  showOutput={showBlockOutput}
                  mobile={isMobile}
                />
              ))}
            </div>
          </section>
        )}
      </Workbench.Pane.Content>
    </Workbench.Pane>
  );
}
