import {
  LANGUAGE_MAP,
  type LanguageType,
} from "../../../../../../packages/types/Project/LanguageType.ts";
import { useProjectContext } from "@/features/Project/Context/ProjectContext.tsx";
import {
  FileWrapper,
  FileInfoRow,
} from "@ludocode/design-system/primitives/file.tsx";
import { CustomIcon } from "../../../../../../packages/design-system/primitives/custom-icon.tsx";
import { FileActionsButton } from "@/features/Project/FileTree/file-actions-button.tsx";

type TreeFileProps = {
  fileName: string;
  language: LanguageType;
  id: string;
  index: number;
  isSelected: boolean;
  onClick: () => void;
};

export function TreeFile({
  fileName,
  language,
  id,
  isSelected,
  onClick,
}: TreeFileProps) {
  const { iconName } = LANGUAGE_MAP[language];

  const { renameFile, deleteFile } = useProjectContext();

  return (
    <FileWrapper isSelected={isSelected} onClick={() => onClick()}>
      <FileInfoRow fileName={fileName}>
        <CustomIcon color="white" className="h-4" iconName={iconName} />
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
