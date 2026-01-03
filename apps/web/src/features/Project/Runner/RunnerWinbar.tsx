import { Winbar } from "@ludocode/design-system/zones/winbar.tsx";
import { useCodeRunnerContext } from "@/features/Project/Context/CodeRunnerContext.tsx";
import { IconButton } from "@ludocode/design-system/primitives/icon-button.tsx";

export function RunnerWinbar() {
  const { outputInfo } = useCodeRunnerContext();
  const { clearOutput } = outputInfo;

  return (
    <Winbar>
      <div className="flex h-full text-white justify-between items-center">
        <p className="">Output</p>
        <IconButton iconName="TrashIcon" onClick={clearOutput} />
      </div>
    </Winbar>
  );
}
