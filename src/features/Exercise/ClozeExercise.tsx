import type { LudoExerciseOption } from "../../Types/Exercise/LudoExerciseOption";
import { ClickableOption } from "./ClickableOption";
import { OptionListWrapper } from "../../components/Molecules/Wrapper/OptionListWrapper.tsx";
import { ExerciseAnswerField } from "./ExerciseAnswerField";
import { CodeBoxWrapper } from "../../components/Molecules/Wrapper/CodeBoxWrapper.tsx";

type ClozeExerciseProps = {
  answerField: string;
  options: LudoExerciseOption[];
  userResponses: string[];
  setAnswerAt: (index: number, value: string) => void;
  addSelection: (option: string) => void;
};

export function ClozeExercise({
  answerField,
  options,
  userResponses,
  setAnswerAt,
  addSelection,
}: ClozeExerciseProps) {
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

      <OptionListWrapper type="ROW">
        {options.map((option) => (
          <ClickableOption
            addSelection={addSelection}
            option={option.content}
            userSelections={userResponses}
          />
        ))}
      </OptionListWrapper>
    </>
  );
}
