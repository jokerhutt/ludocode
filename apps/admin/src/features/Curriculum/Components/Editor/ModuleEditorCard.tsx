import { LudoInput } from "@ludocode/design-system/primitives/input";
import type { CurriculumDraft, CurriculumDraftLesson } from "@ludocode/types";
import { Grip } from "lucide-react";
import { withForm } from "../../types";
import { EditorFooterActions } from "./EditorFooterActions";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { CSS } from "@dnd-kit/utilities";

import {
  closestCenter,
  closestCorners,
  DndContext,
  MeasuringStrategy,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const EditorLessonRow = withForm({
  defaultValues: {
    modules: [] as CurriculumDraft["modules"],
  },
  props: {
    moduleIndex: 0,
    lessonIndex: 0,
    lesson: {} as CurriculumDraftLesson,
  },
  render: function Render({ form, moduleIndex, lessonIndex, lesson }) {
    const lessonId = lesson.id;

    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: lessonId });

    if (transform?.y) {
      console.log("row", lessonId, "transform.y", transform.y);
    }

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="w-full flex items-center gap-2"
      >
        <Grip className="h-5 w-5" />

        <form.Field
          key={lessonId} // ✅ force remount when index<->lesson changes
          name={`modules[${moduleIndex}].lessons[${lessonIndex}].title`}
          children={(field) => (
            <LudoInput
              className="h-10 flex-1"
              value={String(field.state.value)}
              setValue={(value) => field.handleChange(value)}
            />
          )}
        />
      </div>
    );
  },
});

export const ModuleEditorCard = withForm({
  defaultValues: {
    modules: [] as CurriculumDraft["modules"],
  },
  props: {
    moduleIndex: 0,
    onSave: () => {},
  },
  render: function Render({ form, moduleIndex }) {
    return (
      <div className="flex rounded-lg text-white border-3 p-4 border-dashed border-ludo-accent h-full flex-col w-full">
        <div className="w-full flex items-center gap-4">
          <Grip className="h-5 w-5" />
          <form.Field
            name={`modules[${moduleIndex}].title`}
            children={(field) => <p>{String(field.state.value)}</p>}
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
                  measuring={{
                    droppable: { strategy: MeasuringStrategy.Always },
                  }}
                  onDragEnd={handleDragEnd}
                  collisionDetection={closestCenter}
                >
                  <div className="flex flex-col gap-4 w-full h-full">
                    <SortableContext
                      items={lessons.map((l) => l.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {lessons.map((lesson, lessonIndex) => (
                        <EditorLessonRow
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
                  <LudoButton
                    type="button"
                    className="w-auto h-auto px-4 py-1 rounded-sm"
                    shadow={false}
                    variant="white"
                    onClick={() =>
                      lessonsField.pushValue({
                        id: crypto.randomUUID(),
                        title: "",
                      })
                    }
                  >
                    Add Lesson
                  </LudoButton>
                </div>
              </>
            );
          }}
        </form.Field>
      </div>
    );
  },
});
