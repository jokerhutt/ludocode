import { FileWrapper } from "@/features/Playground/FileTree/FileWrapper";
import { TreeFile } from "@/features/Playground/FileTree/TreeFile";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import type { ReactNode } from "react";
import { FileInfoRow } from "./FileInfoRow";
import { HeroIcon } from "@/components/Atoms/Icons/HeroIcon";

type FileActionsPopoverProps = {
  children: ReactNode;
  targetId: string;
  renameItem: () => void;
  deleteItem: () => void;
};

export function FileActionsPopover({
  children,
  targetId,
  renameItem,
  deleteItem,
}: FileActionsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        onClick={(e) => e.stopPropagation()}
        align="end"
        className="text-white hover:cursor-default flex flex-col gap-2 p-4 bg-ludoGrayLight"
      >
        <FileWrapper isSelected={false} onClick={() => deleteItem()}>
          <FileInfoRow deleteFile={deleteItem} fileName={"Delete"}>
            <HeroIcon iconName="TrashIcon" className="h-4 text-white" />
          </FileInfoRow>
        </FileWrapper>
        <FileWrapper isSelected={false} onClick={() => renameItem()}>
          <FileInfoRow deleteFile={renameItem} fileName={"Rename"}>
            <HeroIcon iconName="PencilIcon" className="h-4 text-white" />
          </FileInfoRow>
        </FileWrapper>
      </PopoverContent>
    </Popover>
  );
}
