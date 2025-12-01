import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LANGUAGE_MAP,
  type LanguageType,
} from "@/Types/Playground/LanguageType";
import type { ReactNode } from "react";
import { FileInfoRow } from "../File/FileInfoRow.tsx";
import { useProjectContext } from "@/Hooks/Context/Project/ProjectContext.tsx";
import { FileWrapper } from "../File/FileWrapper.tsx";
import { CustomIcon } from "../../Atoms/Icons/CustomIcon.tsx";

type NewFilePopoverProps = {
  children: ReactNode;
};

export function NewFilePopover({ children }: NewFilePopoverProps) {
  const { project, addFile } = useProjectContext();

  const { fileTemplate: choice, iconName } =
    LANGUAGE_MAP[project.projectLanguage];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>{children}</div>
      </PopoverTrigger>
      <PopoverContent className="text-white bg-ludoGrayLight">
        <FileWrapper isSelected={false} onClick={() => addFile()}>
          <FileInfoRow fileName={choice.name}>
            <CustomIcon color="white" className="h-4" iconName={iconName} />
          </FileInfoRow>
        </FileWrapper>
      </PopoverContent>
    </Popover>
  );
}
