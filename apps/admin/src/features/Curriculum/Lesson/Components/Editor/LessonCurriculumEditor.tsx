import type { CurriculumDraftLessonForm } from "@ludocode/types";
import { withForm } from "@/features/Curriculum/types";
import { EditorActions } from "@/features/Curriculum/Components/Editor/EditorActions";
import { SortableExerciseContainer } from "./SortableExerciseContainer";
import { ShadowLessButton } from "@/features/Curriculum/Components/ShadowLessButton";
import { createNewExerciseTemplate } from "./templates";

export const LessonCurriculumEditor = withForm({
  defaultValues: {
    id: "",
    title: "",
    exercises: [] as CurriculumDraftLessonForm["exercises"],
  },
  props: {
    onSave: () => {},
    onCancel: () => {},
    canSubmit: false,
    isSubmitting: false,
  },
  render: function Render({ form, onSave, onCancel, canSubmit, isSubmitting }) {
    return (
      <div className="w-full h-full min-h-0 flex flex-col gap-4">
        <div className="w-full text-white flex justify-between pb-4 border-b border-b-ludo-accent">
          <p>Editing Exercises</p>
        </div>
        <form.Field name="exercises" mode="array">
          {(exercisesField) => (
            <div className="flex justify-between">
              <ShadowLessButton
                onClick={() =>
                  exercisesField.pushValue(createNewExerciseTemplate())
                }
              >
                Add Exercise
              </ShadowLessButton>
              <EditorActions
                className="justify-end"
                onSave={onSave}
                onCancel={onCancel}
                canSubmit={canSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          )}
        </form.Field>
        <div className="h-full overflow-y-auto scrollbar-ludo-accent  border-3 border-dashed rounded-lg border-ludo-accent py-2 pr-2 min-h-0 w-full ">
          <SortableExerciseContainer form={form} />
        </div>
      </div>
    );
  },
});
