import { Button } from "@ludocode/external/ui/button";
import { Textarea } from "@ludocode/external/ui/textarea";
import type { ColumnType } from "@/features/Builder/Hooks/useOptionsDragAndDrop.tsx";
import type { OptionSnap } from "@ludocode/types/Builder/BuilderSnapshotTypes";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { FormEditMode } from "@/features/Builder/Components/Drag/ExerciseOptionsDnDContainer.tsx";
import { useState, useEffect } from "react";

type SortableOptionProps = {
  id: string;
  item: OptionSnap;
  columnType: ColumnType;
  editMode: FormEditMode;
  onEdit?: (id: string, column: ColumnType, value: string) => void;
  removeValue: () => void;
};

export function SortableOption({
  id,
  item,
  columnType,
  editMode,
  removeValue,
  onEdit,
}: SortableOptionProps) {
  const isArrange = editMode === "Arrange";
  const isRename = editMode === "Rename";
  const isDelete = editMode === "Delete";
  const isLock = editMode === "Lock";

  const [localValue, setLocalValue] = useState(item.content);

  useEffect(() => {
    setLocalValue(item.content);
  }, [item.content]);

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
    disabled: !isArrange,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      {...(isArrange ? { ...attributes, ...listeners } : {})}
      className={`
        border-ludo-accent-muted border rounded-md shadow select-none
        ${
          isArrange
            ? "p-2 cursor-grab active:cursor-grabbing"
            : "p-2 cursor-default"
        }
      `}
    >
      {isRename && (
        <div className="flex items-center gap-2">
          <Textarea
            className="w-full min-h-8 bg-transparent border-b border-gray-300 text-white focus:outline-none"
            value={localValue}
            onChange={(e) => {
              setLocalValue(e.target.value);
              onEdit?.(id, columnType, e.target.value);
            }}
            onBlur={() => {
              onEdit?.(id, columnType, localValue);
            }}
          />
        </div>
      )}

      {isDelete && (
        <div className="flex items-center justify-between gap-2 text-white text-sm">
          <span>{localValue}</span>
          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={removeValue}
          >
            Delete
          </Button>
        </div>
      )}

      {(isArrange || isLock) && (
        <div className="text-white text-sm">{localValue}</div>
      )}
    </div>
  );
}
