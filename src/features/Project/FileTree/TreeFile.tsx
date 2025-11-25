import { CustomIcon } from "@/components/Atoms/Icons/CustomIcon.tsx";
import { FileWrapper } from "../../../components/Molecules/File/FileWrapper.tsx";
import { FileInfoRow } from "@/components/Molecules/File/FileInfoRow.tsx";
import { FileActionsButton } from "@/components/Molecules/Popover/FileActionsButton.tsx";
import {
  LANGUAGE_MAP,
  type LanguageType,
} from "@/Types/Playground/LanguageType.ts";
import { useProjectContext } from "../ProjectContext.tsx";

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

  const {renameFile, deleteFile} = useProjectContext()

  return (
    <FileWrapper isSelected={isSelected} onClick={() => onClick()}>
      <FileInfoRow fileName={fileName}>
        <CustomIcon color="white" className="h-4" iconName={iconName} />
      </FileInfoRow>
      <FileActionsButton renameItem={renameFile} deleteItem={deleteFile} targetId={id} fileName={fileName} />
    </FileWrapper>
  );
}
