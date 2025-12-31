import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@ludocode/external/ui/button";
import { useState } from "react";
import { SortableExerciseDot } from "@/features/Builder/Components/Drag/SortableExerciseDot.tsx";

type ExerciseNode = { id: string };

type ExerciseNodesListProps = {
  exercises: ExerciseNode[];
  currentExerciseId: string;
  onSelect: (id: string) => void;
  onReorder: (oldIndex: number, newIndex: number) => void;
  errorMap: Record<string, boolean>;
};

export const ExerciseNodesList = ({
  exercises,
  errorMap,
  currentExerciseId,
  onSelect,
  onReorder,
}: ExerciseNodesListProps) => {
  const [isLocked, setIsLocked] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    })
  );

  console.log("eror map: " + JSON.stringify(errorMap));

  const handleDragEnd = (event: DragEndEvent) => {
    if (isLocked) return;

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = exercises.findIndex((e) => e.id === active.id);
    const newIndex = exercises.findIndex((e) => e.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    onReorder(oldIndex, newIndex);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center pb-1">
        <span className="text-xs text-ludoGrayDark">
          {isLocked ? "Click to select" : "Drag to reorder"}
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

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext
          items={exercises.map((e) => e.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="w-full flex gap-2 items-center p-2 border border-ludoGrayDark rounded-md">
            {exercises.map((exercise) => (
              <SortableExerciseDot
                key={exercise.id}
                hasError={!!errorMap[exercise.id]}
                id={exercise.id}
                isSelected={exercise.id === currentExerciseId}
                isLocked={isLocked}
                onSelect={onSelect}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
