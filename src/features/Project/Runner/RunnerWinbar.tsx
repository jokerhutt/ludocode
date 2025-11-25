import { ProjectWinbar } from "../ProjectWinbar.tsx";
import { CircleIconButton } from "@/components/Atoms/Button/CircleIconButton.tsx";
import { useCodeRunnerContext } from "../CodeRunnerContext.tsx";

export function RunnerWinbar() {

  const {outputInfo} = useCodeRunnerContext()
  const {clearOutput} = outputInfo

  return (
    <ProjectWinbar>
      <div className="flex h-full text-white justify-between items-center">
        <p className="">Output</p>
        <CircleIconButton iconName="TrashIcon" onClick={clearOutput} />
      </div>
    </ProjectWinbar>
  );
}
