import { IconButton } from "@ludocode/design-system/primitives/icon-button.tsx";
import { Workbench } from "@ludocode/design-system/widgets/Workbench.tsx";
import { LudoLog } from "@ludocode/design-system/widgets/ludo-log.tsx";
import { useCodeRunnerContext } from "@/features/project/workbench/context/CodeRunnerContext.tsx";

type WorkbenchOutputPaneProps = {};

export function WorkbenchOutputPane({}: WorkbenchOutputPaneProps) {
  const { outputInfo } = useCodeRunnerContext();
  const { clearOutput, outputLog } = outputInfo;

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
          const runNumber = logIdx + 1;

          return (
            <LudoLog error={error} collapsible defaultCollapsed={false}>
              <LudoLog.Trigger position={runNumber} />
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
