import { NewFilePopover } from "@/features/Project/FileTree/new-file-popover.tsx";
import { IconButton } from "@ludocode/design-system/primitives/icon-button.tsx";
import { Winbar } from "@ludocode/design-system/zones/winbar.tsx";

export function FileTreeWinbar() {
  return (
    <Winbar>
      <div className="flex h-full text-white justify-between items-center">
        <p>Files</p>
        <NewFilePopover>
          <IconButton dataTestId="open-file-popover-icon" iconName="PlusIcon" />
        </NewFilePopover>
      </div>
    </Winbar>
  );
}
