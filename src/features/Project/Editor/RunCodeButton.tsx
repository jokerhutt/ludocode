import { useHotkeys } from "@/Hooks/UI/useHotkeys";
import { useCodeRunnerContext } from "../CodeRunnerContext";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function RunCodeButton() {
  const { runCode, outputInfo } = useCodeRunnerContext();
  const { isRunning } = outputInfo;

  useHotkeys({
    EXECUTE_ACTION: runCode,
  });

  return (
    <Button
      onClick={() => {
        if (isRunning) return;
        runCode();
      }}
      variant={isRunning ? "disabled" : "default"}
      className="absolute text-lg font-bold z-10 w-36 max-w-36 min-w-36 py-0.5 px-8  bottom-10 right-10 flex items-center justify-center"
    >
      Run ⌘+⏎
      {isRunning && <Spinner className="text-ludoLightPurple" />}
    </Button>
  );
}
