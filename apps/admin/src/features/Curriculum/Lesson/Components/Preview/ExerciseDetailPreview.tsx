import type { CurriculumDraftLessonExercise } from "@ludocode/types";
import { ShadowLessButton } from "@ludocode/design-system/primitives/ShadowLessButton.tsx";
import { ExerciseLabel } from "./Exercise/ExerciseLabel";
import { ExerciseInstruction } from "./Exercise/ExerciseInstruction";
import { ExerciseMedia } from "./Exercise/ExerciseMedia";
import { ExerciseInteraction } from "./Exercise/ExerciseInteraction";
import { configByType } from "./Exercise/types";
import { LudoPreviewPanel } from "@ludocode/design-system/widgets/ludo-preview-panel";

type ExerciseDetailPreviewProps = {
  exercise: CurriculumDraftLessonExercise;
};

export function ExerciseDetailPreview({
  exercise,
}: ExerciseDetailPreviewProps) {
  const { title } = exercise;
  const config = configByType[exercise.exerciseType];

  return (
    <LudoPreviewPanel>
      <LudoPreviewPanel.Header>
        <p className="text-white font-bold">{title}</p>
        <ShadowLessButton>
          <p className="text-sm">Preview</p>
        </ShadowLessButton>
      </LudoPreviewPanel.Header>

      <LudoPreviewPanel.Content className="bg-ludo-background">
        <div className="h-full flex gap-6 flex-col w-full p-4">
          <ExerciseLabel exerciseType={exercise.exerciseType} />
          <ExerciseInstruction currentExercise={exercise} />
          {exercise.media && <ExerciseMedia media={exercise.media} />}
          <ExerciseInteraction config={config} exercise={exercise} />
        </div>
      </LudoPreviewPanel.Content>

      <LudoPreviewPanel.Footer>
        <p className="text-xs">
          {exercise.correctOptions.length} correct ·{" "}
          {exercise.distractors.length} distractors
        </p>
      </LudoPreviewPanel.Footer>
    </LudoPreviewPanel>
  );
}
