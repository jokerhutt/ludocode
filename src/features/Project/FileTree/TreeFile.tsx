
import {
  LANGUAGE_MAP,
  type LanguageType,
} from "@/Types/Playground/LanguageType.ts";
import { useProjectContext } from "../../../Hooks/Context/Project/ProjectContext.tsx";
import { FileWrapper } from "@/components/LudoComponents/Blocks/File/FileWrapper.tsx";
import { FileInfoRow } from "@/components/LudoComponents/Blocks/File/FileInfoRow.tsx";
import { CustomIcon } from "@/components/LudoComponents/Atoms/Icons/CustomIcon.tsx";
import { FileActionsButton } from "@/components/LudoComponents/Blocks/Popover/FileActionsButton.tsx";

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
