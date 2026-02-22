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

  const readOnly = !!project.deleteAt;
  const cursorStyle = readOnly
    ? "hover:cursor-not-allowed"
    : "hover:cursor-pointer";

  const iconName = project.projectLanguage.iconName as IconName;
  const choice = project.projectLanguage.name;

  const handleClick = () => {
    if (readOnly) return;
    addFile();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>{children}</div>
      </PopoverTrigger>
      <PopoverContent className="text-white bg-ludo-surface">
        <FileWrapper
          disabled={readOnly}
          isSelected={false}
          onClick={() => handleClick()}
        >
          <FileInfoRow className={cursorStyle} fileName={choice}>
            <CustomIcon color="white" className="h-4" iconName={iconName} />
          </FileInfoRow>
        </FileWrapper>
      </PopoverContent>
    </Popover>
  );
}
