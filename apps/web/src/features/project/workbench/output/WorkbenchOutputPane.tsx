import { IconButton } from "@ludocode/design-system/primitives/icon-button.tsx";
import { Workbench } from "@ludocode/design-system/widgets/Workbench.tsx";
import {
  LudoLog,
  type OutputTriggerColorVariant,
} from "@ludocode/design-system/widgets/ludo-log.tsx";
import { useCodeRunnerContext } from "@/features/project/workbench/context/CodeRunnerContext.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";

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
  const { outputInfo } = useCodeRunnerContext();
  const { clearOutput, outputLog } = outputInfo;

  const isError = (status: number) => status !== 0;

  return (
    <Workbench.Pane
      className={cn(
        "col-span-1 lg:border-l-2 border-l-ludo-surface lg:col-span-3 flex flex-col",
        className,
      )}
    >
      <Workbench.Pane.Winbar
        className={hideWinbarOnMobile ? "hidden lg:block" : undefined}
      >
        <p className="text-sm font-medium hidden lg:block tracking-wide">Output</p>
        <div className="lg:hidden"/>
        <IconButton
          dataTestId="clear-output-icon"
          iconName="TrashIcon"
          onClick={clearOutput}
        />
      </Workbench.Pane.Winbar>
      <Workbench.Pane.Content dataTestId="project-runner" className="gap-0 p-0">
        {outputLog.map((log, logIdx) => {
          const error = isError(log.status);
          const runNumber = logIdx + 1;

          return (
            <LudoLog error={error} collapsible defaultCollapsed={false}>
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
              </LudoLog.Content>
            </LudoLog>
          );
        })}
      </Workbench.Pane.Content>
    </Workbench.Pane>
  );
}
