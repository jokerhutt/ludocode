import type {
  CurriculumDraftLesson,
  CurriculumDraftModules,
} from "@ludocode/types";
import { withForm } from "../../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip, Trash2 } from "lucide-react";
import { LudoInput } from "@ludocode/design-system/primitives/input";

export const EditorLesson = withForm({
  defaultValues: {
    modules: [] as CurriculumDraftModules,
  },
  props: {
    moduleIndex: 0,
    lessonIndex: 0,
    lesson: {} as CurriculumDraftLesson,
    onDelete: undefined as undefined | (() => void),
    canDelete: true,
  },
  render: function Render({
    form,
    moduleIndex,
    lessonIndex,
    lesson,
    canDelete,
    onDelete,
  }) {
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
        {onDelete && (
          <button
            type="button"
            onClick={canDelete ? onDelete : undefined}
            disabled={!canDelete}
            className={`transition-colors p-1 rounded shrink-0
      ${
        canDelete
          ? "text-red-400 hover:text-red-300 hover:bg-red-400/10"
          : "text-red-400/40 cursor-not-allowed"
      }`}
            title={
              canDelete ? "Delete lesson" : "At least one lesson is required"
            }
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    );
  },
});
