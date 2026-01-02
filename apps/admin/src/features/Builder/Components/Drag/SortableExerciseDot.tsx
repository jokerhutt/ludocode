import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableExerciseDotProps = {
  id: string;
  isSelected: boolean;
  isLocked: boolean;
  hasError: boolean;
  onSelect: (id: string) => void;
};

export const SortableExerciseDot = ({
  id,
  isSelected,
  hasError,
  isLocked,
  onSelect,
}: SortableExerciseDotProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: isLocked });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    cursor: isLocked ? "pointer" : "grab",
  } as React.CSSProperties;

  const handleClick = () => {
    if (isLocked) {
      onSelect(id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      {...(!isLocked ? listeners : {})}
      {...attributes}
      className={`h-6 w-6 rounded-full ${
        isSelected ? "bg-ludoLightPurple" : "bg-ludoGrayDark"
      } ${hasError ? "border border-red-400" : "border-ludoGrayDark"}`}
    />
  );
};
