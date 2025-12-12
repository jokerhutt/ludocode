
import {
  LANGUAGE_MAP,
  type LanguageType,
} from "@/types/Project/LanguageType.ts";
import { useProjectContext } from "@/features/Project/Context/ProjectContext.tsx";
import { FileWrapper } from "@/components/design-system/blocks/file/file-wrapper.tsx";
import { FileInfoRow } from "@/components/design-system/blocks/file/file-info-row.tsx";
import { CustomIcon } from "@/components/design-system/atoms/hero-icon/custom-icon.tsx";
import { FileActionsButton } from "@/components/design-system/blocks/popover/file-actions-button.tsx";

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
