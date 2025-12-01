import { ExerciseAnswerField } from "../UI/AnswerField/ExerciseAnswerField";
import { useSelectOption } from "@/hooks/Flows/Exercises/useSelectOption";
import { useLessonContext } from "@/hooks/Context/Lesson/useLessonContext";
import { useExerciseBodyData } from "@/hooks/Flows/Exercises/useExerciseBodyData";
import { CodeBoxWrapper } from "@/components/design-system/blocks/wrapper/code-box-wrapper.tsx";
import { OptionListWrapper } from "@/components/design-system/blocks/wrapper/option-list-wrapper.tsx";
import { ClickableOption } from "@/components/design-system/atoms/option/clickable-option.tsx";

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
