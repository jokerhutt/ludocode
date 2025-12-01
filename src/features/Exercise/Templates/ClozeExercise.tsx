import { ExerciseAnswerField } from "../UI/AnswerField/ExerciseAnswerField";
import { useSelectOption } from "@/Hooks/Logic/Exercises/useSelectOption";
import { useLessonContext } from "@/Hooks/Context/Lesson/useLessonContext";
import { useExerciseBodyData } from "@/Hooks/Logic/Exercises/useExerciseBodyData";
import { CodeBoxWrapper } from "@/components/LudoComponents/Blocks/Wrapper/CodeBoxWrapper";
import { OptionListWrapper } from "@/components/LudoComponents/Blocks/Wrapper/OptionListWrapper";
import { ClickableOption } from "@/components/LudoComponents/Atoms/CodeOption/ClickableOption";

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
