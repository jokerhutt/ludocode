import { CircleButton } from "@/components/design-system/atoms/button/circle-button.tsx";
import { NewFilePopover } from "@/components/design-system/blocks/popover/new-file-popover.tsx";
import { Winbar } from "@/components/design-system/blocks/winbar/winbar.tsx";


export function FileTreeWinbar() {
  return (
    <Winbar>
      <div className="flex h-full text-white justify-between items-center">
        <p>Files</p>
        <NewFilePopover>
          <CircleButton iconName="PlusIcon" />
        </NewFilePopover>
      </div>
    </Winbar>
  );
}
