import { LudoInput } from "@ludocode/design-system/primitives/input";
import type { CurriculumDraft, CurriculumDraftLesson } from "@ludocode/types";
import { ArrowDown, ArrowUp, Grip } from "lucide-react";
import { withForm } from "../../types";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { CSS } from "@dnd-kit/utilities";

import {
  closestCenter,
  DndContext,
  MeasuringStrategy,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ShadowLessButton } from "../ShadowLessButton";

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

    const {
      attributes,
      listeners,
      setNodeRef,
      isDragging,
      transform,
      transition,
    } = useSortable({ id: lessonId });

    const style = {
      transition: isDragging ? transition : undefined,
      transform: CSS.Transform.toString(transform),
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-full flex items-center gap-2"
      >
        <Grip
          className="h-5 w-5 focus:outline-none focus-visible:outline-none cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        />

        <form.Field
          key={lessonId}
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
    const modules = form.state.values.modules;
    console.log("Up Clicked: ModuleIndex: " + moduleIndex);
    const moveUp = () => {
      const modules = form.state.values.modules;

      if (moduleIndex === 0) return;

      const next = [...modules];
      [next[moduleIndex - 1], next[moduleIndex]] = [
        next[moduleIndex],
        next[moduleIndex - 1],
      ];

      form.setFieldValue("modules", next);
    };

    const moveDown = () => {
      const modules = form.state.values.modules;

      console.table(modules.map((m) => m.id));

      if (moduleIndex === modules.length - 1) return;

      const next = [...modules];
      [next[moduleIndex], next[moduleIndex + 1]] = [
        next[moduleIndex + 1],
        next[moduleIndex],
      ];

      form.setFieldValue("modules", next);
    };

    return (
      <div className="flex rounded-lg text-white border-3 p-4 gap-6 border-dashed border-ludo-accent h-full w-full">
        <div className="flex flex-col gap-2">
          <ShadowLessButton
            disabled={moduleIndex === 0}
            onClick={() => moveUp()}
            className="w-6 h-6 rounded-sm"
          >
            <ArrowUp className="h-4 w-4" />
          </ShadowLessButton>

          <ShadowLessButton
            disabled={moduleIndex === modules.length - 1}
            onClick={() => moveDown()}
            className="w-6 h-6 rounded-sm"
          >
            <ArrowDown className="h-4 w-4" />
          </ShadowLessButton>
        </div>
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
                          title: "Untitled Lesson",
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
      </div>
    );
  },
});
