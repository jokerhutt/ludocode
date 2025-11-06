import { WideButton } from "@/components/Atoms/Button/WideButton";
import type { AnswerToken } from "@/Hooks/Logic/Input/useInputAssistance";
import type { LudoExerciseOption } from "@/Types/Exercise/LudoExerciseOption";

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
  const isSelected = userSelections[0].id == option.id;

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
