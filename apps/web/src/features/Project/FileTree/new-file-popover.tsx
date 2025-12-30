import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../../../packages/external/ui/popover.tsx";
import { LANGUAGE_MAP } from "../../../../../../packages/types/Project/LanguageType.ts";
import type { ReactNode } from "react";
import { useProjectContext } from "@/features/Project/Context/ProjectContext.tsx";
import { FileWrapper } from "@/features/Builder/Components/File/file-wrapper.tsx";
import { FileInfoRow } from "@/features/Builder/Components/File/file-info-row.tsx";
import { CustomIcon } from "../../../../../../packages/design-system/primitives/custom-icon.tsx";

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
