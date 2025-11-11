import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TreeFile } from "@/features/Playground/FileTree/TreeFile";
import type { Lang } from "@/Hooks/Logic/Playground/playgroundFileUtils";
import type { ProjectFileChoice } from "@/Hooks/Logic/Playground/useProject";
import type { ReactNode } from "react";

type LudoPopoverProps = {
  children: ReactNode;
  content: ProjectFileChoice[];
  addFile: (lang: Lang, base: string) => void;
};

export function LudoPopover({ children, content, addFile }: LudoPopoverProps) {

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="text-white bg-ludoGrayLight">
        {content.map((choice, index) => (
          <TreeFile
            fileName={choice.name}
            fileType="Python"
            index={index}
            isSelected={false}
            onClick={() => addFile(choice.lang, choice.base)}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}
