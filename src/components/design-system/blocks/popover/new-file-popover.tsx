import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/external/ui/popover";
import {
  LANGUAGE_MAP,
} from "@/types/Project/LanguageType";
import type { ReactNode } from "react";
import { FileInfoRow } from "@/components/design-system/blocks/file/file-info-row.tsx";
import { useProjectContext } from "@/hooks/Context/Project/ProjectContext.tsx";
import { FileWrapper } from "@/components/design-system/blocks/file/file-wrapper.tsx";
import { CustomIcon } from "@/components/design-system/atoms/hero-icon/custom-icon.tsx";

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
