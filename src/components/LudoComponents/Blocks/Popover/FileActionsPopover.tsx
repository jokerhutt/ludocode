
import type { ReactNode } from "react";
import { FileInfoRow } from "../File/FileInfoRow.tsx";
import { RenameDialog } from "../Dialog/Edit/RenameDialog.tsx";
import { DeleteDialog } from "../Dialog/Warning/DeleteDialog.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { DialogTrigger } from "@/components/ui/dialog.tsx";
import { FileWrapper } from "../File/FileWrapper.tsx";
import { HeroIcon } from "../../Atoms/Icons/HeroIcon.tsx";

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
