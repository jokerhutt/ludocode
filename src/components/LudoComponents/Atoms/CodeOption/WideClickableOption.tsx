import type { AnswerToken } from "@/Hooks/Logic/Exercises/useExercise";
import type { LudoExerciseOption } from "@/Types/Exercise/LudoExerciseOption";
import { WideButton } from "../Button/WideButton";

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
