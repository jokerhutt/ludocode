import { OptionListWrapper } from "@/components/Molecules/Wrapper/OptionListWrapper";
import { WideClickableOption } from "../../../components/Atoms/CodeOption/WideClickableOption";
import type { LudoExerciseOption } from "@/Types/Exercise/LudoExerciseOption";
import type { AnswerToken } from "@/Hooks/Logic/Exercises/useExercise";

type TriviaExerciseProps = {
  answerField: string;
  options: LudoExerciseOption[];
  userResponses: AnswerToken[];
  setAnswerAt: (index: number, value: AnswerToken) => void;
  addSelection: (option: string) => void;
};

export function TriviaExercise({
  options,
  userResponses,
  setAnswerAt,
}: TriviaExerciseProps) {
  return (
    <OptionListWrapper type="COLUMN">
      {options.map((option) => (
        <WideClickableOption
          setAnswerAt={setAnswerAt}
          option={option}
          userSelections={userResponses}
        />
      ))}
    </OptionListWrapper>
  );
}
