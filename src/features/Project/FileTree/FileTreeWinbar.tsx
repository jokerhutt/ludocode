import { NewFilePopover } from "@/components/Molecules/Popover/NewFilePopover";
import { ProjectWinbar } from "../ProjectWinbar";
import { PlusIcon } from "lucide-react";
import type { ProjectFileChoice } from "@/Hooks/Logic/Playground/useProject";
import type { LanguageType } from "@/Types/Playground/LanguageType";

type FileTreeWinbarProps = {addFileChoices: ProjectFileChoice[], addFile: (lang: LanguageType, base?: string) => void};

export function FileTreeWinbar({addFileChoices, addFile}: FileTreeWinbarProps) {
  return (
    <ProjectWinbar>
      <div className="flex h-full text-white justify-between items-center">
        <p>Files</p>

        <NewFilePopover content={addFileChoices} addFile={addFile}>
          <div className="p-0.5 hover:cursor-pointer hover:bg-ludoLightPurple/80 rounded-full">
            <PlusIcon className="h-4 w-4" />
          </div>
        </NewFilePopover>
      </div>
    </ProjectWinbar>
  );
}
