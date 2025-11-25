import { NewFilePopover } from "@/components/Molecules/Popover/NewFilePopover";
import { ProjectWinbar } from "../ProjectWinbar";
import { CircleIconButton } from "@/components/Atoms/Button/CircleIconButton";
import type { LanguageType } from "@/Types/Playground/LanguageType";

type FileTreeWinbarProps = {
  addFile: () => void;
  language: LanguageType;
};

export function FileTreeWinbar({ addFile, language }: FileTreeWinbarProps) {
  return (
    <ProjectWinbar>
      <div className="flex h-full text-white justify-between items-center">
        <p>Files</p>
        <NewFilePopover language={language} addFile={addFile}>
          <CircleIconButton iconName="PlusIcon" />
        </NewFilePopover>
      </div>
    </ProjectWinbar>
  );
}
