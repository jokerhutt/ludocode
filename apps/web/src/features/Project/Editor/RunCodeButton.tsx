import { useCodeRunnerContext } from "@/features/Project/Context/CodeRunnerContext.tsx";
import { LudoButton } from "../../../../../../packages/design-system/primitives/ludo-button.tsx";
import { useHotkeys } from "@ludocode/hooks";

export function RunCodeButton() {
  const { runCode, outputInfo } = useCodeRunnerContext();
  const { isRunning } = outputInfo;

  useHotkeys({
    EXECUTE_ACTION: runCode,
  });

  return (
    <LudoButton
      onClick={() => {
        if (isRunning) return;
        runCode();
      }}
      isLoading={isRunning}
      variant={"alt"}
      disabled={isRunning}
      className="absolute text-lg font-bold z-10 w-48 h-10 max-w-48 min-w-48 py-0.5 px-8 bottom-10 right-10"
    >
      Run ⌘+⏎
    </LudoButton>
  );
}
