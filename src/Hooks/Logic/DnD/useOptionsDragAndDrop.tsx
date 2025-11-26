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
};

export function useOptionsDragAndDrop({
  correct,
  distractors,
  addValue,
  removeValue,
}: Args) {
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || !active.id) return;

      const draggedId = active.id as string;
      const overId = over.id as string;

      const fromCorrect = correct.some((o) => o.exerciseOptionId === draggedId);
      const from = fromCorrect ? correct : distractors;
      const fromType = fromCorrect ? "correct" : ("distractor" as const);

      const oldIndex = from.findIndex((o) => o.exerciseOptionId === draggedId);
      if (oldIndex === -1) return;

      const toColumnDrop = overId === "correct" || overId === "distractor";
      const toType: ColumnType = toColumnDrop
        ? (overId as ColumnType)
        : fromType;

      let item = { ...from[oldIndex] };

      if (fromType === "correct" && toType === "distractor") {
        item = { ...item, answerOrder: null };
      }

      if (fromType === "distractor" && toType === "correct") {
        const nextOrder = correct.length + 1;
        item = { ...item, answerOrder: nextOrder };
      }

      removeValue(oldIndex, fromType);
      addValue({ item, type: toType });

      setActiveId(null);
    },
    [correct, distractors, removeValue, addValue]
  );

  const draggingItem = useMemo(() => {
    if (!activeId) return null;
    return (
      [...correct, ...distractors].find(
        (o) => o.exerciseOptionId === activeId
      ) ?? null
    );
  }, [activeId, correct, distractors]);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return {
    sensors,
    activeId,
    draggingItem,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
}
