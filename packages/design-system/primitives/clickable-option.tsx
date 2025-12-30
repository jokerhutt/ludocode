import type { LudoExerciseOption } from "@ludocode/types/Exercise/LudoExerciseOption.ts";
import type { AnswerToken } from "@ludocode/types/Exercise/AnswerToken.ts";
import { WideButton } from "@ludocode/design-system/primitives/wide-button";

type ClickableOptionProps = {
  content: string;
  isSelected: boolean;
  handleClick: () => void;
};

export function ClickableOption({
  content,
  isSelected,
  handleClick,
}: ClickableOptionProps) {
  const allowedStyle = `text-white border-ludoGrayLight/50`;
  const disabledStyle = `text-white/50 border-ludoGrayLight/50`;
  const displayStyle = isSelected ? disabledStyle : allowedStyle;

  return (
    <div
      onClick={() => handleClick()}
      className={`py-2 code hover:cursor-pointer ${displayStyle} px-4 border-3 border-ludoGrayLight rounded-xl`}
    >
      <p className="text-md">{content}</p>
    </div>
  );
}

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
