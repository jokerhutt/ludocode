import type { LudoExerciseOption } from "@/Types/Exercise/LudoExerciseOption";

type InfoExerciseProps = {
  answerField: string;
  options: LudoExerciseOption[];
  userResponses: string[];
  setAnswerAt: (index: number, value: string) => void;
  addSelection: (option: string) => void;
};

export function InfoExercise({}: InfoExerciseProps) {
  return <></>;
}
