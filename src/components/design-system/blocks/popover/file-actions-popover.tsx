
import type { ReactNode } from "react";
import { FileInfoRow } from "@/components/design-system/blocks/file/file-info-row.tsx";
import { RenameDialog } from "@/components/design-system/composites/dialog/rename-dialog.tsx";
import { DeleteDialog } from "@/components/design-system/composites/dialog/delete-dialog.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/external/ui/popover.tsx";
import { DialogTrigger } from "@/components/external/ui/dialog.tsx";
import { FileWrapper } from "@/components/design-system/blocks/file/file-wrapper.tsx";
import { HeroIcon } from "@/components/design-system/atoms/hero-icon/hero-icon.tsx";

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
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          onClick={(e) => e.stopPropagation()}
          align="end"
          className="text-white hover:cursor-default flex flex-col gap-2 p-4 bg-ludoGrayLight"
        >
          <FileWrapper isSelected={false}>
            <DeleteDialog
              onClick={deleteItem}
              canDelete
              targetName={targetName}
            >
              <FileInfoRow fileName={"Delete"}>
                <HeroIcon iconName="TrashIcon" className="h-4 text-white" />
              </FileInfoRow>
            </DeleteDialog>
          </FileWrapper>
          <RenameDialog
            itemCategory={itemType}
            key={`rename-${targetId}`}
            itemName={targetName}
            onSubmit={renameItem}
          >
            <DialogTrigger asChild>
              <FileWrapper isSelected={false}>
                <FileInfoRow fileName={"Rename"}>
                  <HeroIcon iconName="PencilIcon" className="h-4 text-white" />
                </FileInfoRow>
                <div></div>
              </FileWrapper>
            </DialogTrigger>
          </RenameDialog>
        </PopoverContent>
      </Popover>
    </>
  );
}
