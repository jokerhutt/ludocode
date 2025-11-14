import { TrashIcon } from "lucide-react";
import { ProjectWinbar } from "../ProjectWinbar";

type RunnerWinbarProps = {clearOutput: () => void};

export function RunnerWinbar({clearOutput}: RunnerWinbarProps) {
  return (
    <ProjectWinbar>
      <div className="flex h-full text-white justify-between items-center">
        <p className="">Output</p>
        <div
          onClick={() => clearOutput()}
          className="p-0.5 hover:cursor-pointer hover:bg-ludoLightPurple/80 rounded-full"
        >
          <TrashIcon className="h-4" />
        </div>
      </div>
    </ProjectWinbar>
  );
}
