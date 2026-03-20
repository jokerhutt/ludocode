import { useCodeRunnerContext } from "@/features/project/workbench/context/CodeRunnerContext.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { useHotkeys } from "@ludocode/hooks";

export function RunCodeButton({ disabled }: { disabled?: boolean }) {
  const { runCode, stopCode, outputInfo } = useCodeRunnerContext();
  const { isRunning } = outputInfo;

  useHotkeys({
    EXECUTE_ACTION: isRunning ? stopCode : runCode,
  });

  return (
    <LudoButton
      data-testid={`run-code-button`}
      onClick={isRunning ? stopCode : runCode}
      variant={isRunning ? "default" : "alt"}
      disabled={disabled}
      className="absolute text-lg font-bold z-10 w-40 lg:w-48 h-8 lg:h-10 lg:max-w-48 lg:min-w-48 py-0.5 px-8 bottom-5 lg:bottom-10 left-8 lg:left-auto lg:right-10"
    >
      {isRunning ? "Stop" : "Run"}
    </LudoButton>
  );
}
