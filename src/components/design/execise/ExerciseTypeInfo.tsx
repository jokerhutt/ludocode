import {
  CustomIcon,
  type IconName,
} from "@/components/design-system/atoms/hero-icon/custom-icon";
import type { ExerciseType } from "@/types/Exercise/ExerciseType";

type ExerciseTypeInfoProps = { exerciseType: ExerciseType };

type ExerciseTypeContent = { description: string; iconName: IconName };

export function ExerciseTypeInfo({ exerciseType }: ExerciseTypeInfoProps) {
  const typeDescriptions: Record<ExerciseType, ExerciseTypeContent> = {
    CLOZE: { description: "Fill in the Blanks", iconName: "Cloze" },
    INFO: { description: "Informational", iconName: "Question" },
    TRIVIA: { description: "Trivia", iconName: "Trivia" },
    ANALYZE: { description: "Analyse Code", iconName: "Analyze" },
  };

  const { description, iconName } = typeDescriptions[exerciseType];

  return (
    <div className="flex gap-2 text-ludoLightPurple items-center">
      <CustomIcon iconName={iconName} />
      <p>{description}</p>
    </div>
  );
}
