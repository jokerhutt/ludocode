import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FileWrapper } from "@/features/Playground/FileTree/FileWrapper";
import { TreeFile } from "@/features/Playground/FileTree/TreeFile";
import type { ProjectFileChoice } from "@/Hooks/Logic/Playground/useProject";
import type { LanguageType } from "@/Types/Playground/LanguageType";
import type { ReactNode } from "react";
import { FileInfoRow } from "./FileInfoRow";
import { CustomIcon } from "@/components/Atoms/Icons/CustomIcon";

type NewFilePopoverProps = {
  children: ReactNode;
  content: ProjectFileChoice[];
  addFile: (lang: LanguageType, base: string) => void;
};

export function NewFilePopover({
  children,
  content,
  addFile,
}: NewFilePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="text-white bg-ludoGrayLight">
        {content.map((choice, index) => (
          <FileWrapper
            isSelected={false}
            onClick={() => addFile(choice.lang, choice.base)}
          >
            <FileInfoRow deleteFile={() => () => null} fileName={choice.name}>
              <CustomIcon color="white" className="h-4" iconName="Python" />
            </FileInfoRow>
          </FileWrapper>
        ))}
      </PopoverContent>
    </Popover>
  );
}
