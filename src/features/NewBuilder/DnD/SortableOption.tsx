import type { ColumnType } from "@/Hooks/Logic/DnD/useOptionsDragAndDrop";
import type { OptionSnap } from "@/Types/Snapshot/SnapshotTypes";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
export function SortableOption({
  id,
  item,
  columnType,
}: {
  id: string;
  item: OptionSnap;
  columnType: ColumnType;
}) {
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
      {...attributes}
      {...listeners}
      className="p-4 bg-white rounded shadow cursor-grab active:cursor-grabbing select-none"
    >
      {item.content}
    </div>
  );
}
