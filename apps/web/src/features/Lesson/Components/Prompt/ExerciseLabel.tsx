import { cn } from "../../../../../../../packages/design-system/cn-utils.ts";
import {
  CustomIcon,
  type IconName,
} from "../../../../../../../packages/design-system/primitives/custom-icon.tsx";
import type { ExerciseType } from "../../../../../../../packages/types/Exercise/ExerciseType.ts";

type ExerciseLabelProps = { exerciseType: ExerciseType; className?: string };

type ExerciseTypeContent = { description: string; iconName: IconName };

export function ExerciseLabel({ exerciseType, className }: ExerciseLabelProps) {
  const typeDescriptions: Record<ExerciseType, ExerciseTypeContent> = {
    CLOZE: { description: "Fill in the Blanks", iconName: "Cloze" },
    INFO: { description: "Informational", iconName: "Question" },
    TRIVIA: { description: "Trivia", iconName: "Trivia" },
    ANALYZE: { description: "Analyse Code", iconName: "Analyze" },
  };

  const { description, iconName } = typeDescriptions[exerciseType];

  return (
    <div
      className={cn("flex gap-2 text-ludoLightPurple items-center", className)}
    >
      <CustomIcon iconName={iconName} />
      <p>{description}</p>
    </div>
  );
}
