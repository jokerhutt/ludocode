import { CustomIcon } from "@/components/Atoms/Icons/CustomIcon.tsx";
import { FileWrapper } from "../../../components/Molecules/File/FileWrapper.tsx";
import { FileInfoRow } from "@/components/Molecules/File/FileInfoRow.tsx";
import { FileActionsButton } from "@/components/Molecules/Popover/FileActionsButton.tsx";
import {
  LANGUAGE_MAP,
  type LanguageType,
} from "@/Types/Playground/LanguageType.ts";

type TreeFileProps = {
  fileName: string;
  language: LanguageType;
  id: string;
  index: number;
  isSelected: boolean;
  deleteFile: (path: string) => void;
  renameFile: (oldPath: string, newPath: string) => void;
  onClick: () => void;
};

export function TreeFile({
  fileName,
  language,
  renameFile,
  id,
  deleteFile,
  isSelected,
  onClick,
}: TreeFileProps) {
  const { iconName } = LANGUAGE_MAP[language];

  return (
    <FileWrapper isSelected={isSelected} onClick={() => onClick()}>
      <FileInfoRow fileName={fileName}>
        <CustomIcon color="white" className="h-4" iconName={iconName} />
      </FileInfoRow>
      <FileActionsButton
        targetId={id}
        fileName={fileName}
        deleteFile={deleteFile}
        renameFile={renameFile}
      />
    </FileWrapper>
  );
}
