import { CustomIcon, PythonIcon } from "@/components/Atoms/Icons/CustomIcon";
import { HeroIcon } from "@/components/Atoms/Icons/HeroIcon";
import { FileActionsPopover } from "@/components/Molecules/Popover/FileActionsPopover";
import { stripFileName } from "@/Hooks/Logic/Playground/playgroundFileUtils";
import { FileWrapper } from "./FileWrapper";
import { FileInfoRow } from "@/components/Molecules/Popover/FileInfoRow";

type TreeFileProps = {
  fileName: string;
  fileType: "Python";
  index: number;
  isSelected: boolean;
  deleteFile: (path: string) => void;
  onClick: () => void;
};

export function TreeFile({
  fileName,
  fileType,
  index,
  deleteFile,
  isSelected,
  onClick,
}: TreeFileProps) {
  return (
    <FileWrapper isSelected={isSelected} onClick={() => onClick()}>
      <FileInfoRow deleteFile={deleteFile} includeOptions={true} fileName={fileName}>
        <CustomIcon color="white" className="h-4" iconName="Python"/>
      </FileInfoRow>
    </FileWrapper>
  );
}
