import { CustomIcon, PythonIcon } from "@/components/Atoms/Icons/CustomIcon";
import { stripFileName } from "@/Hooks/Logic/Playground/playgroundFileUtils";

type TreeFileProps = {
  fileName: string;
  fileType: "Python";
  index: number;
  isSelected: boolean;
  onClick: () => void;
};

export function TreeFile({
  fileName,
  fileType,
  index,
  isSelected,
  onClick,
}: TreeFileProps) {
  return (
    <div
      onClick={onClick}
      className={`flex gap-4 px-2 py-1 rounded-lg hover:cursor-pointer items-center ${
        isSelected ? "bg-ludoLightPurple/70" : "hover:bg-ludoLightPurple/50"
      }`}
    >
      <CustomIcon iconName="Python" color="white" className="h-4 w-4" />
      <p className="text-sm">{stripFileName(fileName)}</p>
    </div>
  );
}
