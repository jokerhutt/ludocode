import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";

type ExerciseInstructionProps = { currentExercise: LudoExercise };

export function ExerciseInstruction({
  currentExercise,
}: ExerciseInstructionProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-white text-start text-lg sm:text-xl font-semibold leading-snug">
        {currentExercise.title}
      </h2>
      {currentExercise.subtitle && (
        <p className="text-ludoAltText text-start text-sm sm:text-base leading-relaxed">
          {currentExercise.subtitle}
        </p>
      )}
    </div>
  );
}
