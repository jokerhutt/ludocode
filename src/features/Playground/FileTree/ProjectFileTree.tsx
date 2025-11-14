import type {
  ProjectFile,
  ProjectFileChoice,
} from "@/Hooks/Logic/Playground/useProject";
import { TreeFile } from "./TreeFile";
import { PlusIcon, XIcon } from "lucide-react";
import { useModal } from "@/Hooks/UI/useModal";
import { NewFilePopover } from "@/components/Molecules/Popover/NewFilePopover";

type ProjectFileTreeProps = {
  projects: ProjectFile[];
  current: number;
  changeFile: (index: number) => void;
  deleteFile: (path: string) => void;
};

export function ProjectFileTree({
  projects,
  current,
  deleteFile,
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
            deleteFile={deleteFile}
            isSelected={current == index}
          />
        ))}
      </div>
    </>
  );
}
