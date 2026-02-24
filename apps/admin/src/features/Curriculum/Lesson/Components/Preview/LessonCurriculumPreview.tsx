import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { ExercisePreviewItem } from "./ExercisePreviewItem";
import { ExerciseTypePill } from "../Editor/ExerciseTypePill";
import type {
  CurriculumDraftLessonExercise,
  CurriculumDraftLessonExercises,
} from "@ludocode/types";
import { LudoPreviewPanel } from "@ludocode/design-system/widgets/ludo-preview-panel";

type LessonCurriculumPreviewProps = {
  exercises: CurriculumDraftLessonExercises;
  selectedExercise: CurriculumDraftLessonExercise | null;
  setSelectedExercise: (value: CurriculumDraftLessonExercise) => void;
  onEditClick: () => void;
  canEdit: boolean;
};

export function LessonCurriculumPreview({
  exercises,
  selectedExercise,
  setSelectedExercise,
  onEditClick,
  canEdit,
}: LessonCurriculumPreviewProps) {
  return (
    <LudoPreviewPanel>
      <LudoPreviewPanel.Header>
        <p className="text-white font-bold">Exercises Preview</p>
        <LudoButton
          className="w-auto h-auto px-4 py-1 rounded-sm"
          shadow={false}
          variant="alt"
          onClick={() => onEditClick()}
          disabled={!canEdit}
        >
          <p className="text-sm">Edit Exercises</p>
        </LudoButton>
      </LudoPreviewPanel.Header>
      <LudoPreviewPanel.Content className="gap-4">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="flex items-center gap-2">
            <ExercisePreviewItem
              onClick={() => setSelectedExercise(exercise)}
              title={exercise.title ?? ""}
              isSelected={selectedExercise?.id === exercise.id}
            />
            <ExerciseTypePill type={exercise.exerciseType} />
          </div>
        ))}
      </LudoPreviewPanel.Content>
      <LudoPreviewPanel.Footer>
        <p className="text-xs">{exercises.length} exercises</p>
      </LudoPreviewPanel.Footer>
    </LudoPreviewPanel>
  );
}
