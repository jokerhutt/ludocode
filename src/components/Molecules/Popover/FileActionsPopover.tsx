import { FileWrapper } from "@/components/Molecules/File/FileWrapper.tsx";
import { TreeFile } from "@/features/Project/FileTree/TreeFile.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import type { ReactNode } from "react";
import { FileInfoRow } from "../File/FileInfoRow.tsx";
import { HeroIcon } from "@/components/Atoms/Icons/HeroIcon";
import { RenameDialog } from "../Dialog/RenameDialog";
import { useModal } from "@/Hooks/UI/useModal";
import { DeleteDialog } from "../Dialog/DeleteDialog";

type FileActionsPopoverProps = {
  children: ReactNode;
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
  deleteItem,
}: FileActionsPopoverProps) {
  const {
    modalOpen: renameOpen,
    openModal: openRename,
    closeModal: closeRename,
  } = useModal();

  const {
    modalOpen: deleteOpen,
    openModal: openDelete,
    closeModal: closeDelete,
  } = useModal();

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          onClick={(e) => e.stopPropagation()}
          align="end"
          className="text-white hover:cursor-default flex flex-col gap-2 p-4 bg-ludoGrayLight"
        >
          <FileWrapper isSelected={false} onClick={() => openDelete()}>
            <FileInfoRow fileName={"Delete"}>
              <HeroIcon iconName="TrashIcon" className="h-4 text-white" />
            </FileInfoRow>
          </FileWrapper>
          <FileWrapper onClick={() => openRename()} isSelected={false}>
            <FileInfoRow fileName={"Rename"}>
              <HeroIcon iconName="PencilIcon" className="h-4 text-white" />
            </FileInfoRow>
            <div></div>
          </FileWrapper>
        </PopoverContent>
      </Popover>
      <DeleteDialog
        key={`delete-${targetId}`}
        targetName={targetName}
        open={deleteOpen}
        close={closeDelete}
        onClick={deleteItem}
      />
      <RenameDialog
        key={`rename-${targetId}`}
        open={renameOpen}
        close={closeRename}
        itemName={targetName}
        onSubmit={renameItem}
      />
    </>
  );
}
