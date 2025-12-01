
import { Winbar } from "@/components/LudoComponents/Blocks/Winbar/Winbar.tsx";
import { useCodeRunnerContext } from "../../../Hooks/Context/Runner/CodeRunnerContext.tsx";
import { CircleIconButton } from "@/components/LudoComponents/Atoms/Button/CircleIconButton.tsx";

export function RunnerWinbar() {
  const { outputInfo } = useCodeRunnerContext();
  const { clearOutput } = outputInfo;

  return (
    <Winbar>
      <div className="flex h-full text-white justify-between items-center">
        <p className="">Output</p>
        <CircleIconButton iconName="TrashIcon" onClick={clearOutput} />
      </div>
    </Winbar>
  );
}
