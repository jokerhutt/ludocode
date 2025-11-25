import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FileWrapper } from "@/components/Molecules/File/FileWrapper.tsx";
import {
  LANGUAGE_MAP,
  type LanguageType,
} from "@/Types/Playground/LanguageType";
import type { ReactNode } from "react";
import { FileInfoRow } from "../File/FileInfoRow.tsx";
import { CustomIcon } from "@/components/Atoms/Icons/CustomIcon";

type NewFilePopoverProps = {
  children: ReactNode;
  addFile: (lang: LanguageType, base: string) => void;
  language: LanguageType;
};

export function NewFilePopover({
  children,
  addFile,
  language,
}: NewFilePopoverProps) {
  const { fileTemplate: choice, iconName } = LANGUAGE_MAP[language];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>{children}</div>
      </PopoverTrigger>
      <PopoverContent className="text-white bg-ludoGrayLight">
        <FileWrapper
          isSelected={false}
          onClick={() => addFile(choice.lang, choice.base)}
        >
          <FileInfoRow fileName={choice.name}>
            <CustomIcon color="white" className="h-4" iconName={iconName} />
          </FileInfoRow>
        </FileWrapper>
      </PopoverContent>
    </Popover>
  );
}
