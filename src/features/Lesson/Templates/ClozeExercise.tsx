import { ExerciseAnswerField } from "../UI/AnswerField/ExerciseAnswerField";
import { useSelectOption } from "@/features/Lesson/Hooks/useSelectOption.tsx";
import { useLessonContext } from "@/features/Lesson/Context/useLessonContext.tsx";
import { useExerciseBodyData } from "@/features/Lesson/Hooks/useExerciseBodyData.tsx";
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
    <div className="flex flex-col justify-between h-full">
      <div className="w-full px-8 bg-codeGray py-4 flex flex-col gap-2">
        <ExerciseAnswerField
          options={options}
          answerField={prompt!}
          userResponses={currentExerciseInputs}
          setAnswerAt={replaceAnswerAt}
        />
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
    </div>
  );
}

{
  /* <CodeBoxWrapper>
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
        </CodeBoxWrapper> */
}
