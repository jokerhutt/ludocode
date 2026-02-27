import { cn } from "@ludocode/design-system/cn-utils.ts";
import {
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import type { ExerciseType } from "@ludocode/types/Exercise/ExerciseType.ts";

type ExerciseLabelProps = {
  dataTestId?: string;
  exerciseType: ExerciseType;
  className?: string;
};

type ExerciseTypeContent = { description: string; iconName: IconName };

export function ExerciseLabel({
  exerciseType,
  className,
  dataTestId,
}: ExerciseLabelProps) {
  const typeDescriptions: Record<ExerciseType, ExerciseTypeContent> = {
    CLOZE: { description: "Fill in the Blanks", iconName: "Cloze" },
    INFO: { description: "Informational", iconName: "Question" },
    SELECT: { description: "Select Answer", iconName: "Trivia" },
  };

  const { description } = typeDescriptions[exerciseType];

  return (
    <div
      data-testid={dataTestId}
      className={cn(
        "flex gap-2 items-center",
        "text-xs sm:text-sm font-semibold uppercase tracking-widest text-ludo-accent-muted",
        className,
      )}
    >
      <p>{description}</p>
    </div>
  );
}
