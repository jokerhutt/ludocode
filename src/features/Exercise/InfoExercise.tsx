import type { AnswerToken } from "@/Hooks/Logic/Input/useInputAssistance";
import type { LudoExerciseOption } from "@/Types/Exercise/LudoExerciseOption";

type InfoExerciseProps = {
  answerField: string;
  options: LudoExerciseOption[];
  userResponses: AnswerToken[];
  setAnswerAt: (index: number, value: AnswerToken) => void;
  addSelection: (option: AnswerToken) => void;
};

export function InfoExercise({}: InfoExerciseProps) {
  return <></>;
}
