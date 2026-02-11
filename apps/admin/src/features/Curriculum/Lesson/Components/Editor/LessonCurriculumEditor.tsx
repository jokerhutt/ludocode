import type { CurriculumDraftLessonForm, ExerciseType } from "@ludocode/types";
import { withForm } from "@/features/Curriculum/types";
import { EditorActions } from "@/features/Curriculum/Components/Editor/EditorActions";
import { SortableExerciseContainer } from "./SortableExerciseContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ludocode/external/ui/select";
import { createNewExerciseTemplate } from "./templates";
import { ExerciseTypePill } from "./ExerciseTypePill";
import {
  CurriculumPreviewContent,
  CurriculumPreviewFooter,
  CurriculumPreviewHeader,
} from "@/features/Curriculum/Components/CurriculumList";

const exerciseTypes: ExerciseType[] = ["INFO", "CLOZE", "TRIVIA", "ANALYZE"];

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

        <CurriculumPreviewContent className="p-0 bg-ludo-surface">
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
                <Select
                  value=""
                  onValueChange={(type) =>
                    exercisesField.pushValue(
                      createNewExerciseTemplate(type as ExerciseType),
                    )
                  }
                >
                  <SelectTrigger className="w-auto h-auto gap-2 px-3 py-1 rounded-sm bg-ludo-surface border-transparent !text-white text-sm hover:bg-ludo-accent/20 transition-colors focus:ring-0 focus-visible:ring-0">
                    <SelectValue placeholder="+ Add Exercise" />
                  </SelectTrigger>
                  <SelectContent className="bg-ludo-surface border-ludo-border">
                    {exerciseTypes.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="text-white hover:bg-ludo-background cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <ExerciseTypePill type={type} />
                          <span>{type}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>
        </CurriculumPreviewFooter>
      </div>
    );
  },
});
