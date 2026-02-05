import { useProjectContext } from "@/features/Project/Context/ProjectContext.tsx";
import {
  FileWrapper,
  FileInfoRow,
} from "@ludocode/design-system/primitives/file.tsx";
import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import { FileActionsButton } from "@/features/Project/FileTree/file-actions-button.tsx";

type TreeFileProps = {
  fileName: string;
  icon: IconName;
  id: string;
  index: number;
  isSelected: boolean;
  onClick: () => void;
};

export function TreeFile({
  fileName,
  icon,
  id,
  isSelected,
  onClick,
}: TreeFileProps) {

  const { renameFile, deleteFile } = useProjectContext();

  return (
    <FileWrapper isSelected={isSelected} onClick={() => onClick()}>
      <FileInfoRow fileName={fileName}>
        <CustomIcon color="white" className="h-4" iconName={icon} />
      </FileInfoRow>
      <FileActionsButton
        itemType={"File"}
        renameItem={renameFile}
        deleteItem={deleteFile}
        targetId={id}
        fileName={fileName}
      />
    </FileWrapper>
  );
}
