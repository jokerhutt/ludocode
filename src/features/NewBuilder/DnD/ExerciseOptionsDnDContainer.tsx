import { DndContext, DragOverlay } from "@dnd-kit/core";
import { OptionsColumn } from "./OptionsColumn";
import type { OptionSnap } from "@/Types/Snapshot/SnapshotTypes";
import {
  useOptionsDragAndDrop,
  type ColumnType,
} from "@/Hooks/Logic/DnD/useOptionsDragAndDrop";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type ExerciseOptionsDnDContainerProps = {
  removeValue: (index: number, type: "correct" | "distractor") => void;
  addValue: (payload: {
    item: OptionSnap;
    type: "correct" | "distractor";
  }) => void;
  correct: OptionSnap[];
  distractors: OptionSnap[];
  onEdit?: (id: string, column: ColumnType, value: string) => void;
};

// ExerciseOptionsDnDContainer.tsx
export type FormEditMode = "Arrange" | "Rename" | "Lock" | "Delete";

export function ExerciseOptionsDnDContainer({
  correct,
  distractors,
  removeValue,
  addValue,
  onEdit,
}: ExerciseOptionsDnDContainerProps) {
  const [editMode, setEditMode] = useState<FormEditMode>("Lock");

  const {
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    draggingItem,
  } = useOptionsDragAndDrop({
    correct,
    distractors,
    removeValue,
    addValue,
  });

  const isArrange = editMode === "Arrange";

  const editModeOptions: FormEditMode[] = [
    "Arrange",
    "Rename",
    "Delete",
    "Lock",
  ];

  return (
    <DndContext
      sensors={sensors}
      onDragStart={isArrange ? handleDragStart : undefined}
      onDragEnd={isArrange ? handleDragEnd : undefined}
      onDragCancel={isArrange ? handleDragCancel : undefined}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-end gap-2">
          {editModeOptions.map((option) => (
            <Button
              key={option}
              onClick={() => setEditMode(option)}
              type="button"
              size="sm"
              variant={editMode === option ? "default" : "outline"}
              className="hover:cursor-pointer"
            >
              {option}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          <OptionsColumn
            editMode={editMode}
            addValue={addValue}
            onEdit={onEdit}
            columnType="correct"
            items={correct}
            removeValue={removeValue}
          />
          <OptionsColumn
            editMode={editMode}
            addValue={addValue}
            onEdit={onEdit}
            columnType="distractor"
            items={distractors}
            removeValue={removeValue}
          />
        </div>
      </div>

      {isArrange && draggingItem && (
        <DragOverlay>
          <div className="p-2 border-ludoLightPurple border rounded-md text-white shadow-2xl cursor-grabbing opacity-95">
            {draggingItem.content}
          </div>
        </DragOverlay>
      )}
    </DndContext>
  );
}
