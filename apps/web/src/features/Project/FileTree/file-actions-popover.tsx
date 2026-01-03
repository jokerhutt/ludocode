import type { ReactNode } from "react";
import {
  FileWrapper,
  FileInfoRow,
} from "@ludocode/design-system/primitives/file.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ludocode/external/ui/popover.tsx";
import { DeleteDialog } from "@ludocode/design-system/templates/dialog/delete-dialog.tsx";
import { HeroIcon } from "@ludocode/design-system/primitives/hero-icon.tsx";
import { RenameDialog } from "@ludocode/design-system/templates/dialog/rename-dialog.tsx";

type FileActionsPopoverProps = {
  children: ReactNode;
  itemType: string;
  targetId: string;
  targetName: string;
  renameItem: (oldPath: string, newPath: string) => void;
  deleteItem: () => void;
};

export function FileActionsPopover({
  children,
  targetId,
  targetName,
  renameItem,
  itemType,
  deleteItem,
}: FileActionsPopoverProps) {
  return (
    <>
      <Popover modal={true}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          onClick={(e) => e.stopPropagation()}
          align="end"
          className="text-white hover:cursor-default flex flex-col gap-2 p-4 bg-ludoGrayLight"
        >
          <DeleteDialog
            onClick={() => deleteItem()}
            canDelete
            targetName={targetName}
          >
            <FileWrapper isSelected={false}>
              <FileInfoRow fileName={"Delete"}>
                <HeroIcon iconName="TrashIcon" className="h-4 text-white" />
              </FileInfoRow>
            </FileWrapper>
          </DeleteDialog>
          <RenameDialog
            itemCategory={itemType}
            key={`rename-${targetId}`}
            itemName={targetName}
            onSubmit={renameItem}
          >
            <FileWrapper isSelected={false}>
              <FileInfoRow fileName={"Rename"}>
                <HeroIcon iconName="PencilIcon" className="h-4 text-white" />
              </FileInfoRow>
              <div></div>
            </FileWrapper>
          </RenameDialog>
        </PopoverContent>
      </Popover>
    </>
  );
}
