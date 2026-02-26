import { cn } from "@ludocode/design-system/cn-utils.ts";
import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import type { ExerciseType } from "@ludocode/types/Exercise/ExerciseType.ts";

type ExerciseLabelProps = {dataTestId?: string; exerciseType: ExerciseType; className?: string };

type ExerciseTypeContent = { description: string; iconName: IconName };

export function ExerciseLabel({ exerciseType, className, dataTestId }: ExerciseLabelProps) {
  const typeDescriptions: Record<ExerciseType, ExerciseTypeContent> = {
    CLOZE: { description: "Fill in the Blanks", iconName: "Cloze" },
    INFO: { description: "Informational", iconName: "Question" },
    TRIVIA: { description: "Trivia", iconName: "Trivia" },
    ANALYZE: { description: "Analyse Code", iconName: "Analyze" },
  };

  const { description, iconName } = typeDescriptions[exerciseType];

  return (
    <div
      data-testid={dataTestId}
      className={cn(
        "flex gap-2 items-center",
        "text-xs sm:text-sm font-semibold uppercase tracking-widest text-ludo-accent-muted",
        className,
      )}
    >
      <CustomIcon iconName={iconName} className="h-4 w-4 sm:h-5 sm:w-5" />
      <p>{description}</p>
    </div>
  );
}
