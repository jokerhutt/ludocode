import type { OptionSnap } from "@ludocode/types/Builder/BuilderSnapshotTypes";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { SortableOption } from "@/features/Builder/Components/Drag/SortableOption.tsx";
import type { ColumnType } from "@/features/Builder/Hooks/useOptionsDragAndDrop.tsx";
import { Button } from "@ludocode/external/ui/button";
import type { FormEditMode } from "@/features/Builder/Components/Drag/ExerciseOptionsDnDContainer.tsx";
import { newOptionSnap } from "@/features/Builder/Util/NewExerciseTemplates.ts";

type OptionsColumnProps = {
  items?: OptionSnap[];
  columnType: ColumnType;
  editMode: FormEditMode;
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
  editMode,
  onEdit,
  addValue,
  removeValue,
}: OptionsColumnProps) {
  const isArrange = editMode === "Arrange";
  const title = columnType === "correct" ? "Correct Answers" : "Distractors";

  const { setNodeRef, isOver } = useDroppable({
    id: columnType,
    data: { column: columnType },
    disabled: !isArrange,
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-6 border-2 border-dashed rounded-lg min-h-64 transition-all
        ${
          isArrange && isOver
            ? "border-ludo-accent-muted bg-ludo-accent-muted/20"
            : "border-ludo-accent-muted"
        }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-white">{title}</h3>

          {editMode !== "Lock" && (
            <Button
              type="button"
              onClick={() =>
                addValue({
                  item: newOptionSnap(columnType, items.length),
                  type: columnType,
                })
              }
              className="h-6"
            >
              Add
            </Button>
          )}
        </div>

        <span className="text-xs text-ludoAltText">Mode: {editMode}</span>
      </div>

      <SortableContext
        items={items.map((i) => i.exerciseOptionId)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {items.map((item, index) => (
            <SortableOption
              key={item.exerciseOptionId}
              id={item.exerciseOptionId}
              item={item}
              columnType={columnType}
              editMode={editMode}
              onEdit={onEdit}
              removeValue={() => removeValue(index, columnType)}
            />
          ))}
        </div>
      </SortableContext>

      {items.length === 0 && (
        <div className="text-center text-gray-500 py-8 text-sm">
          {isArrange ? `Drop ${columnType} options here` : "No options yet."}
        </div>
      )}
    </div>
  );
}
