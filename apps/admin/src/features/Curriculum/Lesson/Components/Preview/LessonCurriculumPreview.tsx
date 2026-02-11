import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import {
  CurriculumPreviewContent,
  CurriculumPreviewFooter,
  CurriculumPreviewHeader,
} from "@/features/Curriculum/Components/CurriculumList";
import { ExercisePreviewItem } from "./ExercisePreviewItem";
import type {
  CurriculumDraftLessonExercise,
  CurriculumDraftLessonExercises,
} from "@ludocode/types";

type LessonCurriculumPreviewProps = {
  exercises: CurriculumDraftLessonExercises;
  selectedExercise: CurriculumDraftLessonExercise | null;
  setSelectedExercise: (value: CurriculumDraftLessonExercise) => void;
};

export function LessonCurriculumPreview({
  exercises,
  selectedExercise,
  setSelectedExercise,
}: LessonCurriculumPreviewProps) {
  return (
    <div className="flex rounded-lg min-h-0 text-white border-3 border-ludo-border h-full flex-col w-full">
      <CurriculumPreviewHeader>
        <p className="text-white font-bold">Exercises Preview</p>
        <LudoButton
          className="w-auto h-auto px-4 py-1 rounded-sm"
          shadow={false}
          variant="alt"
        >
          <p className="text-sm">Edit Exercises</p>
        </LudoButton>
      </CurriculumPreviewHeader>
      <CurriculumPreviewContent className="gap-4">
        {exercises.map((exercise) => (
          <ExercisePreviewItem
            onClick={() => setSelectedExercise(exercise)}
            title={exercise.title ?? ""}
            isSelected={selectedExercise?.id === exercise.id}
          />
        ))}
      </CurriculumPreviewContent>
      <CurriculumPreviewFooter>
        <p className="text-xs">Last Modified: 6th of January at 18:32</p>
        <p className="text-xs">Revision: 6</p>
      </CurriculumPreviewFooter>
    </div>
  );
}
