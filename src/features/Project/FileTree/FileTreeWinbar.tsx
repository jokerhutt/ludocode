import { CircleIconButton } from "@/components/LudoComponents/Atoms/Button/CircleIconButton";
import { NewFilePopover } from "@/components/LudoComponents/Blocks/Popover/NewFilePopover";
import { Winbar } from "@/components/LudoComponents/Blocks/Winbar/Winbar";


export function FileTreeWinbar() {
  return (
    <Winbar>
      <div className="flex h-full text-white justify-between items-center">
        <p>Files</p>
        <NewFilePopover>
          <CircleIconButton iconName="PlusIcon" />
        </NewFilePopover>
      </div>
    </Winbar>
  );
}
