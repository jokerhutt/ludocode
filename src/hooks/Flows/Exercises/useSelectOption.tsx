import type { LudoExerciseOption } from "@/types/Exercise/LudoExerciseOption";
import type { AnswerToken } from "./useExercise";

type Args = {
  option: LudoExerciseOption;
  currentExerciseInputs: AnswerToken[];
  addSelection: (option: AnswerToken) => void;
};

export function useSelectOption({
  option,
  currentExerciseInputs,
  addSelection,
}: Args) {
  const norm = (s: string) => s.trim();

  const isSelected = currentExerciseInputs.some(
    (s) => s.id && option.id && norm(s.id) === norm(option.id)
  );

  const handleClick = () => {
    if (isSelected) return;
    addSelection({ id: option.id, value: option.content });
  };

  return { isSelected, handleClick };
}
