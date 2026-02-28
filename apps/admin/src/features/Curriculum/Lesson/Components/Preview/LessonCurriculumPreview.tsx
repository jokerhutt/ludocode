import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import {
  CurriculumPreviewContent,
  CurriculumPreviewFooter,
  CurriculumPreviewHeader,
} from "@/features/Curriculum/Components/CurriculumList";
import { ExercisePreviewItem } from "./ExercisePreviewItem";
import { ExerciseTypePill } from "../Editor/ExerciseTypePill";
import type {
  CurriculumDraftLessonExercise,
  CurriculumDraftLessonExercises,
} from "@ludocode/types";
import {
  getExerciseTitle,
  deriveExerciseType,
} from "@/features/Curriculum/Lesson/helpers";

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
    <div className="flex rounded-lg min-h-0 text-white border-3 border-ludo-border h-full flex-col w-full">
      <CurriculumPreviewHeader>
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
      </CurriculumPreviewHeader>
      <CurriculumPreviewContent  className="gap-4 bg-ludo-background">
        {exercises.map((exercise) => (
          <div key={exercise.exerciseId} className="flex items-center gap-2">
            <ExercisePreviewItem
              onClick={() => setSelectedExercise(exercise)}
              title={getExerciseTitle(exercise)}
              isSelected={selectedExercise?.exerciseId === exercise.exerciseId}
            />
            <ExerciseTypePill type={deriveExerciseType(exercise)} />
          </div>
        ))}
      </CurriculumPreviewContent>
      <CurriculumPreviewFooter>
        <p className="text-xs">{exercises.length} exercises</p>
      </CurriculumPreviewFooter>
    </div>
  );
}
