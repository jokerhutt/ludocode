import type { AnswerToken } from "@ludocode/types/Exercise/AnswerToken.ts";
import { WideButton } from "@ludocode/design-system/primitives/wide-button";
import type { LudoExerciseOption } from "@ludocode/types";
import { cn } from "../cn-utils";

type ClickableOptionProps = {
  content: string;
  isSelected: boolean;
  enabled?: boolean;
  handleClick: () => void;
};

export function ClickableOption({
  content,
  isSelected,
  enabled = true,
  handleClick,
}: ClickableOptionProps) {
  return (
    <div
      data-testId={`exercise-option-${content}`}
      onClick={() => {
        if (!enabled) return;
        handleClick();
      }}
      className={cn(
        "py-2.5 px-5 code rounded-xl transition-all duration-100 select-none",
        "hover:cursor-pointer active:translate-y-[3px] active:shadow-none",
        isSelected
          ? "bg-ludo-surface/60 text-white/50 shadow-[0_4px_0_#262E57]/50 translate-y-[2px]"
          : "bg-ludo-surface text-white shadow-[0_5px_0_#262E57] hover:brightness-110",
      )}
    >
      <p className="text-md">{content}</p>
    </div>
  );
}

export type OptionStatus = "DEFAULT" | "CORRECT" | "INCORRECT";

type WideClickableOptionProps = {
  option: LudoExerciseOption;
  userSelections: AnswerToken[];
  enabled?: boolean;
  setAnswerAt: (index: number, value: AnswerToken) => void;
  isCorrect?: boolean;
  status: OptionStatus;
};

export function WideClickableOption({
  option,
  userSelections,
  enabled,
  status,
  setAnswerAt,
}: WideClickableOptionProps) {
  const isSelected = userSelections[0] && userSelections[0].id == option.id;

  const handleChange = () => {
    if (isSelected) return;
    setAnswerAt(0, { id: option.id, value: option.content });
  };
  const shadowStyle: Record<OptionStatus, string> = {
    DEFAULT: "shadow-[0_5px_0_#3F4FAF]",
    CORRECT: "shadow-[0_5px_0_#4FD1A199]",
    INCORRECT: "shadow-[0_5px_0_#D97777]",
  };

  return (
    <WideButton
      data-testId={`exercise-option-wide-${option.content}`}
      active={isSelected}
      className={isSelected ? shadowStyle[status] : ""}
      onClick={() => {
        if (!enabled) return;
        handleChange();
      }}
    >
      <p className="text-left text-white">{option.content}</p>
    </WideButton>
  );
}
