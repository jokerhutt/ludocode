import { TreeFile } from "@/features/Project/FileTree/TreeFile.tsx";
import { useProjectContext } from "@/features/Project/Context/ProjectContext.tsx";

export function ProjectFileTree() {
  const { files, current, setCurrent } = useProjectContext();

  console.log(
    "files ids",
    files.map((f) => f.id)
  );
  console.log(
    "files keys",
    files.map((f) => f.id ?? f.tempId)
  );

  return (
    <div className="flex px-4 py-3 overflow-y-auto min-h-0 h-full bg-ludoGrayDark gap-2 text-white flex-col w-full">
      {files.map((file, index) => {
        const key = file.id ?? file.tempId!;
        return (
          <TreeFile
            key={key}
            id={key}
            onClick={() => setCurrent(index)}
            fileName={file.path}
            language={file.language}
            index={index}
            isSelected={current == index}
          />
        );
      })}
    </div>
  );
}
