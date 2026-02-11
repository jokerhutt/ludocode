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
    selectedExerciseIndex: null as number | null,
    onSelectExercise: (() => {}) as (index: number | null) => void,
  },
  render: function Render({
    form,
    onSave,
    onCancel,
    canSubmit,
    isSubmitting,
    selectedExerciseIndex,
    onSelectExercise,
  }) {
    return (
      <div className="w-full h-full min-h-0 flex flex-col gap-4">
        <div className="w-full text-white flex justify-between pb-4 border-b border-b-ludo-accent">
          <p>Editing Exercises</p>
        </div>
        <form.Field name="exercises" mode="array">
          {(exercisesField) => (
            <div className="flex justify-between">
              <Select
                value=""
                onValueChange={(type) =>
                  exercisesField.pushValue(
                    createNewExerciseTemplate(type as ExerciseType),
                  )
                }
              >
                <SelectTrigger className="w-auto h-auto gap-2 px-4 py-1 rounded-sm bg-ludo-surface border-transparent text-white text-sm focus:ring-0 focus-visible:ring-0">
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
          <SortableExerciseContainer
            form={form}
            selectedExerciseIndex={selectedExerciseIndex}
            onSelectExercise={onSelectExercise}
          />
        </div>
      </div>
    );
  },
});
