import { LudoInput } from "@ludocode/design-system/primitives/input";
import type { CurriculumDraft } from "@ludocode/types";
import { withForm } from "../../types";

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
import { ShadowLessButton } from "../ShadowLessButton";
import { EditorLesson } from "./EditorLesson";
import { createNewLessonTemplate } from "./templates";
import { ModuleOrderActions } from "./ModuleOrderActions";

export const ModuleEditorCard = withForm({
  defaultValues: {
    modules: [] as CurriculumDraft["modules"],
  },
  props: {
    moduleIndex: 0,
    onSave: () => {},
    onMoveUp: () => {},
    onMoveDown: () => {},
  },
  render: function Render({ form, moduleIndex, onMoveUp, onMoveDown }) {
    const modules = form.state.values.modules;

    return (
      <div className="flex rounded-lg text-white border-3 p-4 gap-6 border-dashed border-ludo-accent h-full w-full">
        <ModuleOrderActions
          moduleIndex={moduleIndex}
          totalModules={modules.length}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
        />
        <div className="flex flex-col w-full h-full">
          <div className="w-full flex items-center gap-4">
            <form.Field
              name={`modules[${moduleIndex}].title`}
              children={(field) => (
                <LudoInput
                  setValue={(value) => field.handleChange(value)}
                  value={String(field.state.value)}
                />
              )}
            />
          </div>

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
                <>
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
                        items={lessons.map((l) => l.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        {lessons.map((lesson, lessonIndex) => (
                          <EditorLesson
                            key={lesson.id}
                            form={form}
                            lesson={lesson}
                            moduleIndex={moduleIndex}
                            lessonIndex={lessonIndex}
                          />
                        ))}
                      </SortableContext>
                    </div>
                  </DndContext>

                  <div className="w-full flex justify-end pr-4 items-center gap-4">
                    <ShadowLessButton
                      type="button"
                      variant="white"
                      onClick={() =>
                        lessonsField.pushValue(createNewLessonTemplate())
                      }
                    >
                      Add Lesson
                    </ShadowLessButton>
                  </div>
                </>
              );
            }}
          </form.Field>
        </div>
      </div>
    );
  },
});
