import type { OptionSnap } from "@/Types/Snapshot/SnapshotTypes";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { SortableOption } from "./SortableOption";
import type { ColumnType } from "@/Hooks/Logic/DnD/useOptionsDragAndDrop";
import { Button } from "@/components/ui/button";

type OptionsColumnProps = {
  items?: OptionSnap[];
  columnType: ColumnType;
  isLocked: boolean;
  onEdit?: (id: string, column: ColumnType, value: string) => void;
  removeValue: (index: number, type: "correct" | "distractor") => void;
  addValue: (payload: {
    item: OptionSnap;
    type: "correct" | "distractor";
  }) => void;
};

export function OptionsColumn({
  items = [],
  columnType,
  isLocked,
  onEdit,
  addValue,
  removeValue,
}: OptionsColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: columnType,
    data: { column: columnType },
    disabled: isLocked,
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-6 border-2 border-dashed rounded-lg min-h-64 transition-all
        ${
          !isLocked && isOver
            ? "border-ludoLightPurple bg-ludoLightPurple/20"
            : "border-transparent"
        }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-white">
            {columnType === "correct" ? "Correct Answers" : "Distractors"}
          </h3>
          <Button
            onClick={() =>
              addValue({
                item: {
                  content: "Replace me",
                  exerciseOptionId: crypto.randomUUID(),
                  answerOrder: columnType == "correct" ? items.length : null,
                },
                type: columnType,
              })
            }
            className="h-6 hover:cursor-pointer"
          >
            Add
          </Button>
        </div>

        <span className="text-xs text-gray-400">
          {isLocked ? "Edit mode" : "Reorder mode"}
        </span>
      </div>

      <SortableContext
        items={items.map((i) => i.exerciseOptionId)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {items.map((item, index) => (
            <SortableOption
              removeValue={() => removeValue(index, columnType)}
              onEdit={onEdit}
              key={item.exerciseOptionId}
              id={item.exerciseOptionId}
              item={item}
              columnType={columnType}
              isLocked={isLocked}
            />
          ))}
        </div>
      </SortableContext>

      {items.length === 0 && (
        <div className="text-center text-gray-500 py-8 text-sm">
          {isLocked ? "No options yet." : `Drop ${columnType} options here`}
        </div>
      )}
    </div>
  );
}
