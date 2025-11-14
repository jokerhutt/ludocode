import { CustomIcon, type IconName } from "@/components/Atoms/Icons/CustomIcon";
import { FileWrapper } from "@/features/Playground/FileTree/FileWrapper";
import { FileActionsPopover } from "./FileActionsPopover";
import { HeroIcon } from "@/components/Atoms/Icons/HeroIcon";
import { FileActionsButton } from "./FileActionsButton";
import { stripFileName } from "@/Hooks/Logic/Playground/playgroundFileUtils";
import type { ReactNode } from "react";

type FileInfoRowProps = {
  fileName: string;
  children: ReactNode;
  deleteFile: (path: string) => void;
  includeOptions?: boolean;
};

//TODO move this stuff into a tree context

export function FileInfoRow({
  fileName,
  children,
  includeOptions,
  deleteFile
}: FileInfoRowProps) {
  return (
    <>
      <div className="flex gap-4 items-center">
        {children}
        <p className="text-sm">{fileName}</p>
      </div>
      {includeOptions ? <FileActionsButton deleteFile={deleteFile} fileName={fileName} /> : <div></div>}
    </>
  );
}
