import { Trash2 } from "lucide-react";
import { cn } from "../cn-utils";

type LudoTrashIconProps = {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: number;
};

export function LudoTrashIcon({
  onClick,
  className,
  disabled,
  size = 16,
}: LudoTrashIconProps) {
  const pointerStyle = disabled ? "hover:cursor-not-allowed" : "cursor-pointer";
  const colorStyle = disabled
    ? "text-red-400/40"
    : "text-ludo-danger hover:text-red-300";

  return (
    <button
      onClick={() => onClick?.()}
      type="button"
      className={cn(
        "transition-colors p-1 rounded-full  hover:bg-red-400/10",
        colorStyle,
        pointerStyle,
        className,
      )}
    >
      <Trash2 size={size} />
    </button>
  );
}
