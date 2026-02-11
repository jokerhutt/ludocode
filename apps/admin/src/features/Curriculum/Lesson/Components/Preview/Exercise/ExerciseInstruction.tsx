import type { CurriculumDraftLessonExercise } from "@ludocode/types";

type ExerciseInstructionProps = { currentExercise: CurriculumDraftLessonExercise };

export function ExerciseInstruction({
  currentExercise,
}: ExerciseInstructionProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-ludoAltText text-start text-md">{currentExercise.title}</p>
      {currentExercise.subtitle && (
        <p className="text-ludoAltText text-start text-md">
          {currentExercise.subtitle}
        </p>
      )}
    </div>
  );
}
