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

export function ExerciseOptionsDnDContainer({
  correct,
  distractors,
  removeValue,
  addValue,
  onEdit,
}: ExerciseOptionsDnDContainerProps) {
  const [isLocked, setIsLocked] = useState(true);

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
    isLocked,
  });

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-ludoAltText">
            {isLocked ? "Edit options" : "Drag to reorder / move"}
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setIsLocked((v) => !v)}
          >
            {isLocked ? "Unlock order" : "Lock order"}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <OptionsColumn
            addValue={addValue}
            onEdit={onEdit}
            columnType="correct"
            items={correct}
            removeValue={removeValue}
            isLocked={isLocked}
          />
          <OptionsColumn
            addValue={addValue}
            onEdit={onEdit}
            columnType="distractor"
            items={distractors}
            removeValue={removeValue}
            isLocked={isLocked}
          />
        </div>
      </div>

      <DragOverlay>
        {draggingItem && (
          <div className="p-2 border-ludoLightPurple border rounded-md text-white shadow-2xl cursor-grabbing opacity-95">
            {draggingItem.content}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
