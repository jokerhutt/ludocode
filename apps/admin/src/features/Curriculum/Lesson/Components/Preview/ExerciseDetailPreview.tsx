import type { CurriculumDraftLessonExercise } from "@ludocode/types";
import {
  CurriculumPreviewContent,
  CurriculumPreviewFooter,
  CurriculumPreviewHeader,
} from "@/features/Curriculum/Components/CurriculumList";
import { ShadowLessButton } from "@ludocode/design-system/primitives/ShadowLessButton.tsx";
import { ExerciseLabel } from "./Exercise/ExerciseLabel";
import { ExerciseInstruction } from "./Exercise/ExerciseInstruction";
import { ExerciseMedia } from "./Exercise/ExerciseMedia";
import { ExerciseInteraction } from "./Exercise/ExerciseInteraction";
import { configByType } from "./Exercise/types";

type ExerciseDetailPreviewProps = {
  exercise: CurriculumDraftLessonExercise;
  courseId: string;
};

export function ExerciseDetailPreview({
  exercise,
  courseId,
}: ExerciseDetailPreviewProps) {
  const { title } = exercise;
  const config = configByType[exercise.exerciseType];

  return (
    <div className="flex rounded-lg min-h-0 text-white border-3 border-ludo-border h-full flex-col w-full">
      <CurriculumPreviewHeader>
        <p className="text-white font-bold">{title}</p>
        <ShadowLessButton>
          <p className="text-sm">Preview</p>
        </ShadowLessButton>
      </CurriculumPreviewHeader>

      <CurriculumPreviewContent className="bg-ludo-background">
        <div className="h-full flex gap-6 flex-col w-full p-4">
          <ExerciseLabel exerciseType={exercise.exerciseType} />
          <ExerciseInstruction currentExercise={exercise} />
          {exercise.media && <ExerciseMedia media={exercise.media} />}
          <ExerciseInteraction config={config} exercise={exercise} />
        </div>
      </CurriculumPreviewContent>

      <CurriculumPreviewFooter>
        <p className="text-xs">
          {exercise.correctOptions.length} correct ·{" "}
          {exercise.distractors.length} distractors
        </p>
      </CurriculumPreviewFooter>
    </div>
  );
}
