import type { CurriculumDraftLessonExercise } from "@ludocode/types";
import ReactMarkdown from "react-markdown";

import { BlockRenderer } from "@ludocode/design-system/widgets/exercise/BlockRenderer.tsx";
import { ExerciseInteraction } from "./ExerciseInteraction.tsx";
import { getExerciseTitle } from "@/features/lesson/helpers.ts";
import {
  CurriculumCardContent,
  CurriculumCardFooter,
  CurriculumCardHeader,
} from "@/features/curriculum/components/CurriculumList.tsx";

type ExerciseDetailPreviewProps = {
  exercise: CurriculumDraftLessonExercise;
};

export function ExerciseDetailPreview({
  exercise,
}: ExerciseDetailPreviewProps) {
  const title = getExerciseTitle(exercise);
  const hasBody =
    typeof exercise.body === "string" && exercise.body.trim() !== "";

  return (
    <div className="flex rounded-lg min-h-0 text-ludo-white-bright border-3 border-ludo-border h-full flex-col w-full">
      <CurriculumCardHeader>
        <p className="text-ludo-white-bright w-full text-center font-bold">
          {title}
        </p>
      </CurriculumCardHeader>

      <CurriculumCardContent className="bg-ludo-background">
        <div className="h-full flex gap-6 flex-col w-full p-4">
          {hasBody && (
            <section className="w-full rounded-lg border border-ludo-border bg-ludo-surface/40 p-3">
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-ludo-accent-muted mb-2">
                Exercise Body
              </p>
              <div className="max-w-none text-left text-sm text-ludo-white-bright">
                <ReactMarkdown>{exercise.body}</ReactMarkdown>
              </div>
            </section>
          )}

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
