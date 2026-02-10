import { cn } from "@ludocode/design-system/cn-utils";

type LessonPreviewItemProps = {
  title: string;
  onClick: () => void;
  isSelected: boolean;
};

export function LessonPreviewItem({
  title,
  onClick,
  isSelected,
}: LessonPreviewItemProps) {
  const borderStyle = isSelected ? "border-2 border-ludo-accent" : "";

  return (
    <div
      onClick={() => onClick()}
      className={cn(
        "bg-ludo-background hover:cursor-pointer h-10 text-ludoAltText px-4 py-2  w-full rounded-sm",
        borderStyle,
      )}
    >
      <p className="text-sm">{title}</p>
    </div>
  );
}
