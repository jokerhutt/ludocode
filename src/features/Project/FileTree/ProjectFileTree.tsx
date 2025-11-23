import type { ProjectFile } from "@/Hooks/Logic/Playground/useProject.tsx";
import { TreeFile } from "./TreeFile.tsx";

type ProjectFileTreeProps = {
  projects: ProjectFile[];
  current: number;
  changeFile: (index: number) => void;
  renameFile: (oldPath: string, newPath: string) => void;
  deleteFile: (path: string) => void;
};

//TODO make this a container to avoid prop drilling

export function ProjectFileTree({
  projects,
  renameFile,
  current,
  deleteFile,
  changeFile,
}: ProjectFileTreeProps) {
  return (
    <>
      <div className="flex px-4 py-6 bg-ludoGrayDark gap-2 text-white flex-col w-full">
        {projects.map((project, index) => (
          <TreeFile
            renameFile={renameFile}
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
