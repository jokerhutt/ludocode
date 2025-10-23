import type { ExercisePhase } from "../Tutorial/TutorialFooter";

type SubmitButtonProps = {
  canSubmit: boolean;
  submitAnswer: () => void;
  phase: ExercisePhase;
};

export function SubmitButton({ canSubmit, submitAnswer, phase }: SubmitButtonProps) {
  const activeStyle = "border-ludoYellow text-ludoYellow";
  const disabledStyle = "border-ludoYellow/50 text-ludoYellow/50";

  const style = canSubmit ? activeStyle : disabledStyle;
  
  const text = phase == "DEFAULT" ? "Submit ⌘+⏎" : "Continue"

  const trySubmit = () => {
    if (!canSubmit) return;
    submitAnswer();
  };

  return (
    <div
      onClick={() => trySubmit()}
      className={`border hover:cursor-pointer py-2 px-4 rounded-xl ${style}`}
    >
      <p className="text-2xl">{text}</p>
    </div>
  );
}
