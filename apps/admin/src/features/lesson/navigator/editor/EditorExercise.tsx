import type {
  CurriculumDraftLessonExercise,
  CurriculumDraftLessonForm,
} from "@ludocode/types";
import { withForm } from "@/features/curriculum/types.ts";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";
import { ExerciseTypePill } from "../../components/ExerciseTypePill.tsx";
import {
  getExerciseTitle,
  deriveExerciseType,
} from "@/features/lesson/helpers.ts";
import { cn } from "@ludocode/design-system/cn-utils.ts";

export const EditorExercise = withForm({
  defaultValues: {
    exercises: [] as CurriculumDraftLessonForm["exercises"],
  },
  props: {
    exerciseIndex: 0,
    exercise: {} as CurriculumDraftLessonExercise,
    isSelected: false,
    onSelect: (() => {}) as () => void,
  },
  render: function Render({
    form: _form,
    exerciseIndex: _exerciseIndex,
    exercise,
    isSelected,
    onSelect,
  }) {
    const exerciseId = exercise.exerciseId;
    const title = getExerciseTitle(exercise);
    const exerciseType = deriveExerciseType(exercise);

    const {
      attributes,
      listeners,
      setNodeRef,
      isDragging,
      transform,
      transition,
    } = useSortable({ id: exerciseId });

    const style = {
      transition: isDragging ? transition : undefined,
      transform: CSS.Transform.toString(transform),
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        onClick={onSelect}
        className={cn(
          "w-full flex items-center gap-2 bg-ludo-background rounded-sm px-3 h-10 hover:cursor-pointer",
          isSelected && "border-2 border-ludo-accent",
        )}
      >
        <Grip
          className="h-4 w-4 shrink-0 text-ludo-white focus:outline-none focus-visible:outline-none cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        />

        <p className="text-sm text-ludo-white flex-1 truncate">{title}</p>

        <ExerciseTypePill type={exerciseType} />
      </div>
    );
  },
});
