import { ActionButton } from "@/components/design-system/atoms/button/action-button.tsx";
import type { ExercisePhase } from "@/features/Exercise/UI/Footer/LessonFooter.tsx";


type LessonSubmitButtonProps = {
  canSubmit: boolean;
  submitAnswer: () => void;
  phase: ExercisePhase;
};

export function SubmitLessonButton({
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
