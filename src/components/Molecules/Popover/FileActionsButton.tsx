import { FileWrapper } from "@/features/Playground/FileTree/FileWrapper";
import { FileActionsPopover } from "./FileActionsPopover";
import { HeroIcon } from "@/components/Atoms/Icons/HeroIcon";

type FileActionsButtonProps = {
  fileName: string;
  deleteFile: (path: string) => void;
};

export function FileActionsButton({ fileName, deleteFile }: FileActionsButtonProps) {
  return (
    <FileActionsPopover
      renameFile={() => () => null}
      deleteFile={() => deleteFile(fileName)}
      fileId={fileName}
    >
      <div className="p-1 rounded-full hover:cursor-pointer hover:bg-ludoLightPurple/80">
        <HeroIcon className="h-4" iconName="EllipsisVerticalIcon" />
      </div>
    </FileActionsPopover>
  );
}
