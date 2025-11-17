import { DndContext, DragOverlay } from "@dnd-kit/core";
import { OptionsColumn } from "./OptionsColumn";
import type { OptionSnap } from "@/Types/Snapshot/SnapshotTypes";
import { useOptionsDragAndDrop } from "@/Hooks/Logic/DnD/useOptionsDragAndDrop";

type ExerciseOptionsDnDContainerProps = {
  removeValue: (index: number, type: "correct" | "distractor") => void;
  addValue: (payload: {
    item: OptionSnap;
    type: "correct" | "distractor";
  }) => void;
  correct: OptionSnap[];
  distractors: OptionSnap[];
};

export function ExerciseOptionsDnDContainer({
  correct,
  distractors,
  removeValue,
  addValue,
}: ExerciseOptionsDnDContainerProps) {
  const {
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    draggingItem,
  } = useOptionsDragAndDrop({ correct, distractors, removeValue, addValue });

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="grid grid-cols-2 gap-8">
        <OptionsColumn columnType="correct" items={correct} />
        <OptionsColumn columnType="distractor" items={distractors} />
      </div>

      <DragOverlay>
        {draggingItem && (
          <div className="p-4 bg-white rounded-lg shadow-2xl cursor-grabbing opacity-95">
            {draggingItem.content}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
