import { cn } from "@/components/cn-utils";
import {
  CustomIcon,
  type IconName,
} from "@/components/design-system/atoms/hero-icon/custom-icon";
import type { ExerciseType } from "@/types/Exercise/ExerciseType";

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
