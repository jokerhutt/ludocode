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
import { withForm } from "@/features/curriculum/types.ts";
import { EditorExercise } from "../../navigator/editor/EditorExercise.tsx";

export const SortableExerciseContainer = withForm({
  defaultValues: {
    exercises: [] as CurriculumDraftLessonForm["exercises"],
  },
  props: {
    selectedExerciseId: null as string | null,
    onSelectExercise: (() => {}) as (id: string | null) => void,
  },
  render: function Render({ form, selectedExerciseId, onSelectExercise }) {
    return (
      <form.Subscribe
        selector={(state) => state.values.exercises}
        children={(exercises) => (
          <form.Field name="exercises" mode="array">
            {(exercisesField) => {
              const handleDragEnd = (event: DragEndEvent) => {
                const { active, over } = event;
                if (!over || active.id === over.id) return;

                const from = exercises.findIndex(
                  (e) => e.exerciseId === active.id,
                );
                const to = exercises.findIndex((e) => e.exerciseId === over.id);

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
                  <div className="flex flex-col gap-2 p-4">
                    <SortableContext
                      items={exercises.map((e) => e.exerciseId)}
                      strategy={verticalListSortingStrategy}
                    >
                      {exercises.map((exercise, exerciseIndex) => (
                        <EditorExercise
                          exercise={exercise}
                          key={exercise.exerciseId}
                          form={form}
                          exerciseIndex={exerciseIndex}
                          isSelected={
                            selectedExerciseId === exercise.exerciseId
                          }
                          onSelect={() => onSelectExercise(exercise.exerciseId)}
                        />
                      ))}
                    </SortableContext>
                  </div>
                </DndContext>
              );
            }}
          </form.Field>
        )}
      />
    );
  },
});
