import type {
  CurriculumDraftLesson,
  CurriculumDraftModules,
} from "@ludocode/types";
import { withForm } from "../../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip} from "lucide-react";
import { LudoInput } from "@ludocode/design-system/primitives/input";
import { LudoTrashIcon } from "@ludocode/design-system/primitives/action-icon";

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
        className="w-full flex items-center gap-2 bg-ludo-background rounded-sm px-3 h-10"
      >
        <Grip
          className="h-4 w-4 shrink-0 text-ludoAltText focus:outline-none focus-visible:outline-none cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        />

        <form.Field
          key={lessonId}
          name={`modules[${moduleIndex}].lessons[${lessonIndex}].title`}
          children={(field) => (
            <LudoInput
              className="h-8 flex-1 border-none bg-ludo-surface/50"
              value={String(field.state.value)}
              setValue={(value) => field.handleChange(value)}
            />
          )}
        />
        {onDelete && (
          <LudoTrashIcon
            onClick={canDelete ? onDelete : undefined}
            disabled={!canDelete}
          />
        )}
      </div>
    );
  },
});
