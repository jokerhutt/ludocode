import { IconButton } from "@ludocode/design-system/primitives/icon-button.tsx";
import { Workbench } from "@ludocode/design-system/widgets/Workbench.tsx";
import {
  LudoLog,
  type OutputTriggerColorVariant,
} from "@ludocode/design-system/widgets/ludo-log.tsx";
import { useCodeRunnerContext } from "@/features/project/workbench/context/CodeRunnerContext.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { useState } from "react";

type WorkbenchOutputPaneProps = {
  successColorVariant?: OutputTriggerColorVariant;
  className?: string;
  hideWinbarOnMobile?: boolean;
};

export function WorkbenchOutputPane({
  successColorVariant = "default",
  className,
  hideWinbarOnMobile = false,
}: WorkbenchOutputPaneProps) {
  const { outputInfo, sendStdin } = useCodeRunnerContext();
  const { canSendStdin, clearOutput, isRunning, outputLog } = outputInfo;
  const [stdinValue, setStdinValue] = useState("");

  const handleSubmit = () => {
    if (!canSendStdin) return;
    const sent = sendStdin(`${stdinValue}\n`);
    if (sent) {
      setStdinValue("");
    }
  };

  return (
    <Workbench.Pane
      className={cn(
        "grid-rows-[auto_1fr_auto]",
        "col-span-1 lg:border-l-2 border-l-ludo-surface lg:col-span-3 flex flex-col",
        className,
      )}
    >
      <Workbench.Pane.Winbar
        className={hideWinbarOnMobile ? "hidden lg:block" : undefined}
      >
        <p className="text-sm font-medium tracking-wide">Output</p>
        <IconButton
          dataTestId="clear-output-icon"
          iconName="TrashIcon"
          onClick={clearOutput}
          disabled={isRunning}
        />
      </Workbench.Pane.Winbar>
      <Workbench.Pane.Content dataTestId="project-runner" className="gap-0 p-0">
        {outputLog.map((log, logIdx) => {
          const runNumber = logIdx + 1;
          const isActiveRun = logIdx === outputLog.length - 1 && isRunning;
          const status =
            log.isComplete === false
              ? "pending"
              : log.status === 0
                ? "success"
                : "error";

          return (
            <LudoLog
              key={logIdx}
              status={status}
              collapsible
              defaultCollapsed={false}
            >
              <LudoLog.Trigger
                successColorVariant={successColorVariant}
                position={runNumber}
              />
              <LudoLog.Content>
                {log.output.map((line, lineIdx) => (
                  <LudoLog.Line
                    key={`${logIdx}-${lineIdx}-${line}`}
                    line={line}
                  />
                ))}
                {isActiveRun && (
                  <div className="flex items-center gap-2">
                    <span className="select-none text-ludo-white-bright/60">
                      {">"}
                    </span>
                    <input
                      data-testid="runner-stdin-input"
                      type="text"
                      value={stdinValue}
                      onChange={(event) => setStdinValue(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key !== "Enter") return;
                        event.preventDefault();
                        handleSubmit();
                      }}
                      disabled={!canSendStdin}
                      className={cn(
                        "min-w-0 flex-1 bg-transparent p-0 text-xs text-ludo-white-bright outline-none",
                        !canSendStdin && "cursor-not-allowed opacity-60",
                      )}
                    />
                  </div>
                )}
              </LudoLog.Content>
            </LudoLog>
          );
        })}
      </Workbench.Pane.Content>
    </Workbench.Pane>
  );
}
