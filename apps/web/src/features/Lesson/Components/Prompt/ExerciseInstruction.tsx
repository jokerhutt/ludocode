import type { LudoExercise } from "../../../../../../../packages/types/Exercise/LudoExercise.ts";

type ExerciseInstructionProps = { currentExercise: LudoExercise };

export function ExerciseInstruction({
  currentExercise,
}: ExerciseInstructionProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-white text-start text-md">{currentExercise.title}</p>
      {currentExercise.subtitle && (
        <p className="text-white text-start text-md">
          {currentExercise.subtitle}
        </p>
      )}
    </div>
  );
}
