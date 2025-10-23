import type { LudoExerciseOption } from "../../Types/Exercise/LudoExerciseOption";
import { OptionListWrapper } from "../../components/Molecules/Wrapper/OptionListWrapper.tsx";
import { ExerciseAnswerField } from "./ExerciseAnswerField";
import { CodeBoxWrapper } from "../../components/Molecules/Wrapper/CodeBoxWrapper.tsx";
import { WideClickableOption } from "./WideClickableOption";

type AnalyzeExerciseProps = {
  answerField: string;
  options: LudoExerciseOption[];
  userResponses: string[];
  setAnswerAt: (index: number, value: string) => void;
  addSelection: (option: string) => void;
};

export function AnalyzeExercise({
  answerField,
  options,
  userResponses,
  setAnswerAt,
}: AnalyzeExerciseProps) {
  return (
    <>
      <CodeBoxWrapper>
        <ExerciseAnswerField
          options={options}
          answerField={answerField}
          userResponses={userResponses}
          setAnswerAt={setAnswerAt}
        />
      </CodeBoxWrapper>

      <OptionListWrapper type="COLUMN">
        {options.map((option) => (
          <WideClickableOption
            setAnswerAt={setAnswerAt}
            option={option.content}
            userSelections={userResponses}
          />
        ))}
      </OptionListWrapper>
    </>
  );
}
