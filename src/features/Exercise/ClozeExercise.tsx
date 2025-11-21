import type { LudoExerciseOption } from "../../Types/Exercise/LudoExerciseOption";
import { ClickableOption } from "./ClickableOption";
import { OptionListWrapper } from "../../components/Molecules/Wrapper/OptionListWrapper.tsx";
import { ExerciseAnswerField } from "./ExerciseAnswerField";
import { CodeBoxWrapper } from "../../components/Molecules/Wrapper/CodeBoxWrapper.tsx";
import type { AnswerToken } from "@/Hooks/Logic/Input/useInputAssistance.tsx";

type ClozeExerciseProps = {
  answerField: string;
  options: LudoExerciseOption[];
  distractors: LudoExerciseOption[];
  userResponses: AnswerToken[];
  setAnswerAt: (index: number, value: AnswerToken) => void;
  addSelection: (option: AnswerToken) => void;
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
            option={option}
            userSelections={userResponses}
          />
        ))}
      </OptionListWrapper>
    </>
  );
}
