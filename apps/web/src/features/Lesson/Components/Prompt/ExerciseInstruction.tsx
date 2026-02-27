import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";

type ExerciseInstructionProps = { currentExercise: LudoExercise };

export function ExerciseInstruction({
  currentExercise,
}: ExerciseInstructionProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-white text-center text-lg sm:text-xl font-semibold leading-snug">
        {currentExercise.title}
      </h2>
      {currentExercise.subtitle && (
        <p className="text-ludoAltText text-center text-sm sm:text-base leading-relaxed">
          {currentExercise.subtitle}
        </p>
      )}
    </div>
  );
}
