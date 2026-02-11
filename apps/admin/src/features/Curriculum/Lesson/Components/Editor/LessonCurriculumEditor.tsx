import type { CurriculumDraftLessonExercises } from "@ludocode/types";
import { EditorExercise } from "./EditorExercise";
import { EditorActions } from "@/features/Curriculum/Components/Editor/EditorActions";
import { AddCurriculumItemButton } from "@/features/Curriculum/Components/Editor/AddModuleButton";
import { ShadowLessButton } from "@/features/Curriculum/Components/ShadowLessButton";

type LessonCurriculumEditorProps = {
  exercises: CurriculumDraftLessonExercises;
  onSave: () => void;
  onCancel: () => void;
  canSubmit: boolean;
  isSubmitting: boolean;
};

export function LessonCurriculumEditor({
  exercises,
  onSave,
  onCancel,
  canSubmit,
  isSubmitting,
}: LessonCurriculumEditorProps) {
  return (
    <div className="w-full h-full min-h-0 flex gap-4 flex-col">
      <div className="w-full text-white flex justify-between pb-4 border-b border-b-ludo-accent">
        <p>Editing Curriculum</p>
      </div>
      <div className="flex justify-between w-full">
        <ShadowLessButton>Add Exercise</ShadowLessButton>
        <EditorActions
          className="justify-end"
          onSave={() => onSave()}
          onCancel={() => onCancel()}
          canSubmit={canSubmit}
          isSubmitting={isSubmitting}
        />
      </div>

      <div className="overflow-y-auto border-3 flex flex-col gap-4 border-dashed rounded-lg border-ludo-accent scrollbar-ludo-accent p-4 h-full w-full min-h-0">
        <>
          {exercises.map((exercise) => (
            <div className="flex flex-col gap-4">
              <EditorExercise />
            </div>
          ))}
        </>
      </div>
    </div>
  );
}
