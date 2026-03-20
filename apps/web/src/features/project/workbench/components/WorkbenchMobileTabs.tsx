import { useCodeRunnerContext } from "@/features/project/workbench/context/CodeRunnerContext.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main.tsx";
import { track } from "@/analytics/track";
import { HeaderNavButton } from "@/layouts/legal/ResourcesLayout";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LogIn } from "lucide-react";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { useEffect, useMemo, useState } from "react";

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

  const handleLoginClick = () => {
    track({
      event: "LOGIN_CLICK",
      properties: { source: "project_header" },
    });
    router.navigate(ludoNavigation.auth.login(false));
  };

  const handleRegisterClick = () => {
    track({
      event: "SIGNUP_CLICK",
      properties: { source: "project_header" },
    });
    router.navigate(ludoNavigation.auth.register(false));
  };

  return (
    <div className="lg:hidden border-t border-ludo-surface">
      <div className="px-4 py-2">
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
      {!authenticated && (
        <div className="border-t border-ludo-surface px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="h-8 flex-1 flex items-center justify-center">
              <HeaderNavButton onClick={handleLoginClick}>
                <LogIn className="w-4 h-4" />
                <span>Log in</span>
              </HeaderNavButton>
            </div>
            <LudoButton
              variant="alt"
              shadow={false}
              className="h-8 flex-1 px-3 text-sm font-medium"
              onClick={handleRegisterClick}
            >
              Register
            </LudoButton>
          </div>
        </div>
      )}
    </div>
  );
}
