import type { LudoExerciseOption } from "../../Types/Exercise/LudoExerciseOption";
import { ClickableOption } from "./ClickableOption";
import { ClickableOptionRow } from "./ClickableOptionWrapper";
import { ExerciseAnswerField } from "./ExerciseAnswerField";
import { ExerciseCodeContainer } from "./ExerciseCodeContainer";

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
      <ExerciseCodeContainer>
        <ExerciseAnswerField
          options={options}
          answerField={answerField}
          userResponses={userResponses}
          setAnswerAt={setAnswerAt}
        />
      </ExerciseCodeContainer>

      <ClickableOptionRow type="ROW">
        {options.map((option) => (
          <ClickableOption
            addSelection={addSelection}
            option={option.content}
            userSelections={userResponses}
          />
        ))}
      </ClickableOptionRow>
    </>
  );
}
