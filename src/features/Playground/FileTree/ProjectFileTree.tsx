import type { ProjectFile } from "@/Hooks/Logic/Playground/useProject";
import { TreeFile } from "./TreeFile";
import { PlusIcon, XIcon } from "lucide-react";
import { useModal } from "@/Hooks/UI/useModal";
import { LudoPopover } from "@/components/Molecules/Popover/LudoPopover";

type ProjectFileTreeProps = {
  projects: ProjectFile[];
  current: number;
  changeFile: (index: number) => void;
};

export function ProjectFileTree({
  projects,
  current,
  changeFile,
}: ProjectFileTreeProps) {

  return (
    <>
      <div className="flex bg-ludoGrayDark gap-2 text-white flex-col w-full">
        <div className="flex mb-2 justify-between items-center">
          <p>Files</p>

          <LudoPopover>
            <div className="p-0.5 hover:cursor-pointer hover:bg-ludoLightPurple/80 rounded-full">
              <PlusIcon className="h-4 w-4" />
            </div>
          </LudoPopover>
        </div>
        {projects.map((project, index) => (
          <TreeFile
            key={project.path}
            onClick={() => changeFile(index)}
            fileName={project.path}
            fileType="Python"
            index={index}
            isSelected={current == index}
          />
        ))}
      </div>
    </>
  );
}
