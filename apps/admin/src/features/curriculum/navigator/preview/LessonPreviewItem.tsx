import { cn } from "@ludocode/design-system/cn-utils.ts";
import { ExternalLink } from "lucide-react";

type LessonPreviewItemProps = {
  title: string;
  onClick: () => void;
  onNavigate?: () => void;
  isSelected: boolean;
};

export function LessonPreviewItem({
  title,
  onClick,
  onNavigate,
  isSelected,
}: LessonPreviewItemProps) {
  return (
    <div
      onClick={onClick}
      onDoubleClick={onNavigate}
      className={cn(
        "bg-ludo-background hover:cursor-pointer h-10 text-ludo-white px-4 py-2 w-full rounded-sm flex items-center justify-between",
        isSelected && "border-2 border-ludo-accent",
      )}
    >
      <p className="text-sm">{title}</p>
      {isSelected && onNavigate && (
        <ExternalLink
          className="h-4 w-4 text-ludo-accent hover:text-ludo-white-bright shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate();
          }}
        />
      )}
    </div>
  );
}
