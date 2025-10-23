import type { LudoExerciseOption } from "../../Types/Exercise/LudoExerciseOption";
import { OptionListWrapper } from "../../components/Molecules/Wrapper/OptionListWrapper.tsx";
import { WideClickableOption } from "./WideClickableOption";

type TriviaExerciseProps = {
  answerField: string;
  options: LudoExerciseOption[];
  userResponses: string[];
  setAnswerAt: (index: number, value: string) => void;
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
          option={option.content}
          userSelections={userResponses}
        />
      ))}
    </OptionListWrapper>
  );
}
