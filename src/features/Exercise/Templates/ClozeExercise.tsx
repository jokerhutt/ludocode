import { CodeBoxWrapper } from "@/components/Molecules/Wrapper/CodeBoxWrapper";
import type { AnswerToken } from "@/Hooks/Logic/Input/useInputAssistance.tsx";
import { ExerciseAnswerField } from "../ExerciseAnswerField";
import type { LudoExerciseOption } from "@/Types/Exercise/LudoExerciseOption";
import { OptionListWrapper } from "@/components/Molecules/Wrapper/OptionListWrapper";
import { ClickableOption } from "../../../components/Atoms/CodeOption/ClickableOption";
import { useSelectOption } from "@/Hooks/Logic/ExerciseOptions/useSelectOption";

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
        {options.map((option) => {
          const { isSelected, handleClick } = useSelectOption({
            option,
            userResponses,
            addSelection,
          });
          return (
            <ClickableOption
              handleClick={handleClick}
              content={option.content}
              isSelected={isSelected}
            />
          );
        })}
      </OptionListWrapper>
    </>
  );
}
