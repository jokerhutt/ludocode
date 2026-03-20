import { useCodeRunnerContext } from "@/features/project/workbench/context/CodeRunnerContext.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { useEffect, useMemo, useState } from "react";
import { FooterCTAGroup } from "@/features/auth/components/FooterCTAGroup";
import { MobileTabs } from "@/components/MobileTabs";

export type WorkbenchMobilePane = "files" | "code" | "output";

type WorkbenchMobileTabsProps = {
  authenticated: boolean;
  mobilePane: WorkbenchMobilePane;
  setMobilePane: (pane: WorkbenchMobilePane) => void;
};

export function WorkbenchMobileTabs({
  authenticated,
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
    <div className="lg:hidden border-t border-ludo-surface">
      <div className="px-4 py-2">
        <MobileTabs
          value={mobilePane}
          onValueChange={(value) => setMobilePane(value as WorkbenchMobilePane)}
        >
          <MobileTabs.Tab value="files">Files</MobileTabs.Tab>
          <MobileTabs.Tab value="code">Code</MobileTabs.Tab>
          <MobileTabs.Tab
            value="output"
            badge={
              hasUnreadOutput && mobilePane !== "output" ? (
                <span
                  className={cn(
                    "absolute right-2 top-1.5 h-2 w-2 rounded-full",
                    outputDotClassName,
                  )}
                />
              ) : null
            }
          >
            Output
          </MobileTabs.Tab>
        </MobileTabs>
      </div>
      {!authenticated && <FooterCTAGroup source="project_hub_footer" />}
    </div>
  );
}
