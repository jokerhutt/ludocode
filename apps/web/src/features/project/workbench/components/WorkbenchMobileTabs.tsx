import { useCodeRunnerContext } from "@/features/project/workbench/context/CodeRunnerContext.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { useEffect, useMemo, useState } from "react";

export type WorkbenchMobilePane = "files" | "code" | "output";

type WorkbenchMobileTabsProps = {
  mobilePane: WorkbenchMobilePane;
  setMobilePane: (pane: WorkbenchMobilePane) => void;
};

export function WorkbenchMobileTabs({
  mobilePane,
  setMobilePane,
}: WorkbenchMobileTabsProps) {
  const {
    outputInfo: { isRunning, outputLog },
  } = useCodeRunnerContext();
  const [hasUnreadOutput, setHasUnreadOutput] = useState(false);

  useEffect(() => {
    if (isRunning || outputLog.length > 0) {
      setHasUnreadOutput(true);
    }
  }, [isRunning, outputLog.length]);

  useEffect(() => {
    if (mobilePane === "output") {
      setHasUnreadOutput(false);
    }
  }, [mobilePane]);

  const outputDotClassName = useMemo(() => {
    if (isRunning) return "bg-amber-400";
    const latest = outputLog[outputLog.length - 1];
    if (!latest) return "bg-ludo-white/70";
    if (latest.status === 0) return "bg-emerald-400";
    return "bg-rose-500";
  }, [isRunning, outputLog]);

  return (
    <div className="lg:hidden px-4 py-2 border-t border-ludo-surface">
      <div className="flex items-center justify-between gap-2">
        {(
          [
            ["files", "Files"],
            ["code", "Code"],
            ["output", "Output"],
          ] as const
        ).map(([pane, label]) => {
          const isActive = mobilePane === pane;
          const showOutputDot =
            pane === "output" && hasUnreadOutput && mobilePane !== "output";

          return (
            <button
              key={pane}
              type="button"
              onClick={() => setMobilePane(pane)}
              className={cn(
                "relative h-8 rounded-md px-3 flex-1 text-sm font-semibold",
                isActive
                  ? "bg-ludo-surface text-ludo-white-bright"
                  : "bg-transparent text-ludo-white/90",
              )}
            >
              {label}
              {showOutputDot && (
                <span
                  className={cn(
                    "absolute right-2 top-1.5 h-2 w-2 rounded-full",
                    outputDotClassName,
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
