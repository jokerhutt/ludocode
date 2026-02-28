import type { CurriculumDraftLessonExercise } from "@ludocode/types";

import { ShadowLessButton } from "@ludocode/design-system/primitives/ShadowLessButton.tsx";
import { BlockRenderer } from "@ludocode/design-system/widgets/exercise/BlockRenderer";
import { ExerciseInteraction } from "./Exercise/ExerciseInteraction";
import { getExerciseTitle } from "@/features/Curriculum/Lesson/helpers";
import {
  CurriculumCardContent,
  CurriculumCardFooter,
  CurriculumCardHeader,
} from "@/features/Curriculum/Components/CurriculumList";

type ExerciseDetailPreviewProps = {
  exercise: CurriculumDraftLessonExercise;
};

export function ExerciseDetailPreview({
  exercise,
}: ExerciseDetailPreviewProps) {
  const title = getExerciseTitle(exercise);

  return (
    <div className="flex rounded-lg min-h-0 text-white border-3 border-ludo-border h-full flex-col w-full">
      <CurriculumCardHeader>
        <p className="text-white w-full text-center font-bold">{title}</p>
      </CurriculumCardHeader>

      <CurriculumCardContent className="bg-ludo-background">
        <div className="h-full flex gap-6 flex-col w-full p-4">
          <div className="flex flex-col gap-3">
            {exercise.blocks.map((block, index) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </div>
          <ExerciseInteraction exercise={exercise} />
        </div>
      </CurriculumCardContent>

      <CurriculumCardFooter>
        <p className="text-xs">
          {exercise.blocks.length}{" "}
          {exercise.blocks.length === 1 ? "block" : "blocks"}
          {exercise.interaction
            ? ` · ${exercise.interaction.type} interaction`
            : ""}
        </p>
      </CurriculumCardFooter>
    </div>
  );
}
