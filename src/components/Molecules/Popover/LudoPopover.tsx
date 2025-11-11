import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TreeFile } from "@/features/Playground/FileTree/TreeFile";
import type { ReactNode } from "react";

type LudoPopoverProps = {
  children: ReactNode;
};

export function LudoPopover({ children }: LudoPopoverProps) {
  const languageChoices = [{ name: "Python" }];

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="text-white bg-ludoGrayLight">
        {languageChoices.map((choice, index) => (
          <TreeFile
            fileName={choice.name}
            fileType="Python"
            index={index}
            isSelected={false}
            onClick={() => () => null}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}
