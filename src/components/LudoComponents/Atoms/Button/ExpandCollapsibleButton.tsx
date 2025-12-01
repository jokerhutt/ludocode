import { ChevronRightIcon } from "lucide-react";

type ExpandCollapsibleButtonProps = {
  onClick?: () => void;
  isExpanded: boolean;
};

export function ExpandCollapsibleButton({
  onClick,
  isExpanded,
}: ExpandCollapsibleButtonProps) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className="flex h-6 w-6 items-center hover:cursor-pointer justify-center rounded hover:bg-ludoGrayLight/60"
    >
      <ChevronRightIcon
        className={`h-4 w-4 text-white hover:cursor-pointer transition-transform ${
          isExpanded ? "rotate-90" : "rotate-0"
        }`}
      />
    </button>
  );
}
