import type { CurriculumDraftLessonExercise } from "@ludocode/types";
import {
  CurriculumPreviewContent,
  CurriculumPreviewFooter,
  CurriculumPreviewHeader,
} from "@/features/Curriculum/Components/CurriculumList";
import { ShadowLessButton } from "@ludocode/design-system/primitives/ShadowLessButton.tsx";
import { BlockPreview } from "./Exercise/BlockPreview";
import { ExerciseInteraction } from "./Exercise/ExerciseInteraction";
import { getExerciseTitle } from "@/features/Curriculum/Lesson/helpers";

type ExerciseDetailPreviewProps = {
  exercise: CurriculumDraftLessonExercise;
};

export function ExerciseDetailPreview({
  exercise,
}: ExerciseDetailPreviewProps) {
  const title = getExerciseTitle(exercise);

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
          <div className="flex flex-col gap-3">
            {exercise.blocks.map((block, index) => (
              <BlockPreview key={index} block={block} />
            ))}
          </div>
          <ExerciseInteraction exercise={exercise} />
        </div>
      </CurriculumPreviewContent>

      <CurriculumPreviewFooter>
        <p className="text-xs">
          {exercise.blocks.length}{" "}
          {exercise.blocks.length === 1 ? "block" : "blocks"}
          {exercise.interaction
            ? ` · ${exercise.interaction.type} interaction`
            : ""}
        </p>
      </CurriculumPreviewFooter>
    </div>
  );
}
