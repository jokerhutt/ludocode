import { ActionButton } from "@/components/LudoComponents/Atoms/Button/ActionButton";
import type { ExercisePhase } from "@/components/LudoComponents/Blocks/Footer/LessonFooter";


type LessonSubmitButtonProps = {
  canSubmit: boolean;
  submitAnswer: () => void;
  phase: ExercisePhase;
};

export function LessonSubmitButton({
  canSubmit,
  submitAnswer,
  phase,
}: LessonSubmitButtonProps) {
  const text = phase == "DEFAULT" ? "Submit ⌘+⏎" : "Continue";

  const trySubmit = () => {
    if (!canSubmit) return;
    submitAnswer();
  };

  return (
    <ActionButton
      text={text}
      variant="default"
      active={canSubmit}
      onClick={() => trySubmit()}
    />
  );
}
