import { CodeBoxWrapper } from "@/components/Molecules/Wrapper/CodeBoxWrapper";
import { ExerciseAnswerField } from "../ExerciseAnswerField";
import { OptionListWrapper } from "@/components/Molecules/Wrapper/OptionListWrapper";
import { ClickableOption } from "../../../components/Atoms/CodeOption/ClickableOption";
import { useSelectOption } from "@/Hooks/Logic/ExerciseOptions/useSelectOption";
import { useLessonContext } from "@/features/Exercise/useLessonContext";
import { useExerciseBodyData } from "@/Hooks/Logic/Exercises/useExerciseBodyData";

export function ClozeExercise() {
  const { currentExercise, inputState } = useLessonContext();
  const {
    options,
    replaceAnswerAt,
    currentExerciseInputs,
    setAnswerAt,
    prompt,
  } = useExerciseBodyData(currentExercise, inputState);

  return (
    <>
      <CodeBoxWrapper>
        <ExerciseAnswerField
          options={options}
          answerField={prompt!}
          userResponses={currentExerciseInputs}
          setAnswerAt={replaceAnswerAt}
        />
      </CodeBoxWrapper>

      <OptionListWrapper type="ROW">
        {options.map((option) => {
          const { isSelected, handleClick } = useSelectOption({
            option,
            currentExerciseInputs,
            addSelection: setAnswerAt,
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
