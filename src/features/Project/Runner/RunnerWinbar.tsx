
import { Winbar } from "@/components/design-system/blocks/winbar/winbar.tsx";
import { useCodeRunnerContext } from "@/features/Project/Context/CodeRunnerContext.tsx";
import { CircleButton } from "@/components/design-system/atoms/button/circle-button.tsx";

export function RunnerWinbar() {
  const { outputInfo } = useCodeRunnerContext();
  const { clearOutput } = outputInfo;

  return (
    <Winbar>
      <div className="flex h-full text-white justify-between items-center">
        <p className="">Output</p>
        <CircleButton iconName="TrashIcon" onClick={clearOutput} />
      </div>
    </Winbar>
  );
}
