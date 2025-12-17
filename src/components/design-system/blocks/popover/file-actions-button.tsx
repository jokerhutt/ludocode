import { HeroIcon } from "@/components/design-system/atoms/hero-icon/hero-icon.tsx";
import { FileActionsPopover } from "./file-actions-popover.tsx";

type FileActionsButtonProps = {
  fileName: string;
  targetId: string;
  variant?: "main" | "secondary";
  itemType: string;
  renameItem: (oldName: string, newName: string) => void;
  deleteItem: (name: string) => void;
};

export function FileActionsButton({
  itemType,
  fileName,
  targetId,
  variant = "main",
  renameItem,
  deleteItem,
}: FileActionsButtonProps) {
  const style = {
    main: "p-1 rounded-full hover:cursor-pointer hover:bg-ludoLightPurple/80",
    secondary: "hover:cursor-pointer hover:text-ludoLightPurple",
  };

  return (
    <FileActionsPopover
      itemType={itemType}
      renameItem={renameItem}
      deleteItem={() => deleteItem(fileName)}
      targetId={targetId}
      targetName={fileName}
    >
      <button onClick={(e) => e.stopPropagation()} className={style[variant]}>
        <HeroIcon className="h-4" iconName="EllipsisVerticalIcon" />
      </button>
    </FileActionsPopover>
  );
}
