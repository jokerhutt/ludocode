import type { CurriculumDraftLessonForm } from "@ludocode/types";
import {
  closestCenter,
  DndContext,
  MeasuringStrategy,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { withForm } from "@/features/Curriculum/types";
import { EditorExercise } from "./EditorExercise";

export const SortableExerciseContainer = withForm({
  defaultValues: {
    id: "",
    title: "",
    exercises: [] as CurriculumDraftLessonForm["exercises"],
  },
  props: {
    selectedExerciseId: null as string | null,
    onSelectExercise: (() => {}) as (id: string | null) => void,
  },
  render: function Render({ form, selectedExerciseId, onSelectExercise }) {
    return (
      <form.Field name="exercises" mode="array">
        {(exercisesField) => {
          const exercises = exercisesField.state.value;

          const handleDragEnd = (event: DragEndEvent) => {
            const { active, over } = event;
            if (!over) return;
            if (active.id === over.id) return;

            const from = exercises.findIndex((e) => e.id === active.id);
            const to = exercises.findIndex((e) => e.id === over.id);

            if (from === -1 || to === -1) return;

            exercisesField.moveValue(from, to);
          };

          return (
            <DndContext
              autoScroll={false}
              measuring={{
                droppable: { strategy: MeasuringStrategy.Always },
              }}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCenter}
            >
              <div className="flex flex-col gap-4 p-4 w-full h-full">
                <SortableContext
                  items={exercises.map((e) => e.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {exercises.map((exercise, exerciseIndex) => (
                    <EditorExercise
                      exercise={exercise}
                      key={exercise.id}
                      form={form}
                      exerciseIndex={exerciseIndex}
                      isSelected={selectedExerciseId === exercise.id}
                      onSelect={() => onSelectExercise(exercise.id)}
                    />
                  ))}
                </SortableContext>
              </div>
            </DndContext>
          );
        }}
      </form.Field>
    );
  },
});
