import type { ProjectFile, ProjectFileChoice } from "@/Hooks/Logic/Playground/useProject";
import { TreeFile } from "./TreeFile";
import { PlusIcon, XIcon } from "lucide-react";
import { useModal } from "@/Hooks/UI/useModal";
import { LudoPopover } from "@/components/Molecules/Popover/LudoPopover";
import type { Lang } from "@/Hooks/Logic/Playground/playgroundFileUtils";

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
      <div className="flex px-6 py-6 bg-ludoGrayDark gap-2 text-white flex-col w-full">
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
