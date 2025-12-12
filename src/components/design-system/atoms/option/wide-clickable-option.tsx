import type { AnswerToken } from "@/features/Lesson/Hooks/useExercise.tsx";
import type { LudoExerciseOption } from "@/types/Exercise/LudoExerciseOption";
import { WideButton } from "@/components/design-system/atoms/button/wide-button.tsx";

type WideClickableOptionProps = {
  option: LudoExerciseOption;
  userSelections: AnswerToken[];
  setAnswerAt: (index: number, value: AnswerToken) => void;
  isCorrect?: boolean;
};

export function WideClickableOption({
  option,
  userSelections,
  setAnswerAt,
}: WideClickableOptionProps) {
  const isSelected = userSelections[0] && userSelections[0].id == option.id;

  const handleChange = () => {
    if (isSelected) return;
    setAnswerAt(0, { id: option.id, value: option.content });
  };

  return (
    <WideButton active={isSelected} onClick={() => handleChange()}>
      <p className="text-left text-white">{option.content}</p>
    </WideButton>
  );
}
