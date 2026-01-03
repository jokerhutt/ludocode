import { HeroIcon } from "@ludocode/design-system/primitives/hero-icon.tsx";
import { FileActionsPopover } from "./file-actions-popover.tsx";

type FileActionsButtonProps = {
  fileName: string;
  targetId: string;
  variant?: "main" | "secondary";
  size?: "lg" | "default";
  itemType: string;
  renameItem: (oldName: string, newName: string) => void;
  deleteItem: (name: string) => void;
};

export function FileActionsButton({
  itemType,
  fileName,
  targetId,
  variant = "main",
  size = "default",
  renameItem,
  deleteItem,
}: FileActionsButtonProps) {
  const style = {
    main: "p-1 rounded-full hover:cursor-pointer hover:bg-ludoLightPurple/80",
    secondary: "hover:cursor-pointer hover:text-ludoLightPurple",
  };

  const sizeStyle = size == "lg" ? "h-6" : "h-4";

  return (
    <FileActionsPopover
      itemType={itemType}
      renameItem={renameItem}
      deleteItem={() => deleteItem(fileName)}
      targetId={targetId}
      targetName={fileName}
    >
      <div
        role="button"
        onClick={(e) => e.stopPropagation()}
        className={style[variant]}
      >
        <HeroIcon className={sizeStyle} iconName="EllipsisVerticalIcon" />
      </div>
    </FileActionsPopover>
  );
}
