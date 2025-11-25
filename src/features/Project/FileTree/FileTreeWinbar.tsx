import { NewFilePopover } from "@/components/Molecules/Popover/NewFilePopover";
import { ProjectWinbar } from "../ProjectWinbar";
import { CircleIconButton } from "@/components/Atoms/Button/CircleIconButton";

export function FileTreeWinbar() {
  return (
    <ProjectWinbar>
      <div className="flex h-full text-white justify-between items-center">
        <p>Files</p>
        <NewFilePopover>
          <CircleIconButton iconName="PlusIcon" />
        </NewFilePopover>
      </div>
    </ProjectWinbar>
  );
}
