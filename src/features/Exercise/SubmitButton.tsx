import { ActionButton } from "../../components/Atoms/Button/ActionButton";
import type { ExercisePhase } from "../Tutorial/TutorialFooter";

type SubmitButtonProps = {
  canSubmit: boolean;
  submitAnswer: () => void;
  phase: ExercisePhase;
};

export function SubmitButton({ canSubmit, submitAnswer, phase }: SubmitButtonProps) {
  const text = phase == "DEFAULT" ? "Submit ⌘+⏎" : "Continue"

  const trySubmit = () => {
    if (!canSubmit) return;
    submitAnswer();
  };

  return (
    <ActionButton text={text} variant="default" active={canSubmit} onClick={() => trySubmit()}/>
  );
}
