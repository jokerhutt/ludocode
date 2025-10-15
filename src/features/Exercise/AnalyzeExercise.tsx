import type { LudoExerciseOption } from "../../Types/Exercise/LudoExerciseOption";
import { ClickableOptionRow } from "./ClickableOptionWrapper";
import { ExerciseAnswerField } from "./ExerciseAnswerField";
import { ExerciseCodeContainer } from "./ExerciseCodeContainer";
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
      <ExerciseCodeContainer>
        <ExerciseAnswerField
          options={options}
          answerField={answerField}
          userResponses={userResponses}
          setAnswerAt={setAnswerAt}
        />
      </ExerciseCodeContainer>

      <ClickableOptionRow type="COLUMN">
        {options.map((option) => (
          <WideClickableOption
            setAnswerAt={setAnswerAt}
            option={option.content}
            userSelections={userResponses}
          />
        ))}
      </ClickableOptionRow>
    </>
  );
}
