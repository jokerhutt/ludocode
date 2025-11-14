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
  fileId: string;
  renameFile: () => void;
  deleteFile: () => void;
};

export function FileActionsPopover({
  children,
  fileId,
  renameFile,
  deleteFile,
}: FileActionsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="end" className="text-white hover:cursor-default flex flex-col gap-2 p-4 bg-ludoGrayLight">
        <FileWrapper isSelected={false} onClick={() => deleteFile()}>
          <FileInfoRow deleteFile={deleteFile} fileName={"Delete"}>
            <HeroIcon iconName="TrashIcon" className="h-4 text-white" />
          </FileInfoRow>
        </FileWrapper>
        <FileWrapper isSelected={false} onClick={() => renameFile()}>
          <FileInfoRow deleteFile={deleteFile} fileName={"Rename"}>
            <HeroIcon iconName="PencilIcon" className="h-4 text-white" />
          </FileInfoRow>
        </FileWrapper>
      </PopoverContent>
    </Popover>
  );
}
