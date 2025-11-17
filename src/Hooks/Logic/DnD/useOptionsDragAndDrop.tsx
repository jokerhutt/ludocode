import type { OptionSnap } from "@/Types/Snapshot/SnapshotTypes";
import {
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useCallback, useMemo, useState } from "react";

export type ColumnType = "correct" | "distractor";

type Args = {
  correct: OptionSnap[];
  distractors: OptionSnap[];
  removeValue: (index: number, type: ColumnType) => void;
  addValue: (payload: { item: OptionSnap; type: ColumnType }) => void;
  isLocked: boolean;
};

export function useOptionsDragAndDrop({
  correct,
  distractors,
  addValue,
  removeValue,
  isLocked,
}: Args) {
  const sensors = useSensors(useSensor(PointerSensor));

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      if (isLocked) return; // ignore drag when locked
      setActiveId(event.active.id as string);
    },
    [isLocked]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (isLocked) return; // ignore drag when locked

      const { active, over } = event;
      if (!over || !active.id) return;

      const draggedId = active.id as string;
      const overId = over.id as string;

      const fromCorrect = correct.some(
        (o) => o.exerciseOptionId === draggedId
      );
      const from = fromCorrect ? correct : distractors;
      const fromType: ColumnType = fromCorrect ? "correct" : "distractor";

      const oldIndex = from.findIndex(
        (o) => o.exerciseOptionId === draggedId
      );
      if (oldIndex === -1) return;

      // if you drop on the column area itself, over.id is "correct"/"distractor"
      const toColumnDrop = overId === "correct" || overId === "distractor";
      const toType: ColumnType = toColumnDrop ? (overId as ColumnType) : fromType;

      const item = from[oldIndex]!;
      removeValue(oldIndex, fromType);
      addValue({ item, type: toType });

      setActiveId(null);
    },
    [correct, distractors, removeValue, addValue, isLocked]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const draggingItem = useMemo(() => {
    if (!activeId) return null;
    return (
      [...correct, ...distractors].find(
        (o) => o.exerciseOptionId === activeId
      ) ?? null
    );
  }, [activeId, correct, distractors]);

  return {
    sensors,
    activeId,
    draggingItem,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
}