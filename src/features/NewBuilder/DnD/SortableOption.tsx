import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ColumnType } from "@/Hooks/Logic/DnD/useOptionsDragAndDrop";
import type { OptionSnap } from "@/Types/Snapshot/SnapshotTypes";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableOptionProps = {
  id: string;
  item: OptionSnap;
  columnType: ColumnType;
  isLocked: boolean;
  onEdit?: (id: string, column: ColumnType, value: string) => void;
  removeValue: () => void;
};

export function SortableOption({
  id,
  item,
  columnType,
  isLocked,
  removeValue,
  onEdit,
}: SortableOptionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: { item, columnType },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      {...(!isLocked ? { ...attributes, ...listeners } : {})}
      className={` border-ludoLightPurple border rounded-md shadow select-none
        ${isLocked ? " cursor-text" : "p-2 cursor-grab active:cursor-grabbing"}`}
    >
      {isLocked ? (
        <div className="flex items-center gap-2">
          <Textarea
            className="w-full min-h-8 bg-transparent border-b border-gray-300 text-white focus:outline-none"
            value={item.content}
            onChange={(e) => onEdit?.(id, columnType, e.target.value)}
          />
          {item.content.length < 1 && (
            <Button onClick={() => removeValue()}>Delete?</Button>
          )}
        </div>
      ) : (
        <div className="text-white text-sm">{item.content}</div>
      )}
    </div>
  );
}
