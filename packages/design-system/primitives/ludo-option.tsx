import { type AnswerToken } from "@ludocode/types";
import { cn } from "../cn-utils";

export type OptionStatus = "DEFAULT" | "CORRECT" | "INCORRECT";

type BaseProps = {
  enabled?: boolean;
  status?: OptionStatus;
  className?: string;
};

type PillProps = BaseProps & {
  variant: "pill";
  content: string;
  isSelected: boolean;
  onSelect: () => void;
  testId?: string;
};

type WideSingleSelectProps = BaseProps & {
  variant: "wideSingleSelect";
  option: { id: string; content: string };
  userSelections: AnswerToken[];
  setAnswerAt: (index: number, value: AnswerToken) => void;
  testId?: string;
};

export type LudoOptionProps = PillProps | WideSingleSelectProps;

export function LudoOption(props: LudoOptionProps) {
  const enabled = props.enabled ?? true;

  const isWide = props.variant === "wideSingleSelect";
  const content = isWide ? props.option.content : props.content;

  const isSelected = isWide
    ? Boolean(
        props.userSelections[0] &&
        props.userSelections[0].id === props.option.id,
      )
    : props.isSelected;

  const status: OptionStatus = (props.status ?? "DEFAULT") as OptionStatus;

  const handleClick = () => {
    if (!enabled) return;

    if (props.variant === "pill") {
      props.onSelect();
      return;
    }

    if (isSelected) return;
    props.setAnswerAt(0, { id: props.option.id, value: props.option.content });
  };

  const feedbackStyle =
    props.variant === "wideSingleSelect" && isSelected && status !== "DEFAULT"
      ? status === "INCORRECT"
        ? "bg-ludo-incorrect"
        : "bg-ludo-correct"
      : "";

  return (
    <button
      data-testId={
        props.testId ??
        (isWide
          ? `exercise-option-wide-${content}`
          : `exercise-option-${content}`)
      }
      onClick={handleClick}
      className={cn(
        "py-2.5 px-5 code rounded-xl lg:transition-all lg:active:translate-y-[3px] lg:duration-100 transition-[transform] duration-100 transform-gpu will-change-transform touch-action-manipulation select-none",
        isWide && "w-full",
        "hover:cursor-pointer active:shadow-none",
        isSelected
          ? isWide
            ? "bg-ludo-accent/70 text-ludo-white-dim shadow-[0_5px_0_#262E57]/50 translate-y-0.5"
            : "bg-ludo-surface-dim text-ludo-white-dim shadow-[0_4px_0_#262E57]/50 translate-y-0.5"
          : "bg-ludo-surface text-ludo-white-bright shadow-[0_5px_0_#262E57] hover:brightness-110",
        feedbackStyle,
        props.className,
        isWide ? "text-center text-ludo-white-bright" : "text-md",
      )}
    >
      {content}
    </button>
  );
}
