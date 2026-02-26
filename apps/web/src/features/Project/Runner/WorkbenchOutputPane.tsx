import { IconButton } from "@ludocode/design-system/primitives/icon-button";
import { Workbench } from "../components/Workbench";
import { useCodeRunnerContext } from "../Context/CodeRunnerContext";

type WorkbenchOutputPaneProps = {};

export function WorkbenchOutputPane({}: WorkbenchOutputPaneProps) {
  const { outputInfo } = useCodeRunnerContext();
  const { clearOutput, outputLog } = outputInfo;
  return (
    <Workbench.Pane className="col-span-1 border-l-2 border-l-ludo-surface lg:col-span-3 flex flex-col">
      <Workbench.Pane.Winbar>
        <p className="">Output</p>
        <IconButton
          dataTestId="clear-output-icon"
          iconName="TrashIcon"
          onClick={clearOutput}
        />
      </Workbench.Pane.Winbar>
        <Workbench.Pane.Content data-testid={`project-runner`}>
          {outputLog.map((log, logIdx) => {
            const isError = (status: number) => status != 0;
            return (
              <div
                key={logIdx}
                className={`w-full flex flex-col py-4 border-b-2 ${
                  isError(log.status)
                    ? "text-red-400 border-b-red-400"
                    : "text-white border-b-white"
                } `}
              >
                {log.output.map((line, lineIdx) => (
                  <p key={`${logIdx}-${lineIdx}-${line}`} className="text-sm">
                    {line}
                  </p>
                ))}
              </div>
            );
          })}
        </Workbench.Pane.Content>
    </Workbench.Pane>
  );
}
