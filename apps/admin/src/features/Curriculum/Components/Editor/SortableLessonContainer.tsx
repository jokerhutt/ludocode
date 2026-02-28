import type { CurriculumDraft } from "@ludocode/types";
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
import { withForm } from "../../types";
import { EditorLesson } from "./EditorLesson";
import { createNewLessonTemplate } from "./templates";
import { AddCurriculumItemButton } from "./AddModuleButton";

export const SortableLessonContainer = withForm({
  defaultValues: {
    modules: [] as CurriculumDraft["modules"],
  },
  props: {
    moduleIndex: 0,
  },
  render: function Render({ form, moduleIndex }) {
    return (
      <form.Field name={`modules[${moduleIndex}].lessons`} mode="array">
        {(lessonsField) => {
          const lessons = lessonsField.state.value;

          const handleDragEnd = (event: DragEndEvent) => {
            const { active, over } = event;
            if (!over) return;
            if (active.id === over.id) return;

            const from = lessons.findIndex((l) => l.id === active.id);
            const to = lessons.findIndex((l) => l.id === over.id);

            if (from === -1 || to === -1) return;

            lessonsField.moveValue(from, to);
          };

          return (
            <div className="flex flex-col gap-2 p-4">
              <DndContext
                autoScroll={false}
                measuring={{
                  droppable: { strategy: MeasuringStrategy.Always },
                }}
                onDragEnd={handleDragEnd}
                collisionDetection={closestCenter}
              >
                <SortableContext
                  items={lessons.map((l) => l.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-col gap-2">
                    {lessons.map((lesson, lessonIndex) => (
                      <EditorLesson
                        key={lesson.id}
                        form={form}
                        lesson={lesson}
                        moduleIndex={moduleIndex}
                        lessonIndex={lessonIndex}
                        onDelete={() => lessonsField.removeValue(lessonIndex)}
                        canDelete={lessons.length > 1}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              <AddCurriculumItemButton
                text="Add Lesson"
                onAdd={() => lessonsField.pushValue(createNewLessonTemplate())}
              />
            </div>
          );
        }}
      </form.Field>
    );
  },
});
