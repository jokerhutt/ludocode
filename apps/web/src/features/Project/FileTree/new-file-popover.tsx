import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ludocode/external/ui/popover.tsx";
import type { ReactNode } from "react";
import { useProjectContext } from "@/features/Project/Context/ProjectContext.tsx";
import {
  FileWrapper,
  FileInfoRow,
} from "@ludocode/design-system/primitives/file.tsx";
import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";

type NewFilePopoverProps = {
  children: ReactNode;
};

export function NewFilePopover({ children }: NewFilePopoverProps) {
  const { project, addFile } = useProjectContext();

  const iconName = project.projectLanguage.iconName as IconName;
  const choice = project.projectLanguage.name;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>{children}</div>
      </PopoverTrigger>
      <PopoverContent className="text-white bg-ludo-surface">
        <FileWrapper isSelected={false} onClick={() => addFile()}>
          <FileInfoRow fileName={choice}>
            <CustomIcon color="white" className="h-4" iconName={iconName} />
          </FileInfoRow>
        </FileWrapper>
      </PopoverContent>
    </Popover>
  );
}
