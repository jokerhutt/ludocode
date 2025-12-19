import { useHotkeys } from "@/hooks/UI/useHotkeys";
import { useCodeRunnerContext } from "@/features/Project/Context/CodeRunnerContext.tsx";
import { Button } from "@/components/external/ui/button";
import { Spinner } from "@/components/external/ui/spinner";
import { LudoButton } from "@/components/design/primitives/LudoButton";

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
      variant={"alt"}
      disabled={isRunning}
      className="absolute gap-2 text-lg font-bold z-10 w-48 h-10 max-w-48 min-w-48 py-0.5 px-8  bottom-10 right-10 flex items-center justify-center"
    >
      Run ⌘+⏎
      {isRunning && <Spinner className="text-ludoLightPurple" />}
    </LudoButton>
  );
}
