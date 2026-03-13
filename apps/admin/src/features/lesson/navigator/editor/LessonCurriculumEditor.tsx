import type {
  CurriculumDraftLessonForm,
  LanguageMetadata,
} from "@ludocode/types";
import { withForm } from "@/features/curriculum/types.ts";
import { EditorActions } from "@/features/curriculum/navigator/editor/EditorActions.tsx";
import { SortableExerciseContainer } from "../../detail/editor/SortableExerciseContainer.tsx";
import {
  createNewExerciseTemplate,
  createNewGuidedExerciseTemplate,
} from "../../detail/editor/templates.ts";
import { ShadowLessButton } from "@ludocode/design-system/primitives/shadowless-button.tsx";
import {
  CurriculumCard,
  CurriculumCardContent,
  CurriculumCardFooter,
  CurriculumCardHeader,
} from "@/features/curriculum/components/CurriculumList.tsx";

export const LessonCurriculumEditor = withForm({
  defaultValues: {
    lessonType: "NORMAL" as CurriculumDraftLessonForm["lessonType"],
    exercises: [] as CurriculumDraftLessonForm["exercises"],
  },
  props: {
    onSave: () => {},
    onCancel: () => {},
    canSubmit: false,
    isSubmitting: false,
    selectedExerciseId: null as string | null,
    onSelectExercise: (() => {}) as (id: string | null) => void,
    courseLanguage: undefined as LanguageMetadata | undefined,
  },
  render: function Render({
    form,
    onSave,
    onCancel,
    canSubmit,
    isSubmitting,
    selectedExerciseId,
    onSelectExercise,
    courseLanguage,
  }) {
    return (
      <CurriculumCard>
        <CurriculumCardHeader>
          <p className="text-ludo-white-bright font-bold">Editing Exercises</p>
          <EditorActions
            onSave={onSave}
            onCancel={onCancel}
            canSubmit={canSubmit}
            isSubmitting={isSubmitting}
          />
        </CurriculumCardHeader>

        <CurriculumCardContent className="p-0 bg-ludo-background">
          <SortableExerciseContainer
            form={form}
            selectedExerciseId={selectedExerciseId}
            onSelectExercise={onSelectExercise}
          />
        </CurriculumCardContent>

        <CurriculumCardFooter>
          <form.Subscribe
            selector={(state) => ({
              count: state.values.exercises.length,
              lessonType: state.values.lessonType,
            })}
            children={({ count, lessonType }) => (
              <div className="flex justify-between w-full items-center">
                <p className="text-xs">{count} exercises</p>
                <form.Field name="exercises" mode="array">
                  {(exercisesField: any) => (
                    <ShadowLessButton
                      type="button"
                      onClick={() =>
                        exercisesField.pushValue(
                          lessonType === "GUIDED"
                            ? createNewGuidedExerciseTemplate(courseLanguage)
                            : createNewExerciseTemplate(),
                        )
                      }
                    >
                      + Add Exercise
                    </ShadowLessButton>
                  )}
                </form.Field>
              </div>
            )}
          />
        </CurriculumCardFooter>
      </CurriculumCard>
    );
  },
});
