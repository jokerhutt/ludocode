import type { CurriculumDraftLessonForm } from "@ludocode/types";
import { withForm } from "@/features/Curriculum/types";
import { EditorActions } from "@/features/Curriculum/Components/Editor/EditorActions";
import { SortableExerciseContainer } from "./SortableExerciseContainer";
import { AddExerciseSelect } from "./AddExerciseSelect";
import { createNewExerciseTemplate } from "./templates";
import { LudoPreviewPanel } from "@ludocode/design-system/widgets/ludo-preview-panel";

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
      <LudoPreviewPanel>
        <LudoPreviewPanel.Header>
          <p className="text-white font-bold">Editing Exercises</p>
          <EditorActions
            onSave={onSave}
            onCancel={onCancel}
            canSubmit={canSubmit}
            isSubmitting={isSubmitting}
          />
        </LudoPreviewPanel.Header>

        <LudoPreviewPanel.Content className="p-0 bg-ludo-surface">
          <SortableExerciseContainer
            form={form}
            selectedExerciseId={selectedExerciseId}
            onSelectExercise={onSelectExercise}
          />
        </LudoPreviewPanel.Content>

        <LudoPreviewPanel.Footer>
          <form.Field name="exercises" mode="array">
            {(exercisesField) => (
              <div className="flex justify-between w-full items-center">
                <p className="text-xs">
                  {exercisesField.state.value.length} exercises
                </p>
                <AddExerciseSelect
                  onAdd={(type) =>
                    exercisesField.pushValue(createNewExerciseTemplate(type))
                  }
                />
              </div>
            )}
          </form.Field>
        </LudoPreviewPanel.Footer>
      </LudoPreviewPanel>
    );
  },
});
