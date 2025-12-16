import { CodeBoxWrapper } from "@/components/design-system/blocks/wrapper/code-box-wrapper.tsx";
import { ExerciseAnswerField } from "../UI/AnswerField/ExerciseAnswerField.tsx";

import { useLessonContext } from "@/features/Lesson/Context/useLessonContext.tsx";
import { useExerciseBodyData } from "@/features/Lesson/Hooks/useExerciseBodyData.tsx";
import { OptionListWrapper } from "@/components/design-system/blocks/wrapper/option-list-wrapper.tsx";
import { WideClickableOption } from "@/components/design-system/atoms/option/wide-clickable-option.tsx";

export function AnalyzeExercise() {
  const { currentExercise, inputState } = useLessonContext();
  const { options, replaceAnswerAt, currentExerciseInputs, prompt } =
    useExerciseBodyData(currentExercise, inputState);

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full px-8 bg-codeGray py-4 flex flex-col gap-2">
        <ExerciseAnswerField
          options={options}
          answerField={prompt!}
          userResponses={currentExerciseInputs}
          setAnswerAt={replaceAnswerAt}
        />
      </div>

      <OptionListWrapper className="px-8" type="COLUMN">
        {options.map((option) => (
          <WideClickableOption
            setAnswerAt={replaceAnswerAt}
            option={option}
            userSelections={currentExerciseInputs}
          />
        ))}
      </OptionListWrapper>
    </div>
  );
}
