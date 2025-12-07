import { ExerciseAnswerField } from "../UI/AnswerField/ExerciseAnswerField";
import { useSelectOption } from "@/hooks/Flows/Exercises/useSelectOption";
import { useLessonContext } from "@/hooks/Context/Lesson/useLessonContext";
import { useExerciseBodyData } from "@/hooks/Flows/Exercises/useExerciseBodyData";
import { CodeBoxWrapper } from "@/components/design-system/blocks/wrapper/code-box-wrapper.tsx";
import { OptionListWrapper } from "@/components/design-system/blocks/wrapper/option-list-wrapper.tsx";
import { ClickableOption } from "@/components/design-system/atoms/option/clickable-option.tsx";
import { CodeUtilsGroup } from "../UI/Group/CodeUtilsGroup";

export function ClozeExercise() {
  const { currentExercise, phase, inputState } = useLessonContext();
  const {
    options,
    replaceAnswerAt,
    currentExerciseInputs,
    popLastAnswer,
    isEmpty,
    clearExerciseInputs,
    setAnswerAt,
    prompt,
  } = useExerciseBodyData(currentExercise, inputState);

  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <CodeBoxWrapper>
          <div className="w-full flex flex-col">
            <ExerciseAnswerField
              options={options}
              answerField={prompt!}
              userResponses={currentExerciseInputs}
              setAnswerAt={replaceAnswerAt}
            />
            <CodeUtilsGroup
              enabled={phase == "DEFAULT"}
              clearExerciseInputs={clearExerciseInputs}
              popLast={popLastAnswer}
              isEmpty={isEmpty}
            />
          </div>
        </CodeBoxWrapper>
      </div>

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
