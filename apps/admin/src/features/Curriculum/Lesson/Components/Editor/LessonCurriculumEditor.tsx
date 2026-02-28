import type { CurriculumDraftLessonForm } from "@ludocode/types";
import { withForm } from "@/features/Curriculum/types";
import { EditorActions } from "@/features/Curriculum/Components/Editor/EditorActions";
import { SortableExerciseContainer } from "./SortableExerciseContainer";
import { createNewExerciseTemplate } from "./templates";
import { ShadowLessButton } from "@ludocode/design-system/primitives/ShadowLessButton.tsx";
import {
  CurriculumPreviewContent,
  CurriculumPreviewFooter,
  CurriculumPreviewHeader,
} from "@/features/Curriculum/Components/CurriculumList";

export const LessonCurriculumEditor = withForm({
  defaultValues: {
    exercises: [] as CurriculumDraftLessonForm["exercises"],
  },
  props: {
    onSave: () => {},
    onCancel: () => {},
    canSubmit: false,
    isSubmitting: false,
    selectedExerciseId: null as string | null,
    onSelectExercise: (() => {}) as (id: string | null) => void,
  },
  render: function Render({
    form,
    onSave,
    onCancel,
    canSubmit,
    isSubmitting,
    selectedExerciseId,
    onSelectExercise,
  }) {
    return (
      <div className="flex rounded-lg min-h-0 text-white border-3 border-ludo-border h-full flex-col w-full">
        <CurriculumPreviewHeader>
          <p className="text-white font-bold">Editing Exercises</p>
          <EditorActions
            onSave={onSave}
            onCancel={onCancel}
            canSubmit={canSubmit}
            isSubmitting={isSubmitting}
          />
        </CurriculumPreviewHeader>

        <CurriculumPreviewContent className="p-0 bg-ludo-background">
          <SortableExerciseContainer
            form={form}
            selectedExerciseId={selectedExerciseId}
            onSelectExercise={onSelectExercise}
          />
        </CurriculumPreviewContent>

        <CurriculumPreviewFooter>
          <form.Field name="exercises" mode="array">
            {(exercisesField) => (
              <div className="flex justify-between w-full items-center">
                <p className="text-xs">
                  {exercisesField.state.value.length} exercises
                </p>
                <ShadowLessButton
                  type="button"
                  onClick={() =>
                    exercisesField.pushValue(createNewExerciseTemplate())
                  }
                >
                  + Add Exercise
                </ShadowLessButton>
              </div>
            )}
          </form.Field>
        </CurriculumPreviewFooter>
      </div>
    );
  },
});
