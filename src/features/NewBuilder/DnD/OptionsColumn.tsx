import type { OptionSnap } from "@/Types/Snapshot/SnapshotTypes";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { SortableOption } from "./SortableOption";
import type { ColumnType } from "@/Hooks/Logic/DnD/useOptionsDragAndDrop";
type OptionsColumnProps = {
  items: OptionSnap[];
  columnType: ColumnType;
};

export function OptionsColumn({ items, columnType }: OptionsColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: columnType,
    data: { column: columnType },
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-6 border-2 border-dashed rounded-lg min-h-64 transition-all
        ${
          isOver
            ? "border-ludoLightPurple bg-ludoLightPurple/20"
            : "border-transparent"
        }`}
    >
      <h3 className="font-semibold text-white mb-4">
        {columnType === "correct" ? "Correct Answers" : "Distractors"}
      </h3>

      <SortableContext
        items={items.map((i) => i.exerciseOptionId)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {items.map((item) => (
            <SortableOption
              key={item.exerciseOptionId}
              id={item.exerciseOptionId}
              item={item}
              columnType={columnType}
            />
          ))}
        </div>
      </SortableContext>

      {items.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Drop {columnType} options here
        </div>
      )}
    </div>
  );
}
