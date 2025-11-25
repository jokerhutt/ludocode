import type { ProjectFile } from "@/Hooks/Logic/Playground/useProject.tsx";
import { TreeFile } from "./TreeFile.tsx";

type ProjectFileTreeProps = {
  files: ProjectFile[];
  current: number;
  changeFile: (index: number) => void;
  renameFile: (oldPath: string, newPath: string) => void;
  deleteFile: (path: string) => void;
};

export function ProjectFileTree({
  files,
  renameFile,
  current,
  deleteFile,
  changeFile,
}: ProjectFileTreeProps) {
  return (
    <>
      <div className="flex px-4 py-3 overflow-y-auto min-h-0 h-full bg-ludoGrayDark gap-2 text-white flex-col w-full">
        {files.map((file, index) => (
          <TreeFile
            renameFile={renameFile}
            key={file.path}
            onClick={() => changeFile(index)}
            fileName={file.path}
            language={file.language}
            index={index}
            deleteFile={deleteFile}
            isSelected={current == index}
          />
        ))}
      </div>
    </>
  );
}
