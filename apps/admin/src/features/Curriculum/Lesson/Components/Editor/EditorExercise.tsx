import type {
  CurriculumDraftLessonExercise,
  CurriculumDraftLessonForm,
} from "@ludocode/types";
import { withForm } from "@/features/Curriculum/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";
import { ExercisePreviewItem } from "../Preview/ExercisePreviewItem";
import { ExerciseTypePill } from "./ExerciseTypePill";
import {
  getExerciseTitle,
  deriveExerciseType,
} from "@/features/Curriculum/Lesson/helpers";

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
        className="w-full flex items-center gap-2"
      >
        <Grip
          className="h-5 w-5 text-white focus:outline-none focus-visible:outline-none cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        />

        <ExercisePreviewItem
          title={title}
          isSelected={isSelected}
          onClick={onSelect}
        />

        <ExerciseTypePill type={exerciseType} />
      </div>
    );
  },
});
