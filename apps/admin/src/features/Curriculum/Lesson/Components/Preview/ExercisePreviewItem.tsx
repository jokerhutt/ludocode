import { cn } from "@ludocode/design-system/cn-utils";

type ExercisePreviewItemProps = {
  title: string;
  isSelected: boolean;
  onClick: () => void;
};

export function ExercisePreviewItem({
  title,
  isSelected,
  onClick,
}: ExercisePreviewItemProps) {
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
