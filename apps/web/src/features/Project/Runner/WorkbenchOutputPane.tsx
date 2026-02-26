import { useState, useCallback } from "react";
import { IconButton } from "@ludocode/design-system/primitives/icon-button";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CheckCircle2Icon,
  XCircleIcon,
} from "lucide-react";
import { cn } from "@ludocode/design-system/cn-utils";
import { Workbench } from "../components/Workbench";
import { useCodeRunnerContext } from "../Context/CodeRunnerContext";

type WorkbenchOutputPaneProps = {};

export function WorkbenchOutputPane({}: WorkbenchOutputPaneProps) {
  const { outputInfo } = useCodeRunnerContext();
  const { clearOutput, outputLog } = outputInfo;
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  const toggle = useCallback((idx: number) => {
    setCollapsed((prev) => ({ ...prev, [idx]: !prev[idx] }));
  }, []);

  const isError = (status: number) => status !== 0;

  return (
    <Workbench.Pane className="col-span-1 border-l-2 border-l-ludo-surface lg:col-span-3 flex flex-col">
      <Workbench.Pane.Winbar>
        <p className="text-sm font-medium tracking-wide">Output</p>
        <IconButton
          dataTestId="clear-output-icon"
          iconName="TrashIcon"
          onClick={clearOutput}
        />
      </Workbench.Pane.Winbar>
      <Workbench.Pane.Content dataTestId="project-runner" className="gap-0 p-0">
        {outputLog.map((log, logIdx) => {
          const error = isError(log.status);
          const isCollapsed = !!collapsed[logIdx];
          const runNumber = outputLog.length - logIdx;

          return (
            <div
              key={logIdx}
              className={cn(
                "w-full border-b border-white/5",
                error ? "bg-red-950/20" : "bg-transparent",
              )}
            >
              <button
                type="button"
                onClick={() => toggle(logIdx)}
                className={cn(
                  "w-full flex items-center gap-2 px-4 py-2 text-left transition-colors",
                  "hover:bg-white/5 hover:cursor-pointer select-none",
                )}
              >
                {isCollapsed ? (
                  <ChevronRightIcon className="w-3.5 h-3.5 text-white/40 shrink-0" />
                ) : (
                  <ChevronDownIcon className="w-3.5 h-3.5 text-white/40 shrink-0" />
                )}
                {error ? (
                  <XCircleIcon className="w-3.5 h-3.5 text-red-400 shrink-0" />
                ) : (
                  <CheckCircle2Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    error ? "text-red-400" : "text-emerald-400",
                  )}
                >
                  Run #{runNumber}
                </span>
                <span className="text-[10px] text-white/25 ml-auto">
                  {error ? "exited with error" : "success"}
                </span>
              </button>

              {!isCollapsed && (
                <div className="px-4 pb-3 pt-1">
                  <div
                    className={cn(
                      "rounded-md bg-ludo-surface/30 px-3 py-2 font-mono text-xs leading-relaxed overflow-x-auto",
                      error ? "text-red-300" : "text-white/90",
                    )}
                  >
                    {log.output.map((line, lineIdx) => (
                      <pre
                        key={`${logIdx}-${lineIdx}-${line}`}
                        className="whitespace-pre-wrap break-all"
                      >
                        {line}
                      </pre>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </Workbench.Pane.Content>
    </Workbench.Pane>
  );
}
