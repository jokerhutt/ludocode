import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import {
  CurriculumCardContent,
  CurriculumCardFooter,
  CurriculumCardHeader,
} from "@/features/curriculum/components/CurriculumList.tsx";
import { ExercisePreviewItem } from "./ExercisePreviewItem.tsx";
import { ExerciseTypePill } from "../../components/ExerciseTypePill.tsx";
import type {
  CurriculumDraftLessonExercise,
  CurriculumDraftLessonExercises,
} from "@ludocode/types";
import {
  getExerciseTitle,
  deriveExerciseType,
} from "@/features/lesson/helpers.ts";

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
    <div className="flex rounded-lg min-h-0 text-ludo-white-bright border-3 border-ludo-border h-full flex-col w-full">
      <CurriculumCardHeader>
        <p className="text-ludo-white-bright font-bold">Exercises Preview</p>
        <LudoButton
          className="w-auto h-auto px-4 py-1 rounded-sm"
          shadow={false}
          variant="alt"
          onClick={() => onEditClick()}
          disabled={!canEdit}
        >
          <p className="text-sm">Edit Exercises</p>
        </LudoButton>
      </CurriculumCardHeader>
      <CurriculumCardContent className="gap-4 bg-ludo-background">
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
      </CurriculumCardContent>
      <CurriculumCardFooter>
        <p className="text-xs">{exercises.length} exercises</p>
      </CurriculumCardFooter>
    </div>
  );
}
