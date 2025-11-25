import { useHotkeys } from "@/Hooks/UI/useHotkeys";
import { useCodeRunnerContext } from "../CodeRunnerContext";

export function RunCodeButton() {
  const { runCode } = useCodeRunnerContext();

  useHotkeys({
    EXECUTE_ACTION: runCode,
  });

  return (
    <div
      onClick={() => runCode()}
      className="absolute z-10 hover:cursor-pointer rounded-lg py-0.5 px-8 border-ludoLightPurple border-2 text-ludoLightPurple bottom-10 right-10 flex items-center justify-center"
    >
      <p className="font-bold text-lg">Run ⌘+⏎</p>
    </div>
  );
}
