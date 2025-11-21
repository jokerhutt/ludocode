import type { AnswerToken } from "@/Hooks/Logic/Input/useInputAssistance";
import type { LudoExerciseOption } from "@/Types/Exercise/LudoExerciseOption";

type ClickableOptionProps = {
  option: LudoExerciseOption;
  userSelections: AnswerToken[];
  addSelection: (option: AnswerToken) => void;
};

export function ClickableOption({
  option,
  userSelections,
  addSelection,
}: ClickableOptionProps) {
  const norm = (s: string) => s.trim();

  const isSelected = userSelections.some((s) => (s.id && option.id) && norm(s.id) === norm(option.id));

  const handleClick = () => {
    if (isSelected) return;
    addSelection({id: option.id, value: option.content});
  };

  const allowedStyle = `text-white border-ludoGrayLight/50`;
  const disabledStyle = `text-white/50 border-ludoGrayLight/50`;
  const displayStyle = isSelected ? disabledStyle : allowedStyle;

  return (
    <div
      onClick={() => handleClick()}
      className={`py-2 code hover:cursor-pointer ${displayStyle} px-4 border-3 border-ludoGrayLight rounded-xl`}
    >
      <p className="text-lg">{option.content}</p>
    </div>
  );
}
